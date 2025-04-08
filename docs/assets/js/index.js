// index.js - CryptoEduar

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker registrado:', reg.scope))
      .catch(err => console.error('❌ Error al registrar Service Worker:', err));
  });
}

// Animación suave al hacer scroll a secciones ancladas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Efecto hover para botones con clase .btn-neon
const neonButtons = document.querySelectorAll('.btn-neon');
neonButtons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.classList.add('hovered');
  });
  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('hovered');
  });
});

// Formulario de contacto - validación sencilla (opcional)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    
    if (!name.value || !email.value || !message.value) {
      e.preventDefault();
      alert('Por favor, completa todos los campos antes de enviar.');
    }
  });
}

// Placeholder de futuras funciones
console.log('CryptoEduar listo para explorar el mundo cripto.');
