// Immediately load theme preference to avoid flash of wrong styling
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  if (themeToggle) {
    // Set initial icon
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-bs-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-bs-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // Navbar Scroll Accent
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  // Dynamic Typing Animation
  const typedTextEl = document.querySelector('.typed-text');
  if (typedTextEl) {
    const roles = ['ML concepts & projects.', 'DL concepts & projects.', 'GenAI concepts & projects.'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000; // Delay between words

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
      } else {
        typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = newTextDelay; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Pause before typing next word
      }

      setTimeout(type, typingDelay);
    }

    setTimeout(type, 1000); // Initial start delay
  }

  // Project Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrapper');
  
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-categories') || '';
          const categoryList = categories.split(' ');
          
          if (filterValue === 'all' || categoryList.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  
  function reveal() {
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 120; // Trigger distance in pixels
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', reveal);
  reveal(); // Initial run

  // Active Link Scrolling Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to Top Button Behavior
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth Scrolling for Navigation Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Collapse mobile navbar menu on link click
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
        
        // Scroll to target offset for navbar height
        const navbarHeight = header ? header.offsetHeight : 80;
        window.scrollTo({
          top: target.offsetTop - navbarHeight + 10,
          behavior: 'smooth'
        });
      }
    });
  });
});
