// Configuración de la API CoinGecko
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

// Obtener datos del mercado
async function getMarketData(params = {}) {
  const queryParams = new URLSearchParams({
    ...API_CONFIG.defaultParams,
    ...params
  });

  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketData}?${queryParams}`;
  const cacheKey = `market-${queryParams.toString()}`;

  try {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    const cached = getFromCache(cacheKey);
    if (cached) {
      console.warn('Usando caché debido a error');
      return cached;
    }
    throw error;
  }
}

// Obtener detalle de una moneda
async function getCoinDetail(coinId) {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.coinDetail.replace('{id}', coinId)}`;
  const cacheKey = `coin-${coinId}`;

  try {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error obteniendo detalles de ${coinId}:`, error);
    const cached = getFromCache(cacheKey);
    if (cached) {
      console.warn('Usando caché debido a error');
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
  if (Date.now() - timestamp > API_CONFIG.cacheTime) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
}
