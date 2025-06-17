// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    } 
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', function () {
        if (window.scrollY === 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    });
});
