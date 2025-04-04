document.addEventListener('DOMContentLoaded', () => {
  // ======== Gráfico de precios con Chart.js ========
  const canvasPrice = document.getElementById('priceChart');
  if (canvasPrice) {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
      .then(response => response.json())
      .then(data => {
        // Extraemos datos
        const prices = data.prices.map(price => price[1]);
        const timestamps = data.prices.map(price => new Date(price[0]).toLocaleTimeString());
        
        // Crear gráfico
        const ctx = canvasPrice.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: timestamps,
            datasets: [{
              label: 'Precio BTC (USD)',
              data: prices,
              borderColor: '#00fff7',
              backgroundColor: 'rgba(0,255,247,0.2)',
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#fff' } } },
            scales: {
              x: { ticks: { color: '#ccc' } },
              y: { ticks: { color: '#ccc' } }
            }
          }
        });
        console.log('Gráfico de precios cargado correctamente');
      })
      .catch(err => console.error('Error al cargar el gráfico de precios:', err));
  } else {
    console.error('No se encontró el elemento canvas para el gráfico de precios (priceChart)');
  }

  // ======== Noticias desde NewsAPI ========
  const newsContainer = document.getElementById('newsContainer');
  if (newsContainer) {
    const newsAPIUrl = `https://newsapi.org/v2/everything?q=cryptocurrency&language=es&pageSize=6&apiKey=45b326355e6646eb91a52c48776d369b`;
    fetch(newsAPIUrl)
      .then(response => response.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          newsContainer.innerHTML = '';
          data.articles.forEach(article => {
            const articleElem = document.createElement('article');
            articleElem.classList.add('news-item');
            articleElem.innerHTML = `
              <h3>${article.title}</h3>
              <p>${article.description || 'Sin descripción disponible.'}</p>
              <a href="${article.url}" target="_blank">Leer más</a>
            `;
            newsContainer.appendChild(articleElem);
          });
          console.log('Noticias cargadas correctamente');
        } else {
          newsContainer.innerHTML = '<p>No se encontraron noticias.</p>';
          console.warn('No hay artículos en la respuesta de NewsAPI');
        }
      })
      .catch(error => {
        console.error('Error al cargar noticias:', error);
        newsContainer.innerHTML = '<p>Error al cargar noticias.</p>';
      });
  } else {
    console.error('No se encontró el contenedor para noticias (newsContainer)');
  }

  // ======== Función de animación al hacer scroll (opcional) ========
  const elementosAnimados = document.querySelectorAll('.animar');
  function animarAlScroll() {
    elementosAnimados.forEach(el => {
      const posicion = el.getBoundingClientRect().top;
      const alturaPantalla = window.innerHeight;
      if (posicion < alturaPantalla - 100) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', animarAlScroll);
  animarAlScroll();
});
