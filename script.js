document.addEventListener('DOMContentLoaded', () => {

    // ==== PRELOADER LOGIC (REVISED) ====
    const preloader = document.getElementById('preloader');
    const contentWrapper = document.getElementById('content-wrapper');
    const lottieContainer = document.getElementById('lottie-animation');

    // Load the Lottie animation
    if (lottieContainer) {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://lottie.host/80b72183-5091-49ae-9937-2938a14b5f4c/5qQK0y5uit.json'
        });
    }

    // This function will hide the loader and show the content
    function showContent() {
        if (preloader) {
            preloader.style.display = 'none';
        }
        if (contentWrapper) {
            contentWrapper.style.display = 'block';
        }
    }

    // Show the content after a minimum delay to ensure the loader is seen
    // You can adjust the time (in milliseconds) as needed
    setTimeout(showContent, 1500); // <-- Shows loader for at least 1.5 seconds

    // You can also still use window.load for a more robust experience on slow networks
    // window.addEventListener('load', () => {
    //     setTimeout(showContent, 500); // A short delay after everything is loaded
    // });


    // ==== THEME TOGGLE, TYPED.JS, PARTICLES, etc. ====
    // ... all the rest of your JavaScript code ...

});
