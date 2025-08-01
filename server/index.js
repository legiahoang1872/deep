const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
}

// In-memory cache for quotes
const quoteCache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    geminiConfigured: !!model
  });
});

// Generate quote endpoint
app.post('/api/quote', async (req, res) => {
  try {
    const { mood } = req.body;
    
    if (!mood || typeof mood !== 'string') {
      return res.status(400).json({ 
        error: 'Mood is required and must be a string' 
      });
    }

    // Check cache first
    const cacheKey = mood.toLowerCase().trim();
    const cached = quoteCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return res.json({
        quote: cached.quote,
        mood: mood,
        generated_at: cached.generated_at,
        cached: true
      });
    }

    // If no Gemini API key, return fallback
    if (!model) {
      const fallbackQuotes = {
        'vui vẻ': 'Hạnh phúc không phải là đích đến mà là cách chúng ta di chuyển.',
        'buồn': 'Sau cơn mưa trời lại sáng, sau đau khổ sẽ có hạnh phúc.',
        'động lực': 'Thành công bắt đầu từ việc tin tưởng vào chính mình.',
        'lãng mạn': 'Tình yêu thật sự là khi hai trái tim cùng nhìn về một hướng.',
        'sâu lắng': 'Cuộc sống không đo bằng số lần thở mà bằng những khoảnh khắc nghẹt thở.',
        'default': 'Hãy sống như hôm nay là ngày cuối cùng và học hỏi như bạn sẽ sống mãi mãi.'
      };
      
      const quote = fallbackQuotes[cacheKey] || fallbackQuotes['default'];
      const timestamp = new Date().toISOString();
      
      // Cache the fallback quote
      quoteCache.set(cacheKey, {
        quote,
        timestamp: Date.now(),
        generated_at: timestamp
      });
      
      return res.json({
        quote,
        mood,
        generated_at: timestamp,
        fallback: true
      });
    }

    // Generate quote using Gemini AI
    const prompt = `Viết một câu nói ngắn gọn, sâu lắng, bằng tiếng Việt phù hợp với cảm xúc: ${mood}. Có dấu nhấn cảm xúc nhẹ nhàng, không quá dài (dưới 30 từ). Chỉ trả về câu nói, không thêm gì khác.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let quote = response.text().trim();
    
    // Clean up the quote (remove quotes if any)
    quote = quote.replace(/^["']|["']$/g, '');
    
    const timestamp = new Date().toISOString();
    
    // Cache the generated quote
    quoteCache.set(cacheKey, {
      quote,
      timestamp: Date.now(),
      generated_at: timestamp
    });
    
    res.json({
      quote,
      mood,
      generated_at: timestamp
    });
    
  } catch (error) {
    console.error('Error generating quote:', error);
    
    // Return a fallback quote on error
    const fallbackQuote = 'Mỗi ngày là một khởi đầu mới, hãy nắm lấy cơ hội.';
    const timestamp = new Date().toISOString();
    
    res.status(500).json({
      quote: fallbackQuote,
      mood: req.body.mood || 'unknown',
      generated_at: timestamp,
      error: 'Failed to generate custom quote, using fallback',
      fallback: true
    });
  }
});

// Clear expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of quoteCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      quoteCache.delete(key);
    }
  }
}, CACHE_DURATION);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI: ${model ? 'Configured' : 'Not configured (using fallbacks)'}`);
});

module.exports = app;