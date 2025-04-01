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

// 🔄 Cargar gráfico con datos actualizados al iniciar
window.onload = actualizarGrafico;
