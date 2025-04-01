const ctx = document.getElementById('cryptoChart').getContext('2d');

const cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [{
            label: 'Bitcoin Precio',
            data: [32000, 33000, 34000, 35000, 36000], 
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true
    }
});
