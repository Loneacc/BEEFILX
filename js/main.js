// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    } 
});

// Movie card hover effect
const movieCards = document.querySelectorAll('.movie-card');
movieCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.zIndex = '1';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '0';
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');
    const closeSearch = document.querySelector('.close-search');

    searchBtn.addEventListener('click', function() {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        } else {
            searchInput.value = ''; // Clear input when closing
        }
    });

    closeSearch.addEventListener('click', function() {
        searchBox.classList.remove('active');
        searchInput.value = ''; // Clear input when closing
    });

    // Close search box when pressing Escape key
    document.addEventListener('keydown', function(event) {
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
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index, currentSlide < index ? 1 : -1)); // Pass direction on dot click
        dots.appendChild(dot);
    });

    // Function to go to specific slide
    function goToSlide(newIndex, direction) { // direction: 1 for next, -1 for prev
        const oldSlideIndex = currentSlide;
        let calculatedNewIndex = (newIndex + slides.length) % slides.length;

        // Set initial position for the new slide before it becomes active
        // and final position for the old slide as it exits
        slides.forEach((slide, index) => {
            slide.classList.remove('active'); // Remove active from all
            document.querySelectorAll('.dot')[index].classList.remove('active'); // Remove dot active

            if (index === oldSlideIndex) {
                slide.style.transform = `translateX(${direction === 1 ? '-100%' : '100%'})`;
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            } else if (index === calculatedNewIndex) {
                // For the incoming slide, set its starting position
                slide.style.transform = `translateX(${direction === 1 ? '100%' : '-100%'})`;
                slide.style.opacity = '0'; // Start invisible for transition
                slide.style.zIndex = '1';
            } else {
                // Other slides are just off-screen (default to the 'next' direction side)
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            }
        });

        // Update currentSlide and then set active state for the new slide
        currentSlide = calculatedNewIndex;

        // Force reflow to ensure the initial transform is applied before the final one
        slides[currentSlide].offsetWidth; // Triggers reflow

        slides[currentSlide].style.transform = 'translateX(0)';
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].classList.add('active'); // Add active to the new slide
        document.querySelectorAll('.dot')[currentSlide].classList.add('active'); // Add dot active

        // Reset text overlay animation for the new slide
        const textOverlay = slides[currentSlide].querySelector('.text-overlay');
        if (textOverlay) {
            textOverlay.classList.remove('small');
            setTimeout(() => {
                textOverlay.classList.add('small');
            }, 5000);
        }
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1, 1); // Pass direction 1 for next
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1, -1); // Pass direction -1 for prev
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Start automatic slideshow
    function startSlideInterval() {
        // slideInterval = setInterval(nextSlide, 10000);
    }

    // Initial setup: 
    // Position all slides initially. The first one is active.
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.style.transform = 'translateX(0)';
            slide.style.opacity = '1';
            slide.style.zIndex = '1';
            slide.classList.add('active');
            document.querySelectorAll('.dot')[0].classList.add('active'); // Activate first dot
        } else {
            slide.style.transform = 'translateX(100%)'; // All others are off-screen right by default
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        }
    });

    // Initialize first slide text overlay
    const initialTextOverlay = slides[0].querySelector('.text-overlay');
    if (initialTextOverlay) {
        initialTextOverlay.classList.add('small');
    }
    
    // Add click listener to text overlays for size toggle
    slides.forEach(slide => {
        const textOverlay = slide.querySelector('.text-overlay');
        if (textOverlay) {
            textOverlay.addEventListener('click', () => {
                textOverlay.classList.toggle('small');
            });
        }
    });
    
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
