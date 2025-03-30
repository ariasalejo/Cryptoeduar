// Cargar precios de criptos
async function loadCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        
        document.getElementById('btc-price').textContent = `$${data.bitcoin.usd}`;
        document.getElementById('eth-price').textContent = `$${data.ethereum.usd}`;
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadCryptoPrices();
    setInterval(loadCryptoPrices, 30000);  // Actualizar cada 30 seg
});
