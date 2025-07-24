import React, { useState } from 'react';
import { Search } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const BuildCreator = ({ onSearch, isLoading }) => {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      onSearch(keywords);
    }
  };

  const quickSuggestions = [
    '🔥 Constant Grenades',
    '🔄 Never Reload', 
    '⚡ Fast Super',
    '👻 Invisibility',
    '💚 Healing',
    '👊 Melee Focus',
    '❄️ Stasis Effects',
    '🌟 Orb Generation'
  ];

  const addSuggestion = (suggestion) => {
    const cleanSuggestion = suggestion.replace(/^[🔥🔄⚡👻💚👊❄️🌟]\s/, '');
    const newValue = keywords ? `${keywords}, ${cleanSuggestion}` : cleanSuggestion;
    setKeywords(newValue);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Cast Your Perfect Guardian Build
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., constant grenades, never reload, fast super..."
            className="w-full px-6 py-4 bg-gray-900/70 border-2 border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
            disabled={isLoading}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addSuggestion(suggestion)}
              className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm hover:bg-yellow-400/30 transition-colors border border-yellow-400/30 hover:border-yellow-400/50"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <button
          type="submit"
          disabled={!keywords.trim() || isLoading}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? 'Casting...' : 'Cast My Perfect Build'}
        </button>
      </form>
      
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default BuildCreator;
