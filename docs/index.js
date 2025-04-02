// 🌟 Función para obtener precios en tiempo real y calcular ganancias/pérdidas
document.getElementById("calcular").addEventListener("click", function() {
    let cantidadBTC = parseFloat(document.getElementById("cantidad-btc").value);
    let precioCompra = parseFloat(document.getElementById("precio-compra").value);

    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        .then(response => response.json())
        .then(data => {
            let precioActual = data.bitcoin.usd;
            let resultado = (precioActual - precioCompra) * cantidadBTC;
            document.getElementById("resultado").innerText = `Ganancia/Pérdida estimada: $${resultado.toFixed(2)}`;
        })
        .catch(error => console.error("Error al obtener precios", error));
});

// 🔥 Función para mostrar tendencias del mercado en tiempo real
async function mostrarTendencias() {
    try {
        const respuesta = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1");
        const datos = await respuesta.json();

        let contenido = "<ul>";
        datos.forEach(cripto => {
