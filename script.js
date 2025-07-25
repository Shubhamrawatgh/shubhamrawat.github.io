document.addEventListener('DOMContentLoaded', () => {

    // ==== THEME SWITCHER ====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
        // Inform particle animation of theme change
        if (window.particleAnimation) {
            window.particleAnimation.updateTheme();
        }
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Load saved theme or user preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));


    // ==== INTERACTIVE PARTICLE BACKGROUND ====
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        // ... (Particle class methods)
    }

    const particleAnimation = {
        init() {
            // ... (init implementation)
        },
        animate() {
            // ... (animate implementation)
        },
        connect() {
            // ... (connect implementation with mouse interaction)
        },
        updateTheme() {
            // Function to update colors when theme changes
            if (particlesArray) {
                const theme = document.body.dataset.theme || 'dark';
                const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim().replace(/"/g, '');
                particlesArray.forEach(p => p.color = particleColor);
            }
        },
        handleResize() {
            // ... (resize implementation)
        }
    };
    
    // Attach to window object to be accessible by theme switcher
    window.particleAnimation = particleAnimation;
    particleAnimation.init();
    particleAnimation.animate();
    window.addEventListener('resize', () => particleAnimation.handleResize());


    // ==== TYPEWRITER EFFECT ====
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = `<span class="cursor"></span>`; // Start with just a cursor
        const typing = () => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + `<span class="cursor"></span>`;
                i++;
                setTimeout(typing, speed);
            } else {
                element.querySelector('.cursor').style.animation = 'blink 1s infinite';
            }
        };
        typing();
    };

    const headline = document.getElementById('hero-headline');
    const tagline = document.getElementById('hero-tagline');
    const headlineText = "Hi, I'm Shubham Rawat.";
    const taglineText = "A passionate Full Stack Developer and Creative Professional.";

    setTimeout(() => {
        typeWriter(headline, headlineText, 80);
    }, 1000); // Start after hero fade-in

    setTimeout(() => {
        tagline.style.opacity = 1;
        typeWriter(tagline, taglineText, 50);
    }, 1000 + (headlineText.length * 80) + 300); // Start after headline finishes


    // ==== FADE-IN SCROLL ANIMATION (Unchanged) ====
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));


    // ==== CONTACT FORM VALIDATION (Unchanged) ====
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

});
