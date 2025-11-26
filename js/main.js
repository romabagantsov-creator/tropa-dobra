// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initNewsletterSubscription();
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimation();
    initHeaderScrollEffect();
});

// Mobile navigation with improved functionality
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!navToggle || !navLinks) return;

    // Initialize mobile menu state
    function setMobileMenuState(isOpen) {
        if (window.innerWidth <= 768) {
            navLinks.style.display = isOpen ? 'flex' : 'none';
            navToggle.classList.toggle('active', isOpen);
            body.style.overflow = isOpen ? 'hidden' : '';
        } else {
            navLinks.style.display = 'flex';
            navToggle.classList.remove('active');
            body.style.overflow = '';
        }
    }

    // Toggle menu on click
    navToggle.addEventListener('click', function() {
        const isCurrentlyOpen = navLinks.style.display === 'flex';
        setMobileMenuState(!isCurrentlyOpen);
    });

    // Close menu when clicking on links (mobile only)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setMobileMenuState(false);
            }
        });
    });

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setMobileMenuState(false); // Close menu on resize
        }, 250);
    });

    // Initial state
    setMobileMenuState(false);
}

// Newsletter subscription with validation
function initNewsletterSubscription() {
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email адрес', 'error');
                emailInput.focus();
                return;
            }
            
            // Simulate API call
            simulateSubscription(email)
                .then(() => {
                    showNotification(`Спасибо за подписку! На ${email} будут приходить обновления проекта.`, 'success');
                    this.reset();
                })
                .catch(() => {
                    showNotification('Произошла ошибка при подписке. Попробуйте еще раз.', 'error');
                });
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate subscription API call
function simulateSubscription(email) {
    return new Promise((resolve, reject) => {
        // Simulate network request
        setTimeout(() => {
            // 90% success rate for demo
            Math.random() > 0.1 ? resolve() : reject();
        }, 1000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);

    // Add CSS animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scrolling with offset for fixed header
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.zone-card, .stat-item, .support-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize elements with hidden state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Animated counters
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + (target === 50 ? '+' : '');
        }
    };
    
    updateCounter();
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Utility function for debounce
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

// Handle page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class with delay for initial animations
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 500);
});

// Enhanced mobile menu toggle animation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Add CSS for nav-toggle animation
const navToggleStyles = document.createElement('style');
navToggleStyles.textContent = `
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    .nav-toggle span {
        transition: all 0.3s ease;
    }
    
    /* Preloader styles */
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loaded .preloader {
        opacity: 0;
        pointer-events: none;
    }
`;
document.head.appendChild(navToggleStyles);
