document.addEventListener('DOMContentLoaded', () => {
  // Mostrar año actual en el footer si lo necesitas
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Cargar noticias desde la API de criptomonedas (ejemplo con NewsAPI)
  const noticiasContainer = document.getElementById('noticias');
  const apiKey = '45b326355e6646eb91a52c48776d369b';
  const url = `https://newsapi.org/v2/everything?q=cryptocurrency&language=es&sortBy=publishedAt&apiKey=${apiKey}`;

  if (noticiasContainer) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        noticiasContainer.innerHTML = '';
        data.articles.slice(0, 5).forEach(article => {
          const div = document.createElement('div');
          div.classList.add('noticia');
          div.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'Sin descripción'}</p>
            <a href="${article.url}" target="_blank">Leer más</a>
          `;
          noticiasContainer.appendChild(div);
        });
      })
      .catch(error => {
        noticiasContainer.innerHTML = '<p>Error al cargar las noticias</p>';
        console.error('Error al cargar noticias:', error);
      });
  }

  // Efecto de animación al hacer scroll
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
  animarAlScroll(); // Ejecutar al cargar
});
