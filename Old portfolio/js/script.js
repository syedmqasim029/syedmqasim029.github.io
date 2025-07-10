document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1500);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark/Light Mode Toggle
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🌙';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.background = '#00aaff';
    toggleBtn.style.color = '#fff';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.width = '50px';
    toggleBtn.style.height = '50px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '1000';
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', 
            document.body.classList.contains('light-mode') ? 'Switch to dark mode' : 'Switch to light mode');
    });
    document.body.appendChild(toggleBtn);

    // Typing Effect
    const heroText = "Welcome to My Portfolio";
    const heroHeading = document.querySelector('.hero h1');
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = heroHeading.textContent;

        if (!isDeleting) {
            if (index < heroText.length) {
                heroHeading.textContent = heroText.substring(0, index + 1) + '|';
                index++;
                setTimeout(typeWriter, 100);
            } else {
                isDeleting = true;
                setTimeout(typeWriter, 1000);
            }
        } else {
            if (index > 0) {
                heroHeading.textContent = heroText.substring(0, index - 1) + '|';
                index--;
                setTimeout(typeWriter, 50);
            } else {
                isDeleting = false;
                setTimeout(typeWriter, 500);
            }
        }
    }

    // Form Handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    form.reset();
                    alert('Message sent successfully!');
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
            }
        });
    }

    // Start typing effect
    heroHeading.textContent = "";
    typeWriter();
});