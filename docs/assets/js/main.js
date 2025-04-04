// main.js

document.addEventListener("DOMContentLoaded", () => {
  registrarServiceWorker();
  obtenerNoticias();
  obtenerPrecios();
  mostrarTendencias();
});

// ========== Service Worker ==========
function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("SW registrado:", reg.scope))
      .catch((err) => console.error("Error al registrar SW:", err));
  }
}

// ========== Noticias ==========
async function obtenerNoticias() {
  const apiKey = "45b326355e6646eb91a52c48776d369b";
  const url = `https://newsapi.org/v2/everything?q=criptomonedas&language=es&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    mostrarNoticias(datos.articles);
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
  }
}

function mostrarNoticias(noticias) {
  const contenedor = document.getElementById("lista-noticias");
  if (!contenedor) return;

  contenedor.innerHTML = noticias
    .map(
      (noticia) => `
    <div class="noticia">
      <h3>${noticia.title}</h3>
      <p>${noticia.description || "Sin descripción disponible."}</p>
      <a href="${noticia.url}" target="_blank">Leer más</a>
    </div>
  `
    )
    .join("");
}

// ========== Precios ==========
async function obtenerPrecios() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    mostrarPrecios(datos);
  } catch (error) {
    console.error("Error obteniendo precios:", error);
  }
}

function mostrarPrecios(precios) {
  const ctx = document.getElementById("grafico-precios").getContext("2d");
  const labels = precios.map((p) => p.name);
  const data = precios.map((p) => p.current_price);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Precio en USD",
          data: data,
          backgroundColor: "rgba(0,255,255,0.2)",
          borderColor: "rgba(0,255,255,1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// ========== Cálculo de ganancias/pérdidas ==========
document.getElementById("calcular")?.addEventListener("click", async () => {
  const cantidad = parseFloat(document.getElementById("cantidad-btc").value);
  const precioCompra = parseFloat(
    document.getElementById("precio-compra").value
  );

  if (isNaN(cantidad) || isNaN(precioCompra)) {
    alert("Por favor ingresa valores válidos.");
    return;
  }

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const data = await response.json();
    const precioActual = data.bitcoin.usd;
    const resultado = (precioActual - precioCompra) * cantidad;

    document.getElementById(
      "resultado"
    ).innerText = `Ganancia/Pérdida estimada: $${resultado.toFixed(2)}`;
  } catch (error) {
    console.error("Error al obtener precios", error);
  }
});

// ========== Tendencias ==========
async function mostrarTendencias() {
  try {
    const respuesta = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1"
    );
    const datos = await respuesta.json();

    const contenedor = document.getElementById("tendencias");
    if (!contenedor) return;

    contenedor.innerHTML = datos
      .map(
        (cripto) => `
      <li>${cripto.name}: $${cripto.current_price}</li>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error al obtener tendencias:", error);
  }
}
