// ✅ Función para obtener precios de criptomonedas desde CoinGecko y graficarlos
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

// ✅ Función para mostrar precios en un gráfico de barras
function mostrarPrecios(precios) {
    const ctx = document.getElementById('grafico-precios').getContext('2d');

    // Destruir el gráfico anterior si existe (evita errores al recargar)
    if (window.miGrafico) {
        window.miGrafico.destroy();
    }

    const labels = precios.map(p => p.name);
    const data = precios.map(p => p.current_price);

    window.miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precio en USD',
                data: data,
                backgroundColor: 'rgba(0, 255, 204, 0.2)',
                borderColor: 'rgba(0, 255, 204, 1)',
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: 'rgba(0, 255, 204, 0.4)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 10 Criptomonedas - Precios en USD',
                    color: '#00ffcc',
                    font: {
                        size: 18
                    }
                },
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: '#444' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#fff' },
                    grid: { color: '#444' }
                }
            }
        }
    });
}
