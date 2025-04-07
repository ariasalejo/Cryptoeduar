// API de Noticias
const apiKey = '45b326355e6646eb91a52c48776d369b';
const url = `https://newsapi.org/v2/everything?q=cryptocurrency&language=es&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    data.articles.forEach(article => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-card';
      newsItem.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="Imagen de noticia" />
        <h3>${article.title}</h3>
        <p>${article.description || 'Sin descripción disponible.'}</p>
        <a href="${article.url}" target="_blank">Leer más</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  })
  .catch(error => {
    console.error('Error al cargar las noticias:', error);
    document.getElementById('news-container').innerHTML = `
      <p>Error al cargar noticias. Intenta nuevamente más tarde.</p>
    `;
  });

// Botón "Comenzar Ahora" con scroll suave
document.querySelector('.btn-neon').addEventListener('click', () => {
  document.getElementById('herramientas').scrollIntoView({ behavior: 'smooth' });
});

// Validación del formulario de contacto
document.getElementById('contacto').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita el envío del formulario por defecto

  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica
  if (!nombre || !email || !mensaje) {
    alert("Por favor, completa todos los campos antes de enviar.");
    return;
  }

  // Si todo está correcto, muestra un mensaje de confirmación
  alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.");
  this.reset(); // Limpia los campos del formulario
});
