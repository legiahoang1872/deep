import React, { useState, useEffect } from 'react';
import { Quote } from '../types';

interface QuoteDisplayProps {
  quote: Quote | null;
  isVisible: boolean;
  onFavorite?: (quote: Quote) => void;
  onRegenerate?: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ 
  quote, 
  isVisible, 
  onFavorite, 
  onRegenerate 
}) => {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    if (isVisible && quote) {
      // Small delay for animation effect
      const timer = setTimeout(() => setShowQuote(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowQuote(false);
    }
  }, [isVisible, quote]);

  if (!quote || !isVisible) {
    return null;
  }

  return (
    <div className={`quote-card max-w-2xl mx-auto mt-8 ${showQuote ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="text-center">
        {/* Quote text */}
        <blockquote className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-4">
          "{quote.quote}"
        </blockquote>
        
        {/* Signature */}
        <div className="text-right text-gray-600 text-sm mb-6">
          — Ngẫm
        </div>
        
        {/* Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
            Cảm xúc: {quote.mood}
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            {new Date(quote.generated_at).toLocaleString('vi-VN')}
          </span>
          {quote.cached && (
            <span className="flex items-center text-blue-600">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Đã lưu cache
            </span>
          )}
          {quote.fallback && (
            <span className="flex items-center text-orange-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Câu mẫu
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          {onFavorite && (
            <button
              onClick={() => onFavorite(quote)}
              className="flex-1 px-4 py-2 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors duration-200 flex items-center justify-center"
            >
              <span className="mr-2">💝</span>
              Yêu thích
            </button>
          )}
          
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <span className="mr-2">🔄</span>
              Tạo lại
            </button>
          )}
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Ngẫm - Câu nói hay',
                  text: `"${quote.quote}" — Ngẫm`,
                });
              } else {
                navigator.clipboard.writeText(`"${quote.quote}" — Ngẫm`);
                // Could add a toast notification here
              }
            }}
            className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center"
          >
            <span className="mr-2">📋</span>
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;