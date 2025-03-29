// docs/assets/js/app/api.js

/**
 * Configuración de la API
 * @type {Object}
 */
const API_CONFIG = {
  baseUrl: 'https://api.coingecko.com/api/v3',
  endpoints: {
    marketData: '/coins/markets',
    coinDetail: '/coins/{id}'
  },
  defaultParams: {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 10,
    page: 1,
    sparkline: false,
    price_change_percentage: '24h'
  },
  cacheTime: 5 * 60 * 1000 // 5 minutos en milisegundos
};

/**
 * Obtiene datos del mercado de criptomonedas
 * @param {Object} params - Parámetros personalizados para la consulta
 * @returns {Promise<Array>} - Datos de criptomonedas
 */
export async function getMarketData(params = {}) {
  const queryParams = new URLSearchParams({
    ...API_CONFIG.defaultParams,
    ...params
  });

  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketData}?${queryParams}`;
  const cacheKey = `market-${queryParams.toString()}`;

  try {
    // Verificar caché primero
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Guardar en caché
    saveToCache(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    
    // Fallback a caché si hay error de red
    const cached = getFromCache(cacheKey);
    if (cached) {
      console.warn('Using cached data due to API error');
      return cached;
    }
    
    throw error;
  }
}

/**
 * Obtiene detalles de una criptomoneda específica
 * @param {string} coinId - ID de la criptomoneda (ej: 'bitcoin')
 * @returns {Promise<Object>} - Detalles completos
 */
export async function getCoinDetail(coinId) {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.coinDetail.replace('{id}', coinId)}`;
  const cacheKey = `coin-${coinId}`;

  try {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching details for ${coinId}:`, error);
    
    const cached = getFromCache(cacheKey);
    if (cached) {
      console.warn('Using cached data due to API error');
      return cached;
    }
    
    throw error;
  }
}

// --- Helpers de caché ---
function saveToCache(key, data) {
  const cacheItem = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
}

function getFromCache(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  
  // Verificar si el caché está expirado
  if (Date.now() - timestamp > API_CONFIG.cacheTime) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
}

/**
 * Ejemplo de uso:
 * 
 * // Obtener top 10 criptomonedas
 * getMarketData()
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 * 
 * // Obtener detalles de Bitcoin
 * getCoinDetail('bitcoin')
 *   .then(data => console.log(data));
 */
