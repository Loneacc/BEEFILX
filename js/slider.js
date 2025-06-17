// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slideContents = document.querySelectorAll('.slide-content');
    const dots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    // Add hover event listeners for video playback
    slides.forEach(slide => {
        const video = slide.querySelector('video');
        const iframe = slide.querySelector('iframe');
        let hoverTimeout; // Add timeout variable
        
        console.log('Found video:', video); // Debug log
        
        if (video) {
            // Add sound to video
            video.muted = false;
            video.volume = 0.3; // Set volume to 30%
            
            slide.addEventListener('mouseenter', () => {
                console.log('Mouse enter - starting 2s delay'); // Debug log
                // Pause slider interval when hovering
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
                
                // Add 2-second delay before playing video
                hoverTimeout = setTimeout(() => {
                    console.log('2s delay completed - playing video'); // Debug log
                    // Reset video to beginning
                    video.currentTime = 0;
                    // Add class to show video and hide image
                    slide.classList.add('video-playing');
                    video.play().catch(e => console.log('Video play error:', e));
                }, 2000);
            });
            
            slide.addEventListener('mouseleave', () => {
                console.log('Mouse leave - pausing video and clearing timeout'); // Debug log
                // Clear the timeout if mouse leaves before 2 seconds
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                // Remove video-playing class to show image again
                slide.classList.remove('video-playing');
                video.pause();
                // Resume slider interval when leaving
                startSlideInterval();
            });
            
            // Auto advance to next slide when video ends
            video.addEventListener('ended', () => {
                console.log('Video ended - advancing to next slide');
                // Remove video-playing class
                slide.classList.remove('video-playing');
                
                // Pause current slider interval
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
                
                // Advance to next slide
                nextSlide();
                
                // Auto-play the next slide's video after a short delay
                setTimeout(() => {
                    const nextSlideElement = slides[currentSlide];
                    const nextVideo = nextSlideElement.querySelector('video');
                    if (nextVideo) {
                        console.log('Auto-playing next video');
                        // Reset and play the next video
                        nextVideo.currentTime = 0;
                        nextSlideElement.classList.add('video-playing');
                        nextVideo.play().catch(e => console.log('Next video play error:', e));
                    }
                }, 2000); // 2 second delay before playing next video
            });
        }
        
        if (iframe) {
            slide.addEventListener('mouseenter', () => {
                // Pause slider interval when hovering
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
                
                // Add 2-second delay before playing YouTube video
                hoverTimeout = setTimeout(() => {
                    // Add class to show video and hide image
                    slide.classList.add('video-playing');
                    // Add autoplay parameter to YouTube URL
                    const currentSrc = iframe.src;
                    const baseUrl = currentSrc.split('?')[0];
                    const params = new URLSearchParams(currentSrc.split('?')[1] || '');
                    params.set('autoplay', '1');
                    params.set('mute', '0'); // Enable sound for YouTube
                    params.set('controls', '0');
                    params.set('showinfo', '0');
                    params.set('rel', '0');
                    iframe.src = `${baseUrl}?${params.toString()}`;
                }, 2000);
            });
            slide.addEventListener('mouseleave', () => {
                // Clear the timeout if mouse leaves before 2 seconds
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                // Remove video-playing class
                slide.classList.remove('video-playing');
                // Resume slider interval when leaving
                startSlideInterval();
                // Remove autoplay parameter when mouse leaves
                const currentSrc = iframe.src;
                const baseUrl = currentSrc.split('?')[0];
                const params = new URLSearchParams(currentSrc.split('?')[1] || '');
                params.delete('autoplay');
                params.delete('mute');
                iframe.src = `${baseUrl}?${params.toString()}`;
            });
        }
    });

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index, currentSlide < index ? 1 : -1));
        dots.appendChild(dot);
    });

    // Function to reset animations (remove animate class)
    function resetAnimations(slide) {
        const textOverlay = slide.querySelector('.text-overlay');
        const description = slide.querySelector('.slide-description');
        
        if (textOverlay) {
            textOverlay.style.animation = 'none';
            textOverlay.offsetHeight; // Force reflow
            textOverlay.style.animation = 'moveToBottom 1.5s ease-in-out forwards';
            textOverlay.style.animationDelay = '5s';
        }
        
        if (description) {
            description.style.animation = 'none';
            description.offsetHeight; // Force reflow
            description.style.animation = 'fadeOut 1.5s ease-out forwards';
            description.style.animationDelay = '5s';
        }
    }

    // Function to toggle animations
    function toggleAnimations(slide) {
        const textOverlay = slide.querySelector('.text-overlay');
        const description = slide.querySelector('.slide-description');
        
        if (textOverlay && description) {
            isAnimating = !isAnimating;
            
            if (isAnimating) {
                // Start animations
                textOverlay.style.animation = 'moveToBottom 1.5s ease-in-out forwards';
                textOverlay.style.animationDelay = '0s';
                description.style.animation = 'fadeOut 1.5s ease-out forwards';
                description.style.animationDelay = '0s';
            } else {
                // Reset to initial state
                textOverlay.style.animation = 'none';
                textOverlay.offsetHeight;
                textOverlay.style.animation = 'moveToBottom 1.5s ease-in-out forwards';
                textOverlay.style.animationDelay = '5s';
                
                description.style.animation = 'none';
                description.offsetHeight;
                description.style.animation = 'fadeOut 1.5s ease-out forwards';
                description.style.animationDelay = '5s';
            }
        }
    }

    // Function to go to specific slide
    function goToSlide(newIndex, direction) {
        const oldSlideIndex = currentSlide;
        let calculatedNewIndex = (newIndex + slides.length) % slides.length;

        // Reset animations for the new slide before transitioning
        const newSlide = slides[calculatedNewIndex];
        resetAnimations(newSlide);
        isAnimating = false;

        slides.forEach((slide, index) => {
            // Handle old slide
            if (index === oldSlideIndex) {
                slide.classList.remove('active');
                document.querySelectorAll('.dot')[index].classList.remove('active');
                slide.style.transform = `translateX(${direction === 1 ? '-100%' : '100%'})`;
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            } 
            // Handle new slide
            else if (index === calculatedNewIndex) {
                slide.style.transform = `translateX(${direction === 1 ? '100%' : '-100%'})`;
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            } 
            // Handle other slides
            else {
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            }
        });

        // Update currentSlide and then set active state for the new slide
        currentSlide = calculatedNewIndex;

        // Force reflow for the new slide to apply initial transform before transition
        slides[currentSlide].offsetWidth;

        slides[currentSlide].style.transform = 'translateX(0)';
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');

        // Hide all slide contents
        slideContents.forEach(content => {
            content.classList.remove('active-content');
        });

        // Show the slide content for the new slide
        const newSlideContent = document.querySelector(`.slide-content[data-slide-index="${currentSlide}"]`);
        if (newSlideContent) {
            newSlideContent.classList.add('active-content');
        }

        // Add click event listener to text-overlay
        const currentTextOverlay = slides[currentSlide].querySelector('.text-overlay');
        if (currentTextOverlay) {
            currentTextOverlay.addEventListener('click', () => {
                toggleAnimations(slides[currentSlide]);
            });
        }
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1, 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1, -1);
    }

    // Start slide interval
    function startSlideInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 10000); // 10 seconds
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(slideInterval);
        startSlideInterval();
    });
    prevBtn.addEventListener('click', () => {
        prevSlide();
        clearInterval(slideInterval);
        startSlideInterval();
    });
    nextSlideBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(slideInterval);
        startSlideInterval();
    });
    prevSlideBtn.addEventListener('click', () => {
        prevSlide();
        clearInterval(slideInterval);
        startSlideInterval();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
            clearInterval(slideInterval);
            startSlideInterval();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
            clearInterval(slideInterval);
            startSlideInterval();
        }
    });

    // Initialize first slide
    goToSlide(0, 1);
    startSlideInterval();
});
