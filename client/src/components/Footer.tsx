import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center">
        <p className="text-gray-600 text-sm">
          Tác giả: <span className="font-medium text-gray-800">Thái Bình Dương</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Được tạo với ❤️ và Gemini AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;