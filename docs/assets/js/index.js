document.addEventListener('DOMContentLoaded', () => {
  // Seleccionamos el contenedor donde se cargarán las noticias
  const newsContainer = document.getElementById('newsContainer');

  // Configuración de la API de NewsAPI
  const apiKey = '45b326355e6646eb91a52c48776d369b';
  const url = `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

  // Función para obtener y mostrar las noticias
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Limpiamos el contenedor de noticias
      newsContainer.innerHTML = '';

      // Tomamos solo las primeras 5 noticias
      const articles = data.articles.slice(0, 5);

      // Recorremos y agregamos cada noticia al contenedor
      articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description || 'No hay descripción disponible.'}</p>
          <small>${new Date(article.publishedAt).toLocaleString()}</small>
        `;
        newsContainer.appendChild(newsItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar las noticias:', error);
      newsContainer.innerHTML = '<p>Error al cargar las noticias. Intenta más tarde.</p>';
    });
});
