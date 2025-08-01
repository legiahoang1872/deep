import React from 'react';
import { Quote } from '../types';

interface QuoteHistoryProps {
  quotes: Quote[];
  onQuoteSelect?: (quote: Quote) => void;
}

const QuoteHistory: React.FC<QuoteHistoryProps> = ({ quotes, onQuoteSelect }) => {
  if (quotes.length === 0) {
    return null;
  }

  // Show only the last 3 quotes
  const recentQuotes = quotes.slice(-3).reverse();

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Câu nói gần đây
      </h3>
      
      <div className="space-y-3">
        {recentQuotes.map((quote, index) => (
          <div
            key={`${quote.generated_at}-${index}`}
            className={`bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-200 ${
              onQuoteSelect ? 'cursor-pointer hover:bg-gray-100 hover:border-gray-200' : ''
            }`}
            onClick={() => onQuoteSelect?.(quote)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{quote.quote}"
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>💭 {quote.mood}</span>
                  <span>⏰ {new Date(quote.generated_at).toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                  {quote.cached && <span className="text-blue-600">📦 Cache</span>}
                  {quote.fallback && <span className="text-orange-600">🔧 Mẫu</span>}
                </div>
              </div>
              
              {onQuoteSelect && (
                <button className="ml-3 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {quotes.length > 3 && (
        <p className="text-center text-gray-500 text-xs mt-3">
          Và {quotes.length - 3} câu nói khác...
        </p>
      )}
    </div>
  );
};

export default QuoteHistory;