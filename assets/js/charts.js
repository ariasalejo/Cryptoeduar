function initChart() {
    const ctx = document.getElementById('mercadoChart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Bitcoin (BTC)',
                data: [65000, 70000, 80000, 85000, 90000, 95000],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderWidth: 3,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Tendencia Alcista 2024'
                }
            }
        }
    });
}
