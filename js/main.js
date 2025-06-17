// Movie card hover effect
const movieCards = document.querySelectorAll('.movie-card');
movieCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.zIndex = '1';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '0';
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');
    const closeSearch = document.querySelector('.close-search');

    searchBtn.addEventListener('click', function () {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        } else {
            searchInput.value = ''; // Clear input when closing
        }
    });

    closeSearch.addEventListener('click', function () {
        searchBox.classList.remove('active');
        searchInput.value = ''; // Clear input when closing
    });

    // Close search box when pressing Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
            searchInput.value = ''; // Clear input when closing
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function () {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});
