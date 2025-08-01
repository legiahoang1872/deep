import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MoodInput from './components/MoodInput';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteHistory from './components/QuoteHistory';
import { Quote } from './types';
import { apiService } from './api';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quoteHistory, setQuoteHistory] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ngam-quote-history');
    const savedFavorites = localStorage.getItem('ngam-favorites');
    
    if (savedHistory) {
      try {
        setQuoteHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading quote history:', e);
      }
    }
    
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('ngam-quote-history', JSON.stringify(quoteHistory));
  }, [quoteHistory]);

  useEffect(() => {
    localStorage.setItem('ngam-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const generateQuote = useCallback(async () => {
    const mood = selectedMood.trim();
    if (!mood) {
      setError('Vui lòng chọn hoặc nhập cảm xúc');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowQuote(false);

    try {
      const response = await apiService.generateQuote(mood);
      const newQuote: Quote = {
        quote: response.quote,
        mood: response.mood,
        generated_at: response.generated_at,
        cached: response.cached,
        fallback: response.fallback,
      };

      setCurrentQuote(newQuote);
      setQuoteHistory(prev => [...prev, newQuote]);
      setShowQuote(true);
    } catch (err) {
      console.error('Error generating quote:', err);
      setError('Không thể tạo câu nói. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedMood]);

  const handleFavorite = useCallback((quote: Quote) => {
    setFavorites(prev => {
      const exists = prev.some(fav => 
        fav.quote === quote.quote && fav.generated_at === quote.generated_at
      );
      
      if (exists) {
        return prev.filter(fav => 
          !(fav.quote === quote.quote && fav.generated_at === quote.generated_at)
        );
      } else {
        return [...prev, quote];
      }
    });
  }, []);

  const handleRegenerate = useCallback(() => {
    generateQuote();
  }, [generateQuote]);

  const handleHistoryQuoteSelect = useCallback((quote: Quote) => {
    setCurrentQuote(quote);
    setSelectedMood(quote.mood);
    setShowQuote(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          {/* Mood input form */}
          <MoodInput
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
            onGenerate={generateQuote}
            isLoading={isLoading}
          />

          {/* Quote display */}
          <QuoteDisplay
            quote={currentQuote}
            isVisible={showQuote}
            onFavorite={handleFavorite}
            onRegenerate={handleRegenerate}
          />

          {/* Quote history */}
          <QuoteHistory
            quotes={quoteHistory}
            onQuoteSelect={handleHistoryQuoteSelect}
          />

          {/* Favorites section */}
          {favorites.length > 0 && (
            <div className="max-w-2xl mx-auto mt-12">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                ❤️ Câu nói yêu thích
              </h3>
              <div className="space-y-3">
                {favorites.slice(-3).reverse().map((quote, index) => (
                  <div
                    key={`fav-${quote.generated_at}-${index}`}
                    className="bg-pink-50 p-4 rounded-lg border border-pink-100 cursor-pointer hover:bg-pink-100 transition-colors duration-200"
                    onClick={() => handleHistoryQuoteSelect(quote)}
                  >
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "{quote.quote}"
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>💭 {quote.mood}</span>
                      <span>⏰ {new Date(quote.generated_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                ))}
              </div>
              {favorites.length > 3 && (
                <p className="text-center text-gray-500 text-xs mt-3">
                  Và {favorites.length - 3} câu yêu thích khác...
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
