import React, { useState } from 'react';

const BuildCreator = ({ onSearch, isLoading }) => {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      onSearch(keywords);
    }
  };

  const addSuggestion = (text) => {
    const currentValue = keywords;
    const newValue = currentValue ? `${currentValue}, ${text}` : text;
    setKeywords(newValue);
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '25px',
      marginBottom: '30px',
      border: '1px solid rgba(244, 167, 36, 0.2)'
    }}>
      <h2 style={{
        color: '#f4a724',
        marginBottom: '15px',
        fontSize: '1.3rem'
      }}>What's Your Playstyle?</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="e.g., constant grenades, never reload, fast super, invisibility chains..."
          style={{
            width: '100%',
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '2px solid rgba(244, 167, 36, 0.3)',
            borderRadius: '10px',
            color: '#e6e6e6',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            marginBottom: '15px'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#f4a724';
            e.target.style.boxShadow = '0 0 15px rgba(244, 167, 36, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(244, 167, 36, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {['constant grenades', 'never reload', 'fast super', 'invisibility', 'healing', 'melee damage'].map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => addSuggestion(suggestion)}
              style={{
                background: 'rgba(244, 167, 36, 0.2)',
                color: '#f4a724',
                padding: '8px 15px',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(244, 167, 36, 0.3)',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(244, 167, 36, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(244, 167, 36, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔥 {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          disabled={!keywords.trim() || isLoading}
          style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(45deg, #f4a724, #ff8c00)',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: keywords.trim() && !isLoading ? 'pointer' : 'not-allowed',
            opacity: keywords.trim() && !isLoading ? 1 : 0.5,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (keywords.trim() && !isLoading) {
              e.target.style.background = 'linear-gradient(45deg, #ff8c00, #f4a724)';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (keywords.trim() && !isLoading) {
              e.target.style.background = 'linear-gradient(45deg, #f4a724, #ff8c00)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          {isLoading ? 'Casting...' : 'Cast My Perfect Build'}
        </button>
      </form>
    </div>
  );
};

export default BuildCreator;
