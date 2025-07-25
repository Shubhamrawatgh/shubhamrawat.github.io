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


    // ==== INTERACTIVE PARTICLE BACKGROUND (FIXED & OPTIMIZED) ====
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;
    const mouse = { x: null, y: null, radius: 100 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // --- Mouse Interaction ---
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 5;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 5;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 5;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 5;
                }
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    const particleAnimation = {
        init() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesArray = [];
            const theme = document.body.dataset.theme || 'dark';
            const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim().replace(/"/g, '');
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2.5) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        },
        animate() {
            requestAnimationFrame(this.animate.bind(this));
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            this.connect();
        },
        connect() {
            let opacityValue = 1;
            const linkColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-link-color').trim().replace(/"/g, '');
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = linkColor.replace(/,\s*\d?\.?\d*\)/, `, ${opacityValue})`);
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        },
        updateTheme() {
            if (particlesArray) {
                const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim().replace(/"/g, '');
                particlesArray.forEach(p => p.color = particleColor);
            }
        },
        handleResize() {
            this.init();
        }
    };
    
    // Attach to window object to be accessible by theme switcher
    window.particleAnimation = particleAnimation;
    particleAnimation.init();
    particleAnimation.animate();

    // Debounce resize handler for performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            particleAnimation.handleResize();
        }, 250);
    });


    // ==== TYPEWRITER EFFECT ====
    const typeWriter = (element, text, speed = 100, callback = () => {}) => {
        let i = 0;
        element.innerHTML = `<span class="cursor"></span>`;
        const typing = () => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + `<span class="cursor"></span>`;
                i++;
                setTimeout(typing, speed);
            } else {
                element.querySelector('.cursor').style.animation = 'blink 1s infinite';
                callback();
            }
        };
        typing();
    };

    const headline = document.getElementById('hero-headline');
    const tagline = document.getElementById('hero-tagline');
    const heroCTA = document.querySelector('.hero-cta');
    const headlineText = "Hi, I'm Shubham Rawat.";
    const taglineText = "A passionate Full Stack Developer and Creative Professional.";

    setTimeout(() => {
        typeWriter(headline, headlineText, 80, () => {
            // After headline finishes, type tagline
            setTimeout(() => {
                typeWriter(tagline, taglineText, 50, () => {
                    // After tagline finishes, show buttons
                    heroCTA.style.opacity = 1;
                    heroCTA.style.transform = 'translateY(0)';
                });
            }, 300);
        });
    }, 1000);


    // ==== FADE-IN SCROLL ANIMATION ====
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


    // ==== CONTACT FORM VALIDATION ====
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
