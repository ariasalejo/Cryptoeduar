// index.js - CryptoEduar

document.addEventListener("DOMContentLoaded", () => {
  console.log("CryptoEduar cargado correctamente.");

  // Inicialización de animaciones AOS
  AOS.init();

  // Scroll suave a secciones internas
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", function (e) {
      const destino = document.querySelector(this.getAttribute("href"));
      if (destino) {
        e.preventDefault();
        destino.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Validación rápida del formulario de contacto
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const mensaje = form.querySelector('textarea').value.trim();

      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos.");
      } else {
        alert("¡Mensaje enviado correctamente!");
        form.reset();
      }
    });
  }

  // Enlace del botón de comunidad (sección comunidad)
  const botonesComunidad = document.querySelectorAll(".comunidad-boton");
  botonesComunidad.forEach(btn => {
    btn.addEventListener("click", () => {
      window.open("https://t.me/criptoeduar", "_blank");
    });
  });

  // Pulsación animada en botón de "Comenzar ahora"
  const botonYoutube = document.querySelector(".pulse");
  if (botonYoutube) {
    botonYoutube.addEventListener("mouseenter", () => {
      botonYoutube.classList.add("animado");
    });
    botonYoutube.addEventListener("mouseleave", () => {
      botonYoutube.classList.remove("animado");
    });
  }
});
