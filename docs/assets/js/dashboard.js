// assets/js/dashboard.js
'use strict';

// Configuración global
const CONFIG = {
  API_URL: 'https://api.coingecko.com/api/v3',
  CURRENCY: 'usd',
  UPDATE_INTERVAL: 60000, // 1 minuto
  DEFAULT_CRYPTOS: ['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'cardano', 'solana', 'dogecoin', 'shiba-inu', 'avalanche-2', 'polkadot'],
  DOMINANCE_CRYPTOS: ['bitcoin', 'ethereum']
};

// Estado de la aplicación
const state = {
  cryptoData: {},
  alerts: JSON.parse(localStorage.getItem('cryptoAlerts')) || [],
  charts: {},
  currentView: 'overview',
  selectedCryptoDetails: null
};

// Clase para manejar las APIs
class CryptoAPI {
  static async fetchMarketData(ids) {
    try {
      const response = await axios.get(`${CONFIG.API_URL}/coins/markets`, {
        params: {
          vs_currency: CONFIG.CURRENCY,
          ids: ids.join(','),
          order: 'market_cap_desc',
          sparkline: false,
          price_change_percentage: '1h,24h,7d'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      return [];
    }
  }

  static async getHistoricalData(id, days = 30) {
    try {
      const response = await axios.get(`${CONFIG.API_URL}/coins/${id}/market_chart`, {
        params: {
          vs_currency: CONFIG.CURRENCY,
          days: days,
          interval: 'daily'
        }
      });
      return response.data.prices;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  }

  static async convertCurrency(from, to, amount) {
    try {
      const response = await axios.get(`${CONFIG.API_URL}/simple/price`, {
        params: {
          ids: from,
          vs_currencies: to
        }
      });
      return amount * response.data[from][to];
    } catch (error) {
      console.error('Conversion error:', error);
      return null;
    }
  }

  static async getCoinDetails(id) {
    try {
      const response = await axios.get(`${CONFIG.API_URL}/coins/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for ${id}:`, error);
      return null;
    }
  }

  static async getMarketDominance() {
    try {
      const response = await axios.get(`${CONFIG.API_URL}/global`);
      return response.data.data.market_cap_percentage;
    } catch (error) {
      console.error('Error fetching market dominance:', error);
      return null;
    }
  }

  static async getMarketSentiment() {
    try {
      const response = await axios.get('https://api.alternative.me/fng/?limit=1');
      return response.data.data[0];
    } catch (error) {
      console.error('Error fetching market sentiment:', error);
      return null;
    }
  }
}

// Clase para manejar los gráficos
class ChartManager {
  static createChart(canvasId, data, type = 'line') {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Precio',
          data: data.values,
          borderColor: '#4f46e5',
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: {
            display: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    });
  }

  static updateChart(chart, newData) {
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.values;
    chart.update();
  }

  static createPieChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#00ff88', '#a7ff83'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#a7ff83'
            }
          }
        }
      }
    });
  }
}

// Clase para actualizar la UI
class UIUpdater {
  static updateComparativeTable(data) {
    const tbody = document.getElementById('comparative-table-body');
    tbody.innerHTML = data.map(crypto => `
      <tr data-crypto-id="${crypto.id}">
        <td><img src="${crypto.image}" alt="${crypto.name}" class="crypto-logo"></td>
        <td>${crypto.name}</td>
        <td>${crypto.symbol.toUpperCase()}</td>
        <td>${this.formatCurrency(crypto.current_price)}</td>
        <td class="${this.getPriceChangeClass(crypto.price_change_percentage_1h)}">${crypto.price_change_percentage_1h ? crypto.price_change_percentage_1h.toFixed(2) + '%' : 'N/A'}</td>
        <td class="${this.getPriceChangeClass(crypto.price_change_percentage_24h)}">${crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) + '%' : 'N/A'}</td>
        <td class="${this.getPriceChangeClass(crypto.price_change_percentage_7d)}">${crypto.price_change_percentage_7d ? crypto.price_change_percentage_7d.toFixed(2) + '%' : 'N/A'}</td>
        <td>${this.formatMarketCap(crypto.market_cap)}</td>
        <td>${this.formatNumber(crypto.total_volume)}</td>
        <td><button class="details-btn" data-crypto-id="${crypto.id}">Ver Detalles</button></td>
      </tr>
    `).join('');
  }

