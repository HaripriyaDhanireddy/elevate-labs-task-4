// Mobile Navigation Toggle Function
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    
    // Close mobile menu when clicking on navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('mainNav');
            nav.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside of navigation
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('mainNav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        // Check if click is outside nav and toggle button
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading animation to feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add responsive image loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Handle window resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Clear existing timer
        clearTimeout(resizeTimer);
        
        // Set new timer
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to larger screen
            if (window.innerWidth > 768) {
                const nav = document.getElementById('mainNav');
                nav.classList.remove('active');
            }
            
            // Recalculate layout if needed
            console.log('Window resized to:', window.innerWidth + 'x' + window.innerHeight);
        }, 250);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const nav = document.getElementById('mainNav');
            nav.classList.remove('active');
        }
        
        // Enter key on mobile menu toggle
        if (e.key === 'Enter' && e.target.classList.contains('mobile-menu-toggle')) {
            toggleMobileMenu();
        }
    });

    // Add touch support for better mobile interaction
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;
        
        // Optional: Add swipe gestures for navigation
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped up
                console.log('Swiped up');
            } else {
                // Swiped down
                console.log('Swiped down');
            }
        }
    }

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add class to body when mobile menu is active for additional styling
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    mobileToggle.addEventListener('click', function() {
        document.body.classList.toggle('mobile-menu-active');
    });

    console.log('Responsive website initialized successfully!');
});

// Utility function to check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Utility function to check if device is tablet
function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Utility function to get current breakpoint
function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile-small';
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
}

// Export functions for use in other scripts (if needed)
window.ResponsiveUtils = {
    isMobile,
    isTablet,
    getCurrentBreakpoint,
    toggleMobileMenu
};