(function() {
  // ====== MENÚ LATERAL Y OVERLAY ======
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  // ====== MOSTRAR/OCULTAR LECCIONES ======
  // Función global para mostrar/ocultar las lecciones de un curso
  window.toggleCourse = function(courseLessonsId) {
    const lessonsDiv = document.getElementById(courseLessonsId);
    if (lessonsDiv) {
      // Se revisa el estilo computado (display) para determinar el estado actual
      if (getComputedStyle(lessonsDiv).display === 'none') {
        lessonsDiv.style.display = 'block';
      } else {
        lessonsDiv.style.display = 'none';
      }
    }
  };

  // ====== GUARDAR Y RESTAURAR ESTADO DE LECCIONES ======
  // Función global que marca la lección y actualiza su estado en localStorage
  window.marcarLeccion = function(checkbox) {
    const lessonText = checkbox.nextElementSibling.textContent.trim();
    const isChecked = checkbox.checked;
    localStorage.setItem('lesson-' + lessonText, isChecked);
    if (isChecked) {
      checkbox.parentElement.classList.add('completada');
    } else {
      checkbox.parentElement.classList.remove('completada');
    }
  };

  // Restaurar las lecciones según lo almacenado en localStorage
  function restaurarLecciones() {
    document.querySelectorAll('.lesson-checkbox').forEach(function(checkbox) {
      const lessonText = checkbox.nextElementSibling.textContent.trim();
      const storedValue = localStorage.getItem('lesson-' + lessonText);
      if (storedValue === "true") {
        checkbox.checked = true;
        checkbox.parentElement.classList.add('completada');
      }
    });
  }

  // ====== ACTUALIZAR BARRAS DE PROGRESO ======
  // Calcula el porcentaje de lecciones completadas de una sección de curso
  function calcularProgreso(courseSectionId) {
    const courseSection = document.getElementById(courseSectionId);
    if (!courseSection) return 0;
    const lessons = courseSection.querySelectorAll('.lesson-item');
    if (lessons.length === 0) return 0;
    let completed = 0;
    lessons.forEach(function(lesson) {
      if (lesson.classList.contains('completada')) {
        completed++;
      }
    });
    return Math.round((completed / lessons.length) * 100);
  }

  // Función global que actualiza las barras de progreso de cada curso
  window.actualizarProgreso = function() {
    const progressBar1 = document.getElementById('progress-curso1');
    if (progressBar1) {
      progressBar1.style.width = calcularProgreso('curso1') + '%';
    }
    const progressBar2 = document.getElementById('progress-curso2');
    if (progressBar2) {
      progressBar2.style.width = calcularProgreso('curso2') + '%';
    }
    const progressBar3 = document.getElementById('progress-curso3');
    if (progressBar3) {
      progressBar3.style.width = calcularProgreso('curso3') + '%';
    }
  };

  // ====== SISTEMA DE VALORACIÓN CON ESTRELLAS ======
  function setupRating() {
    // Para cada contenedor de valoración, se configura el comportamiento de las estrellas
    document.querySelectorAll('.rating').forEach(function(ratingContainer) {
      const stars = ratingContainer.querySelectorAll('.star');
      stars.forEach(function(star) {
        star.addEventListener('click', function() {
          const ratingValue = star.getAttribute('data-value');
          stars.forEach(function(s) {
            if (s.getAttribute('data-value') <= ratingValue) {
              s.classList.add('selected');
            } else {
              s.classList.remove('selected');
            }
          });
          console.log("Se ha calificado con " + ratingValue + " estrellas");
        });
      });
    });
  }

  // ====== FILTRO DE BÚSQUEDA ======
  function setupSearchFilter() {
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.course-section').forEach(function(section) {
          const titleElement = section.querySelector('.course-title');
          if (titleElement) {
            const titleText = titleElement.textContent.toLowerCase();
            section.style.display = titleText.includes(searchTerm) ? 'block' : 'none';
          }
        });
      });
    }
  }

  // ====== INICIALIZACIÓN ======
  document.addEventListener('DOMContentLoaded', function() {
    restaurarLecciones();
    actualizarProgreso();
    setupRating();
    setupSearchFilter();
  });
})();
