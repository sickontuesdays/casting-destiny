// ===== pages/index.js =====
import React, { useState } from 'react';
import Head from 'next/head';
import BuildCreator from '../components/BuildCreator';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (keywords) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/destiny/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err) {
      setError('Failed to connect to search service');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Casting Destiny</title>
        <meta name="description" content="Cast your perfect Destiny 2 build based on your playstyle - discover synergistic components that work together" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
              🔮 Casting Destiny
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cast your perfect Guardian build by describing your playstyle - discover the components that create perfect synergy
            </p>
          </div>

          {/* Build Creator */}
          <div className="mb-8">
            <BuildCreator onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 mb-8">
              <p className="text-red-300">⚠️ {error}</p>
            </div>
          )}

          {/* Results */}
          {searchResults && (
            <ResultsDisplay 
              results={searchResults.results}
              totalFound={searchResults.totalFound}
              processedKeywords={searchResults.processedKeywords}
            />
          )}
        </div>
      </div>
    </>
  );
}
