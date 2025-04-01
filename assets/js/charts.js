async function obtenerPrecioBitcoin() {
    let respuesta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
    let datos = await respuesta.json();
    return datos.bitcoin.usd;
}

async function actualizarGrafico() {
    let precioActual = await obtenerPrecioBitcoin();
    
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            datasets: [{
                label: "Bitcoin Precio",
                data: [precioActual - 500, precioActual - 250, precioActual, precioActual + 250, precioActual + 500],
                borderColor: "#FFD700",
                borderWidth: 3
            }]
        },
        options: {
            responsive: true
        }
    });
}

window.onload = actualizarGrafico;
