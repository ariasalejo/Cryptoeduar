// curso1.js

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('cryptoGrowthChart').getContext('2d');

    const cryptoGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
            datasets: [{
                label: 'Crecimiento de Bitcoin (USD)',
                data: [0, 1, 50, 1500, 20000, 50000, 60000],
                borderColor: '#ff00d4',
                backgroundColor: 'rgba(255, 0, 212, 0.2)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#00fff7',
                pointBorderColor: '#ff00d4',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: {
                            family: 'Orbitron',
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#0a0f1c',
                    titleColor: '#00fff7',
                    bodyColor: '#fff'
                }
            },
            scales: {
                x: {
                    ticks: { color: '#00fff7', font: { family: 'Orbitron' } },
                    grid: { color: 'rgba(0, 255, 255, 0.2)' }
                },
                y: {
                    ticks: { color: '#00fff7', font: { family: 'Orbitron' } },
                    grid: { color: 'rgba(255, 0, 212, 0.1)' }
                }
            }
        }
    });
});