  static updatePriceTicker(data) {
    const ticker = document.getElementById('price-ticker');
    ticker.innerHTML = data.map(crypto => `
      <div class="ticker-item">
        <span>${crypto.symbol.toUpperCase()}:</span>
        <span class="price">${this.formatCurrency(crypto.current_price)}</span>
        <span class="${this.getPriceChangeClass(crypto.price_change_percentage_24h)}">
          (${crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) + '%' : 'N/A'})
        </span>
      </div>
    `).join('');
  }

  static updateMarketSentiment(sentimentData) {
    const sentimentDiv = document.getElementById('market-sentiment');
    if (sentimentData) {
      sentimentDiv.innerHTML = `
        <p>Valor: ${sentimentData.value}</p>
        <p>Sentimiento: ${sentimentData.value_classification}</p>
      `;
    } else {
      sentimentDiv.innerHTML = '<p>Error al cargar el sentimiento.</p>';
    }
  }

  static updateDominanceChart(dominance) {
    const dominanceChartCanvasId = 'dominance-chart';
    const labels = [`Bitcoin (${dominance.bitcoin.toFixed(1)}%)`, `Ethereum (${dominance.ethereum.toFixed(1)}%)`, 'Otros'];
    const data = [dominance.bitcoin, dominance.ethereum, 100 - dominance.bitcoin - dominance.ethereum];
    ChartManager.createPieChart(dominanceChartCanvasId, labels, data);
  }

  static displayCryptoDetails(details) {
    const detailsTitle = document.getElementById('crypto-details-title');
    const detailsContent = document.getElementById('crypto-details-content');
    const detailsSection = document.getElementById('crypto-details');

    detailsTitle.textContent = details.name;
    detailsContent.innerHTML = `
      <img src="${details.image.large}" alt="${details.name}" style="max-width: 50px;">
      <p>Símbolo: ${details.symbol.toUpperCase()}</p>
      <p>Precio actual: ${this.formatCurrency(details.market_data.current_price.usd)}</p>
      <p>Rango en el mercado: ${details.market_data.market_cap_rank}</p>
      <p>Sitio web: <a href="${details.links.homepage[0]}" target="_blank">${details.links.homepage[0]}</a></p>
      `;
    detailsSection.style.display = 'block';
  }

  static hideCryptoDetails() {
    const detailsSection = document.getElementById('crypto-details');
    detailsSection.style.display = 'none';
  }

  static updateInvestmentResult(amount, result) {
    const investmentResultDiv = document.getElementById('investment-result');
    investmentResultDiv.innerHTML = `
      <h3>Resultado de la Inversión</h3>
      <p>Invertiste: ${this.formatCurrency(amount)}</p>
      <p>Cantidad estimada de ${result.symbol.toUpperCase()}: <span class="highlight">${result.amount.toFixed(8)}</span></p>
      <p>Precio actual de ${result.symbol.toUpperCase()}: ${this.formatCurrency(result.current_price)}</p>
    `;
  }

  static updateConversionResult(from, to, amount, result) {
    const conversionResultDiv = document.getElementById('conversion-result');
    conversionResultDiv.innerHTML = `
      <h3>Resultado de la Conversión</h3>
      <p><span class="highlight">${amount} ${from.toUpperCase()}</span> equivale a:</p>
      <p><span class="highlight">${this.formatCurrency(result)} ${to.toUpperCase()}</span></p>
    `;
  }

