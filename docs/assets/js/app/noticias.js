async function obtenerNoticiasCripto() {
  try {
    const respuesta = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=ES");
    const datos = await respuesta.json();
    return datos.Data.slice(0, 5); // Solo 5 noticias
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
    return [];
  }
}

async function mostrarNoticias() {
  const noticias = await obtenerNoticiasCripto();
  const contenedor = document.getElementById("noticias");

  contenedor.innerHTML = noticias.map(noticia => `
    <div class="noticia">
      <h3>${noticia.title}</h3>
      <p>${noticia.body.substring(0, 100)}...</p>
      <a href="${noticia.url}" target="_blank">Leer más</a>
    </div>
  `).join("");
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', mostrarNoticias);
