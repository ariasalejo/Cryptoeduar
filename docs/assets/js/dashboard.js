// Clave de API y monedas a consultar
const apiKey = "45b326355e6646eb91a52c48776d369b";
const coins = ["bitcoin", "ethereum", "solana", "cardano", "dogecoin", "ripple"];

// Mostrar precios en tiempo real
async function mostrarPrecios() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=usd`);
    const data = await res.json();

    document.getElementById("bitcoin-price").textContent = `$${data.bitcoin.usd}`;
    document.getElementById("ethereum-price").textContent = `$${data.ethereum.usd}`;
    document.getElementById("solana-price").textContent = `$${data.solana.usd}`;
    document.getElementById("cardano-price").textContent = `$${data.cardano.usd}`;
    document.getElementById("dogecoin-price").textContent = `$${data.dogecoin.usd}`;
    document.getElementById("xrp-price").textContent = `$${data.ripple.usd}`;
  } catch (error) {
    console.error("Error al obtener precios:", error);
  }
}

// Mostrar gráfica
async function mostrarGrafico() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7`);
    const data = await res.json();

    const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());
    const prices = data.prices.map(p => p[1]);

    new Chart(document.getElementById("priceChart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Bitcoin",
          data: prices,
          borderColor: "#0ff",
          backgroundColor: "rgba(0,255,255,0.1)",
          fill: true,
          tension: 0.3,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#0ff" } }
        },
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff" } },
        }
      }
    });
  } catch (error) {
    console.error("Error al cargar gráfico:", error);
  }
}

// Mostrar comparativa
async function mostrarComparativa() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(",")}`);
    const data = await res.json();
    const tbody = document.querySelector("#crypto-comparison tbody");
    tbody.innerHTML = "";

    data.forEach(coin => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${coin.image}" alt="${coin.name}" width="20" style="vertical-align: middle; margin-right: 5px;"> ${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener comparativa:", error);
  }
}

// Mostrar estado del mercado
async function mostrarEstadoMercado() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/global`);
    const data = await res.json();
    const totalMarketCap = data.data.total_market_cap.usd.toLocaleString();
    const btcDominance = data.data.market_cap_percentage.btc.toFixed(2);
    const activeCryptos = data.data.active_cryptocurrencies;

    document.getElementById("market-status").innerHTML = `
      <p><strong>Capitalización total:</strong> $${totalMarketCap}</p>
      <p><strong>Dominancia BTC:</strong> ${btcDominance}%</p>
      <p><strong>Criptomonedas activas:</strong> ${activeCryptos}</p>
    `;
  } catch (error) {
    console.error("Error al obtener estado del mercado:", error);
  }
}

// Inicializar todo
mostrarPrecios();
mostrarGrafico();
mostrarComparativa();
mostrarEstadoMercado();
