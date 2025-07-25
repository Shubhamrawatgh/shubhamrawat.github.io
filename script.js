document.addEventListener('DOMContentLoaded', () => {

    // ==== THEME SWITCHER ====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Function to apply the selected theme
    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        // Update icon based on theme
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        // Save the theme to localStorage
        localStorage.setItem('theme', theme);
    };

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply the saved theme or the preferred theme
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDark ? 'dark' : 'light');
    }


    // ==== SCROLL FADE-IN ANIMATION ====
    const sections = document.querySelectorAll('.fade-in-section');
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
