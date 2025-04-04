// 🌟 Cargar cursos dinámicamente en cursos.html
async function cargarCursos() {
    const respuesta = await fetch("assets/data/courses.json");
    const cursos = await respuesta.json();
    
    let contenido = "<h2>📚 Cursos Disponibles</h2><ul>";
    cursos.forEach(curso => {
        contenido += `<li><strong>${curso.title}</strong> - ${curso.description} <br> Nivel: ${curso.level} | Duración: ${curso.duration}</li>`;
    });
    contenido += "</ul>";

    document.getElementById("cursos-container").innerHTML = contenido;
}
if (document.getElementById("cursos-container")) {
    cargarCursos();
}

// 🔥 Simulador de inversión con precios en tiempo real
document.getElementById("calcular")?.addEventListener("click", async function() {
    const cantidadBTC = parseFloat(document.getElementById("cantidad-btc").value);
    const precioCompra = parseFloat(document.getElementById("precio-compra").value);

    try {
        const respuesta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const datos = await respuesta.json();
        const precioActual = datos.bitcoin.usd;
        const resultado = (precioActual - precioCompra) * cantidadBTC;
        
        document.getElementById("resultado").innerText = `Ganancia/Pérdida estimada: $${resultado.toFixed(2)}`;
    } catch (error) {
        console.error("Error al obtener precios", error);
        document.getElementById("resultado").innerText = "Error al calcular.";
    }
});

// 📈 Mostrar tendencias del mercado en tiempo real
async function mostrarTendencias() {
    try {
        const respuesta = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1");
        const datos = await respuesta.json();

        let contenido = "<h3>Tendencias del Mercado</h3><ul>";
        datos.forEach(cripto => {
            contenido += `<li>${cripto.name}: $${cripto.current_price} (${cripto.price_change_percentage_24h.toFixed(2)}%)</li>`;
        });
        contenido += "</ul>";

        document.getElementById("tendencias-datos").innerHTML = contenido;
    } catch (error) {
        console.error("Error al obtener tendencias del mercado", error);
        document.getElementById("tendencias-datos").innerText = "Error al cargar datos.";
    }
}
if (document.getElementById("tendencias-datos")) {
    mostrarTendencias();
}

// 🛠️ Registrar Service Worker para instalar como PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.cjs').then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    }).catch((error) => {
      console.log('Error al registrar el Service Worker:', error);
    });
  });
}

// Tu código adicional aquí...
