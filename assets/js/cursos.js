(function() {
  // ====== MENÚ LATERAL Y OVERLAY ======
  function toggleMenu() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }

  function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // ====== MOSTRAR/OCULTAR LECCIONES ======
  function toggleCourse(courseLessonsId) {
    const lessonsDiv = document.getElementById(courseLessonsId);
    if (lessonsDiv) {
      lessonsDiv.style.display = lessonsDiv.style.display === 'none' ? 'block' : 'none';
    }
  }
  window.toggleCourse = toggleCourse;

  // ====== GUARDAR Y RESTAURAR ESTADO DE LECCIONES ======
  function marcarLeccion(checkbox) {
    const lessonText = checkbox.nextElementSibling.textContent.trim();
    const isChecked = checkbox.checked;

    localStorage.setItem(`lesson-${lessonText}`, isChecked);
    checkbox.parentElement.classList.toggle('completada', isChecked);
  }

  function restaurarLecciones() {
    document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
      const lessonText = checkbox.nextElementSibling.textContent.trim();
      const storedValue = localStorage.getItem(`lesson-${lessonText}`) === 'true';
      checkbox.checked = storedValue;
      checkbox.parentElement.classList.toggle('completada', storedValue);
    });
  }
  window.marcarLeccion = marcarLeccion;

  // ====== ACTUALIZAR BARRAS DE PROGRESO ======
  function calcularProgreso(courseSectionId) {
    const courseSection = document.getElementById(courseSectionId);
    if (!courseSection) return 0;

    const lessons = courseSection.querySelectorAll('.lesson-item');
    const completed = lessons.length && [...lessons].filter(lesson => lesson.classList.contains('completada')).length;

    return Math.round((completed / lessons.length) * 100);
  }

  function actualizarProgreso() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const courseSectionId = bar.dataset.course;
      bar.style.width = `${calcularProgreso(courseSectionId)}%`;
    });
  }
  window.actualizarProgreso = actualizarProgreso;

  // ====== SISTEMA DE VALORACIÓN CON ESTRELLAS ======
  function setupRating() {
    document.addEventListener('click', event => {
      if (event.target.classList.contains('star')) {
        const stars = event.target.parentElement.querySelectorAll('.star');
        const ratingValue = event.target.getAttribute('data-value');

        stars.forEach(star => {
          star.classList.toggle('selected', star.getAttribute('data-value') <= ratingValue);
        });

        console.log(`Se ha calificado con ${ratingValue} estrellas`);
      }
    });
  }

  // ====== FILTRO DE BÚSQUEDA ======
  function setupSearchFilter() {
    const searchInput = document.getElementById('course-search');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.course-section').forEach(section => {
          const titleElement = section.querySelector('.course-title');
          section.style.display = titleElement && titleElement.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
        });
      });
    }
  }

  // ====== INICIALIZACIÓN ======
  document.addEventListener('DOMContentLoaded', () => {
    restaurarLecciones();
    actualizarProgreso();
    setupRating();
    setupSearchFilter();
  });
})();
