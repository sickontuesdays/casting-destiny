import { getManifestComponent } from '../../../lib/bungie-api';
import { processKeywords } from '../../../lib/destiny-data';

let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const loadDestinyData = async () => {
  if (cachedData && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return cachedData;
  }

  try {
    const [
      inventoryItems,
      socketCategories,
      socketTypes,
      plugSets
    ] = await Promise.all([
      getManifestComponent('DestinyInventoryItemDefinition'),
      getManifestComponent('DestinySocketCategoryDefinition'),
      getManifestComponent('DestinySocketTypeDefinition'),
      getManifestComponent('DestinyPlugSetDefinition')
    ]);

    cachedData = {
      inventoryItems,
      socketCategories,
      socketTypes,
      plugSets
    };
    cacheTimestamp = Date.now();
    
    return cachedData;
  } catch (error) {
    console.error('Error loading Destiny data:', error);
    throw error;
  }
};

const findSynergisticItems = (keywords, destinyData) => {
  const results = [];
  const { inventoryItems } = destinyData;
  
  Object.values(inventoryItems).forEach(item => {
    if (!item.displayProperties?.name || !item.displayProperties?.description) {
      return;
    }
    
    const itemText = `${item.displayProperties.name} ${item.displayProperties.description}`.toLowerCase();
    const matchedKeywords = keywords.filter(keyword => itemText.includes(keyword));
    
    if (matchedKeywords.length > 0) {
      // Determine item type
      let itemType = 'Unknown';
      if (item.itemCategoryHashes) {
        if (item.itemCategoryHashes.includes(20)) itemType = 'Armor';
        if (item.itemCategoryHashes.includes(1)) itemType = 'Weapon';
        if (item.itemCategoryHashes.includes(59)) itemType = 'Mod';
      }
      
      // Check if it's an exotic
      if (item.inventory?.tierTypeName === 'Exotic' || item.itemTypeDisplayName === 'Exotic') {
        itemType = `Exotic ${itemType}`;
      }
      
      results.push({
        hash: item.hash,
        name: item.displayProperties.name,
        description: item.displayProperties.description,
        type: itemType,
        icon: item.displayProperties.icon,
        matchedKeywords,
        synergyScore: Math.round((matchedKeywords.length / keywords.length) * 100),
        rarity: item.inventory?.tierTypeName || 'Common'
      });
    }
  });
  
  return results.sort((a, b) => b.synergyScore - a.synergyScore);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { keywords: rawKeywords } = req.body;
    
    if (!rawKeywords || rawKeywords.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Keywords are required' 
      });
    }

    const keywords = processKeywords(rawKeywords);
    const destinyData = await loadDestinyData();
    const results = findSynergisticItems(keywords, destinyData);
    
    res.status(200).json({ 
      success: true, 
      results: results.slice(0, 20), // Limit to top 20 results
      totalFound: results.length,
      processedKeywords: keywords
    });
    
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search Destiny data',
      details: error.message 
    });
  }
}
