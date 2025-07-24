import React from 'react';
import { Star, Zap, Shield, Sword } from 'lucide-react';

const ResultsDisplay = ({ results, totalFound, processedKeywords }) => {
  if (!results || results.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/20 text-center">
        <div className="text-gray-400 mb-4">
          <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No synergistic items found</p>
          <p className="text-sm mt-2">Try different keywords like "grenade", "reload", or "super"</p>
        </div>
      </div>
    );
  }

  const getItemIcon = (type) => {
    if (type.includes('Weapon')) return <Sword className="w-5 h-5" />;
    if (type.includes('Armor')) return <Shield className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'exotic': return 'text-yellow-400 border-yellow-400/50';
      case 'legendary': return 'text-purple-400 border-purple-400/50';
      case 'rare': return 'text-blue-400 border-blue-400/50';
      default: return 'text-gray-400 border-gray-400/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Your Casted Build Components
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-gray-300">Found {totalFound} matches for:</span>
          {processedKeywords.slice(0, 8).map((keyword, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
            >
              {keyword}
            </span>
          ))}
          {processedKeywords.length > 8 && (
            <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm">
              +{processedKeywords.length - 8} more
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {results.map((item, index) => (
          <div 
            key={item.hash || index}
            className={`bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border-l-4 ${getRarityColor(item.rarity)} border border-gray-600/30 hover:border-gray-500/50 transition-all`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                {getItemIcon(item.type)}
                <div>
                  <h3 className={`text-lg font-bold ${getRarityColor(item.rarity).split(' ')[0]}`}>
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.type}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {item.synergyScore}% Match
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {item.matchedKeywords.map((keyword, keyIndex) => (
                <span 
                  key={keyIndex}
                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
