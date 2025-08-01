import React, { useState } from 'react';
import { MoodOption } from '../types';

interface MoodInputProps {
  onMoodSelect: (mood: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  selectedMood: string;
}

const moodOptions: MoodOption[] = [
  { id: 'vui vẻ', label: 'Vui vẻ', emoji: '😊' },
  { id: 'buồn', label: 'Buồn', emoji: '😢' },
  { id: 'động lực', label: 'Động lực', emoji: '🔥' },
  { id: 'lãng mạn', label: 'Lãng mạn', emoji: '💕' },
  { id: 'sâu lắng', label: 'Sâu lắng', emoji: '🤔' },
  { id: 'hài hước', label: 'Hài hước', emoji: '😄' },
  { id: 'an ủi', label: 'An ủi', emoji: '🤗' },
  { id: 'cảm hứng', label: 'Cảm hứng', emoji: '✨' },
];

const MoodInput: React.FC<MoodInputProps> = ({ 
  onMoodSelect, 
  onGenerate, 
  isLoading, 
  selectedMood 
}) => {
  const [customMood, setCustomMood] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const handleMoodClick = (moodId: string) => {
    setUseCustom(false);
    setCustomMood('');
    onMoodSelect(moodId);
  };

  const handleCustomMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMood(e.target.value);
    setUseCustom(true);
    onMoodSelect(e.target.value);
  };

  const handleGenerate = () => {
    const mood = useCustom ? customMood : selectedMood;
    if (mood.trim()) {
      onGenerate();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Bạn đang cảm thấy như thế nào?
      </h2>
      
      {/* Preset mood options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodClick(mood.id)}
            className={`mood-button ${!useCustom && selectedMood === mood.id ? 'active' : ''}`}
            disabled={isLoading}
          >
            <span className="text-lg mr-2">{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>

      {/* Custom mood input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hoặc tự nhập cảm xúc của bạn:
        </label>
        <input
          type="text"
          value={customMood}
          onChange={handleCustomMoodChange}
          placeholder="Ví dụ: mệt mỏi, hạnh phúc, lo lắng..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
          disabled={isLoading}
        />
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={isLoading || (!selectedMood && !customMood)}
        className="generate-button flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tạo câu nói...
          </>
        ) : (
          <>
            <span className="mr-2">✨</span>
            Tạo câu nói
          </>
        )}
      </button>
    </div>
  );
};

export default MoodInput;