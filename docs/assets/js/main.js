// main.js

document.addEventListener("DOMContentLoaded", function () {
    obtenerNoticias();
    obtenerPrecios();
});

// Función para obtener noticias de criptomonedas desde la API de NewsAPI
async function obtenerNoticias() {
    const apiKey = 'TU_API_KEY_DE_NEWSAPI';
    const url = `https://newsapi.org/v2/everything?q=criptomonedas&language=es&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        mostrarNoticias(datos.articles);
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
    }
}

// Función para mostrar noticias en el HTML
function mostrarNoticias(noticias) {
    const contenedor = document.getElementById("lista-noticias");
    contenedor.innerHTML = noticias.map(noticia => `
        <div class="noticia">
            <h3>${noticia.title}</h3>
            <p>${noticia.description}</p>
            <a href="${noticia.url}" target="_blank">Leer más</a>
        </div>
    `).join("");
}

// Función para obtener precios de criptomonedas desde la API de CoinGecko
async function obtenerPrecios() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        mostrarPrecios(datos);
    } catch (error) {
        console.error("Error obteniendo precios:", error);
    }
}

// Función para mostrar precios en un gráfico
function mostrarPrecios(precios) {
    const ctx = document.getElementById('grafico-precios').getContext('2d');
    const labels = precios.map(precio => precio.name);
    const data = precios.map(precio => precio.current_price);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precio en USD',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
