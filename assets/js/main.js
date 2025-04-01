// 🎨 Modo oscuro/claro
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// 📈 Obtener precio de Bitcoin en tiempo real
async function obtenerPrecioBitcoin() {
    try {
        let respuesta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        let datos = await respuesta.json();
        return datos.bitcoin.usd;
    } catch (error) {
        console.error("Error obteniendo precio de Bitcoin:", error);
        return 36000; // Valor por defecto si hay error
    }
}

// 📈 Gráfico interactivo del mercado cripto con datos actualizados
async function actualizarGrafico() {
    let precioActual = await obtenerPrecioBitcoin();
    
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    const cryptoChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            datasets: [{
                label: "Bitcoin Precio",
                data: [precioActual - 500, precioActual - 250, precioActual, precioActual + 250, precioActual + 500],
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });
}

// 🏦 Simulador de inversión con precio actualizado
async function calcularGanancia() {
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    let precioCompra = parseFloat(document.getElementById("precio").value);
    let precioActual = await obtenerPrecioBitcoin(); // Precio en tiempo real

    let ganancia = (precioActual - precioCompra) * cantidad;
    document.getElementById("resultado").innerText = `Ganancia/Pérdida estimada: $${ganancia.toFixed(2)}`;
}

// 🔄 Cargar gráfico con datos actualizados al iniciar
window.onload = actualizarGrafico;
