document.addEventListener('DOMContentLoaded', () => {

    // ==== THEME TOGGLE LOGIC ====
    const themeToggle = document.getElementById('theme-toggle');
    const docElement = document.documentElement;

    // Apply saved theme on initial load, defaulting to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    docElement.setAttribute('data-theme', currentTheme);

    // Listen for a click on the theme toggle button
    themeToggle.addEventListener('click', () => {
        // Toggle the data-theme attribute
        const newTheme = docElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        docElement.setAttribute('data-theme', newTheme);
        // Save the new theme to localStorage
        localStorage.setItem('theme', newTheme);
    });


    // ==== TYPED.JS INITIALIZATION WITH GRADIENT EFFECT ====
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan) {
        new Typed('#typed-text', {
            strings: ['Full Stack Developer', 'Creative Professional', 'AI Enthusiast'],
            typeSpeed: 60,  // Updated speed
            backSpeed: 40,  // Updated speed
            backDelay: 2000,
            loop: true,
            // Callback when a string is fully typed
            onStringTyped: function(arrayPos, self) {
                // Check if the current string is "AI Enthusiast" (index 2)
                if (arrayPos === 2) {
                    typedTextSpan.classList.add('gradient-text');
                }
            },
            // Callback before a new string is typed
            preStringTyped: function(arrayPos, self) {
                // Always remove the class to reset the style
                typedTextSpan.classList.remove('gradient-text');
            }
        });
    }


    // ==== PARTICLE BACKGROUND ANIMATION ====
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

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
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let themeColor = document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(0, 123, 255, 0.5)' : 'rgba(0, 170, 255, 0.5)';
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, themeColor));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        function connect() {
            let opacityValue = 1;
            let themeColor = document.documentElement.getAttribute('data-theme') === 'light' ? '0, 123, 255' : '0, 170, 255';
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(${themeColor}, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        });
        
        // Re-initialize particles when theme changes
        themeToggle.addEventListener('click', init);

        init();
        animate();
    }


    // ==== SCROLL FADE-IN ANIMATION ====
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    // ==== CONTACT FORM VALIDATION ====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // This is a placeholder for form submission logic.
            // In a real application, you would send this data to a server.
            alert('Thank you for your message! (Form submission is for demo purposes only)');
            contactForm.reset();
        });
    }
});
