// Cargar gráfico de precios
const ctx = document.getElementById('priceChart').getContext('2d');
let priceChart;

async function fetchChartData() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1');
    const data = await res.json();

    const labels = data.prices.map(p => new Date(p[0]).toLocaleTimeString());
    const prices = data.prices.map(p => p[1]);

    if (priceChart) priceChart.destroy();

    priceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Precio Bitcoin (USD)',
          data: prices,
          borderColor: 'cyan',
          backgroundColor: 'rgba(0,255,255,0.1)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: 'white' }
          },
          y: {
            ticks: { color: 'white' }
          }
        }
      }
    });
  } catch (err) {
    console.error('Error al cargar gráfico:', err);
  }
}

// Precios en tiempo real
const coins = ['bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin', 'ripple'];
const priceIds = {
  bitcoin: 'bitcoin-price',
  ethereum: 'ethereum-price',
  solana: 'solana-price',
  cardano: 'cardano-price',
  dogecoin: 'dogecoin-price',
  ripple: 'xrp-price'
};

async function loadPrices() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`);
    const data = await res.json();

    coins.forEach(coin => {
      const el = document.getElementById(priceIds[coin]);
      if (el) el.textContent = `$${data[coin].usd.toLocaleString()}`;
    });
  } catch (err) {
    console.error('Error cargando precios:', err);
  }
}

// Comparativa
async function loadComparison() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(',')}`);
    const data = await res.json();

    const tbody = document.querySelector('#crypto-comparison tbody');
    tbody.innerHTML = '';

    data.forEach(coin => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${coin.image}" alt="${coin.name}" width="24"> ${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error en comparativa:', err);
  }
}

// Últimas noticias
async function loadNews() {
  try {
    const res = await fetch('https://newsapi.org/v2/everything?q=cryptocurrency&language=es&apiKey=45b326355e6646eb91a52c48776d369b');
    const data = await res.json();

    const newsContainer = document.getElementById('market-status');
    newsContainer.innerHTML = '';

    data.articles.slice(0, 5).forEach(article => {
      const div = document.createElement('div');
      div.className = 'news-item';
      div.innerHTML = `
        <h4>${article.title}</h4>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Leer más</a>
      `;
      newsContainer.appendChild(div);
    });
  } catch (err) {
    console.error('Error al cargar noticias:', err);
    const container = document.getElementById('market-status');
    if (container) container.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
  }
}

// Toggle menú en móvil
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => {
        console.log('Service Worker registrado:', reg.scope);
      })
      .catch(err => {
        console.error('Error al registrar el Service Worker:', err);
      });
  });
}

// Ejecutar al cargar
window.addEventListener('DOMContentLoaded', () => {
  fetchChartData();
  loadPrices();
  loadComparison();
  loadNews();
});