  static async calculateAndDisplayTargetTime(targetPrice, timeframe) {
    const currentBitcoinData = state.cryptoData.find(crypto => crypto.id === 'bitcoin');
    if (!currentBitcoinData) {
      document.getElementById('target-time-result').textContent = 'No se pudo obtener el precio actual de Bitcoin.';
      return;
    }
    const currentPrice = currentBitcoinData.current_price;
    const percentageIncreaseNeeded = ((targetPrice - currentPrice) / currentPrice) * 100;

    // Esto es una versión muy simplificada y podría no ser precisa
    let estimatedTime = 'Cálculo en progreso...';

    // Ejemplo muy básico (necesitarías una lógica más sofisticada)
    if (percentageIncreaseNeeded > 0) {
      estimatedTime = `Se estima que tomará un tiempo significativo alcanzar este precio.`;
      // Podrías intentar calcular un promedio de crecimiento diario/mensual/anual
      // y usar eso para proyectar, pero es muy especulativo.
    } else {
      estimatedTime = 'El precio objetivo ya se ha alcanzado o es inferior al precio actual.';
    }

    document.getElementById('target-time-result').textContent = `Precio Objetivo: $${targetPrice}, Horizonte: ${timeframe}. Estimación: ${estimatedTime}`;
  }

  static formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: CONFIG.CURRENCY
    }).format(value);
  }

  static formatMarketCap(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: CONFIG.CURRENCY,
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  }

  static formatNumber(value) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  }

  static getPriceChangeClass(percentage) {
    if (percentage > 0) {
      return 'positive';
    } else if (percentage < 0) {
      return 'negative';
    } else {
      return '';
    }
  }

  static filterTable(searchTerm) {
    const tableRows = document.querySelectorAll('#comparative-table-body tr');
    searchTerm = searchTerm.toLowerCase();

    tableRows.forEach(row => {
      const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      const symbol = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
      if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
}

// Manejadores de eventos
class EventHandlers {
  static initEventListeners() {
    // Formulario de inversión
    document.getElementById('investment-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('amount').value);
      const cryptoId = document.getElementById('crypto-select').value;

      const cryptoData = await CryptoAPI.fetchMarketData([cryptoId]);
      if (cryptoData.length > 0) {
        const crypto = cryptoData[0];
        UIUpdater.updateInvestmentResult(amount, {
          amount: amount / crypto.current_price,
          symbol: crypto.symbol,
          current_price: crypto.current_price
        });
      }
    });

    // Conversor
    document.getElementById('convertButton').addEventListener('click', async () => {
      const from = document.getElementById('from-crypto').value;
      const to = document.getElementById('to-crypto').value;
      const amount = parseFloat(document.getElementById('conv-amount').value);

      const result = await CryptoAPI.convertCurrency(from, to, amount);
      if (result !== null) {
        UIUpdater.updateConversionResult(from, to, amount, result);
      }
    });

    // Alertas
    document.getElementById('alert-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const cryptoId = document.getElementById('alert-crypto-select').value;
      const price = parseFloat(document.getElementById('price-target').value);
      state.alerts.push({ cryptoId, price, currency: CONFIG.CURRENCY });
      localStorage.setItem('cryptoAlerts', JSON.stringify(state.alerts));
      e.target.reset();
      // Aquí podrías añadir lógica para mostrar visualmente la alerta creada
    });

    // Navegación
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        state.currentView = e.target.dataset.section;
        this.handleNavigation(state.currentView);
        document.querySelectorAll('.nav-link').forEach(navLink => {
          navLink.classList.remove('active');
        });
        e.target.classList.add('active');
      });
    });

    // Filtro de tabla
    document.getElementById('crypto-search').addEventListener('input', (e) => {
      UIUpdater.filterTable(e.target.value);
    });

    // Detalles de cripto
    document.getElementById('comparative-table-body').addEventListener('click', async (e) => {
      if (e.target.classList.contains('details-btn')) {
        const cryptoId = e.target.dataset.cryptoId;
        const details = await CryptoAPI.getCoinDetails(cryptoId);
        if (details) {
          state.selectedCryptoDetails = details;
          UIUpdater.displayCryptoDetails(details);
        }
      }
    });

    // Cerrar detalles de cripto
    document.getElementById('close-details').addEventListener('click', () => {
      UIUpdater.hideCryptoDetails();
    });

    // Toggle del glosario
    const glossaryAccordion = document.querySelector('.glossary-accordion');
    const glossaryToggle = document.querySelector('.accordion-toggle');
    if (glossaryToggle && glossaryAccordion) {
      glossaryToggle.addEventListener('click', () => {
        glossaryAccordion.classList.toggle('open');
        const expanded = glossaryToggle.getAttribute('aria-expanded') === 'true' || false;
        glossaryToggle.setAttribute('aria-expanded', !expanded);
      });
    }

    // Calculadora de precio objetivo
    document.getElementById('calculate-target-time').addEventListener('click', () => {
      const targetPrice = parseFloat(document.getElementById('target-price').value);
      const timeframe = document.getElementById('timeframe').value;
      UIUpdater.calculateAndDisplayTargetTime(targetPrice, timeframe);
    });
  }

  static handleNavigation(section) {
    document.querySelectorAll('.dashboard-section').forEach(sec => {
      sec.style.display = sec.id === section ? 'block' : 'none';
    });
    if (section === 'comparativa' && state.selectedCryptoDetails) {
      document.getElementById('crypto-details').style.display = 'block';
    } else if (section !== 'comparativa') {
      UIUpdater.hideCryptoDetails();
    }
  }
}

