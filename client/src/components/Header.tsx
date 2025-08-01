import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          {/* Logo placeholder - can be replaced with actual logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Ngẫm</h1>
        </div>
        <p className="text-center text-gray-600 mt-2 text-sm">
          Tạo câu nói hay từ cảm xúc của bạn
        </p>
      </div>
    </header>
  );
};

export default Header;