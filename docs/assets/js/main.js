// === Gráfico de precios en tiempo real ===
const ctx = document.getElementById('priceChart');
const priceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Hace 5 min', 'Hace 4 min', 'Hace 3 min', 'Hace 2 min', 'Ahora'],
    datasets: [{
      label: 'Precio BTC (USD)',
      data: [69000, 69200, 69150, 69300, 69400],
      borderColor: '#0ff',
      backgroundColor: 'rgba(0,255,255,0.2)',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      x: { ticks: { color: '#aaa' } },
      y: { ticks: { color: '#aaa' } }
    }
  }
});

// === Noticias desde NewsAPI ===
const newsContainer = document.getElementById('news-container');
const apiKey = '45b326355e6646eb91a52c48776d369b';
const url = `https://newsapi.org/v2/everything?q=crypto&language=es&apiKey=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    newsContainer.innerHTML = '';
    data.articles.slice(0, 6).forEach(article => {
      const div = document.createElement('div');
      div.className = 'news-item';
      div.innerHTML = `
        <h4>${article.title}</h4>
        <p>${article.description || ''}</p>
        <a href="${article.url}" target="_blank">Leer más</a>
      `;
      newsContainer.appendChild(div);
    });
  })
  .catch(() => {
    newsContainer.innerHTML = '<p>Error al cargar noticias.</p>';
  });

// === Simulador de inversión ===
document.getElementById('investment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);
  const crypto = document.getElementById('crypto-select').value;
  const resultEl = document.getElementById('investment-result');

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
    const data = await res.json();
    const price = data[crypto].usd;
    const coins = amount / price;
    resultEl.textContent = `Con $${amount} obtienes ${coins.toFixed(6)} ${crypto.toUpperCase()} (1 = $${price})`;
  } catch {
    resultEl.textContent = 'Error al calcular.';
  }
});

// === Comparativa de criptomonedas ===
const comparativaContainer = document.getElementById('comparativa-container');

async function cargarComparativa() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,solana,polkadot');
    const data = await res.json();
    comparativaContainer.innerHTML = '';
    data.forEach(coin => {
      const card = document.createElement('div');
      card.className = 'crypto-card';
      card.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}" />
        <h4>${coin.name} (${coin.symbol.toUpperCase()})</h4>
        <p>Precio: $${coin.current_price}</p>
        <p>Cap. Mercado: $${coin.market_cap.toLocaleString()}</p>
        <p>24h: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
      `;
      comparativaContainer.appendChild(card);
    });
  } catch (err) {
    comparativaContainer.innerHTML = '<p>Error al cargar comparativas.</p>';
  }
}
cargarComparativa();

// === Historial ficticio de actividades ===
const historialList = document.getElementById('historial-list');
const historial = [
  'Calculaste inversión en BTC - $100 USD',
  'Consultaste noticias de criptomonedas',
  'Revisaste comparativa de Ethereum y Solana',
];
historialList.innerHTML = '';
historial.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  historialList.appendChild(li);
});
