
// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // PRELOADER: mantiene la lógica que ya usabas pero más segura
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    // espera un poco para que la transición sea visible
    setTimeout(()=> {
      if (preloader) preloader.classList.add('hide');
    }, 600); // bajé el timeout a 600ms para mejorar sensación de velocidad
  });

  // MENU HAMBURGUESA (robusto)
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('navbar');

  if (!toggle) console.warn('menu-toggle no encontrado (id="menu-toggle")');
  if (!nav) console.warn('navbar no encontrado (id="navbar")');

  if (toggle && nav) {
    // accesibilidad: aria-expanded
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show'); // añade/remueve clase .show
      toggle.classList.toggle('open'); // para animar icono si quieres
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // cerrar menú al hacer clic en un enlace (útil en móvil)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          nav.classList.remove('show');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // cerrar menú si se redimensiona a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        nav.classList.remove('show');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // opcional: cerrar al hacer clic fuera del nav
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (window.innerWidth <= 768 && nav.classList.contains('show')) {
        if (!nav.contains(target) && !toggle.contains(target)) {
          nav.classList.remove('show');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
});

const buttons = document.querySelectorAll('.floating-btn');
const nequiModal = document.getElementById('nequiModal');
const nequiBtn = document.getElementById('btn-nequi');
const closeModal = document.getElementById('closeModal');

// Modal de Nequi
nequiBtn.addEventListener('click', () => {
  nequiModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  nequiModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === nequiModal) {
    nequiModal.style.display = 'none';
  }
});
// ====== Bancolombia ======
const btnBanco = document.getElementById('btn-bancolombia');
const bancoModal = document.getElementById('bancoModal');
const closeBanco = document.getElementById('closeBanco');

btnBanco.addEventListener('click', () => {
  bancoModal.style.display = 'flex';
});
closeBanco.addEventListener('click', () => {
  bancoModal.style.display = 'none';
});

// Cerrar si clic fuera
window.addEventListener('click', (e) => {
  if (e.target === nequiModal) nequiModal.style.display = 'none';
  if (e.target === bancoModal) bancoModal.style.display = 'none';
});

// Animación campana + glow en todos los botones
setInterval(() => {
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add('shake');
      setTimeout(() => {
        btn.classList.remove('shake');
      }, 600);
    }, index * 500); // desfase entre botones
  });
}, 8000); // cada 8 segundos