// Inicialización de la aplicación
class AppInit {
  static async initialize() {
    await this.loadInitialData();
    this.initializeOverviewCharts();
    EventHandlers.initEventListeners();
    this.startDataUpdates();
    EventHandlers.handleNavigation(state.currentView);
  }

  static async loadInitialData() {
    const data = await CryptoAPI.fetchMarketData(CONFIG.DEFAULT_CRYPTOS);
    state.cryptoData = data;
    UIUpdater.updateComparativeTable(data);

    // Load price ticker data
    const tickerData = await CryptoAPI.fetchMarketData(CONFIG.DEFAULT_CRYPTOS.slice(0, 5)); // Display first 5 in ticker
    UIUpdater.updatePriceTicker(tickerData);

    // Load market dominance data
    const dominanceData = await CryptoAPI.getMarketDominance();
    if (dominanceData) {
      UIUpdater.updateDominanceChart(dominanceData);
    }

    // Load market sentiment data
    const sentimentData = await CryptoAPI.getMarketSentiment();
    UIUpdater.updateMarketSentiment(sentimentData);
  }

  static async initializeOverviewCharts() {
    // Bitcoin Chart (Comentado para eliminarlo)
    // const bitcoinHistoricalData = await CryptoAPI.getHistoricalData('bitcoin');
    // const bitcoinChartData = {
    //   labels: bitcoinHistoricalData.map(([date]) => new Date(date).toLocaleDateString('es-ES')),
    //   values: bitcoinHistoricalData.map(([, price]) => price)
    // };
    // state.charts['bitcoin-chart'] = ChartManager.createChart('bitcoin-chart', bitcoinChartData);
  }

  static startDataUpdates() {
    setInterval(async () => {
      const newData = await CryptoAPI.fetchMarketData(CONFIG.DEFAULT_CRYPTOS);
      state.cryptoData = newData;
      UIUpdater.updateComparativeTable(newData);

      const tickerData = await CryptoAPI.fetchMarketData(CONFIG.DEFAULT_CRYPTOS.slice(0, 5));
      UIUpdater.updatePriceTicker(tickerData);

      const dominanceData = await CryptoAPI.getMarketDominance();
      if (dominanceData) {
        UIUpdater.updateDominanceChart(dominanceData);
      }

      const sentimentData = await CryptoAPI.getMarketSentiment();
      UIUpdater.updateMarketSentiment(sentimentData);

      // Update Bitcoin chart (Comentado para eliminarlo)
      // const bitcoinHistoricalData = await CryptoAPI.getHistoricalData('bitcoin');
      // const bitcoinChartData = {
      //   labels: bitcoinHistoricalData.map(([date]) => new Date(date).toLocaleDateString('es-ES')),
      //   values: bitcoinHistoricalData.map(([, price]) => price)
      // };
      // if (state.charts['bitcoin-chart']) {
      //   ChartManager.updateChart(state.charts['bitcoin-chart'], bitcoinChartData);
      // }

    }, CONFIG.UPDATE_INTERVAL);
  }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  AppInit.initialize();
});
