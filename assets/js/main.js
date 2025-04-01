// main.js

// Inicializar Mermaid.js para diagramas de hoja de ruta
document.addEventListener("DOMContentLoaded", () => {
  mermaid.initialize({ startOnLoad: true });
});

// Función para cargar contenido dinámico (si es necesario)
function loadDynamicContent() {
  console.log("Cargando contenido dinámico...");
  // Aquí puedes agregar lógica para cargar datos desde APIs o archivos externos.
}

// Función para manejar errores generales
function handleError(error) {
  console.error("Ocurrió un error:", error);
  alert("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
}

// Ejemplo de función para validar formularios
function validateForm(form) {
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}

// Ejemplo de función para mostrar notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.padding = "10px";
  notification.style.margin = "10px auto";
  notification.style.borderRadius = "5px";
  notification.style.textAlign = "center";
  notification.style.maxWidth = "400px";

  if (type === "success") {
    notification.style.backgroundColor = "#d4edda";
    notification.style.color = "#155724";
  } else if (type === "error") {
    notification.style.backgroundColor = "#f8d7da";
    notification.style.color = "#721c24";
  } else {
    notification.style.backgroundColor = "#cce5ff";
    notification.style.color = "#004085";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Ejemplo de función para manejar el scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 20,
        behavior: "smooth",
      });
    }
  });
});

// Cargar contenido dinámico al iniciar
loadDynamicContent();

// Manejar errores globales
window.onerror = function (message, source, lineno, colno, error) {
  handleError(error || message);
};
