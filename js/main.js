// Paternus Financial - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCharts();
    initContactForm();
    initAnimations();
    initScrollEffects();

    console.log('Paternus Financial website initialized');
});

// Smooth scroll to section function
function scrollToSection(selector) {
    const targetSection = document.querySelector(selector);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation functionality
function initNavigation() {
    console.log('initNavigation called');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    console.log('navToggle:', navToggle);
    console.log('navMenu:', navMenu);

    if (navToggle && navMenu) {
        console.log('Adding click listener to nav toggle');
        navToggle.addEventListener('click', function() {
            console.log('Nav toggle clicked!');
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Nav toggle active:', navToggle.classList.contains('active'));
            console.log('Nav menu active:', navMenu.classList.contains('active'));
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = '#053529';
                header.style.boxShadow = '0 2px 20px rgba(6, 68, 50, 0.3)';
            } else {
                header.style.background = '#064432';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Chart initialization
function initCharts() {
    // Performance Chart (Homepage)
    const performanceChart = document.getElementById('performanceChart');
    if (performanceChart) {
        drawPerformanceChart(performanceChart);
    }

    // Portfolio Chart (Services page)
    const portfolioChart = document.getElementById('portfolioChart');
    if (portfolioChart) {
        drawPortfolioChart(portfolioChart);
    }

    // Mini performance chart (Technology page)
    const performanceMiniChart = document.getElementById('performanceMiniChart');
    if (performanceMiniChart) {
        drawMiniPerformanceChart(performanceMiniChart);
    }
}

// Draw performance chart for homepage
function drawPerformanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Sample data points for a growing portfolio
    const data = [
        { x: 0, y: 100 },
        { x: 50, y: 105 },
        { x: 100, y: 98 },
        { x: 150, y: 110 },
        { x: 200, y: 115 },
        { x: 250, y: 108 },
        { x: 300, y: 125 },
        { x: 350, y: 135 }
    ];

    // Scale data to canvas
    const maxY = Math.max(...data.map(d => d.y));
    const minY = Math.min(...data.map(d => d.y));
    const yRange = maxY - minY;

    const scaledData = data.map(d => ({
        x: (d.x / 350) * (width - 40) + 20,
        y: height - 40 - ((d.y - minY) / yRange) * (height - 80)
    }));

    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (i * (height - 80) / 5);
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
    }

    // Draw area under curve
    ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
    ctx.beginPath();
    ctx.moveTo(scaledData[0].x, height - 40);
    scaledData.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(scaledData[scaledData.length - 1].x, height - 40);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(scaledData[0].x, scaledData[0].y);
    scaledData.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#2563eb';
    scaledData.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Add labels
    ctx.fillStyle = '#4a5568';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Portfolio Performance Over Time', width / 2, 20);

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (i * (height - 80) / 5);
        const value = maxY - (i * yRange / 5);
        ctx.fillText(value.toFixed(0) + '%', 15, y + 4);
    }
}

// Draw portfolio allocation chart
function drawPortfolioChart(canvas) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Portfolio allocation data
    const data = [
        { label: 'Stocks', value: 60, color: '#2563eb' },
        { label: 'Bonds', value: 25, color: '#10b981' },
        { label: 'Real Estate', value: 10, color: '#f59e0b' },
        { label: 'Commodities', value: 5, color: '#8b5cf6' }
    ];

    let currentAngle = -Math.PI / 2;

    // Draw pie segments
    data.forEach(segment => {
        const sliceAngle = (segment.value / 100) * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();

        // Add segment labels
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(segment.value + '%', labelX, labelY);

        currentAngle += sliceAngle;
    });

    // Draw legend
    const legendY = canvas.height - 80;
    let legendX = 20;

    data.forEach(segment => {
        // Color box
        ctx.fillStyle = segment.color;
        ctx.fillRect(legendX, legendY, 15, 15);

        // Label
        ctx.fillStyle = '#4a5568';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(segment.label, legendX + 20, legendY + 12);

        legendX += segment.label.length * 8 + 40;
    });
}

// Draw mini performance chart
function drawMiniPerformanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Simple upward trending line
    const data = [
        { x: 0, y: 60 },
        { x: 30, y: 55 },
        { x: 60, y: 65 },
        { x: 90, y: 58 },
        { x: 120, y: 70 },
        { x: 150, y: 40 }
    ];

    const scaledData = data.map(d => ({
        x: (d.x / 150) * width,
        y: height - (d.y / 80) * height
    }));

    // Draw area
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height);
    scaledData.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(scaledData[0].x, scaledData[0].y);
    scaledData.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    showFieldError(input, 'This field is required');
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });

            // Validate email format
            const emailInput = contactForm.querySelector('[name="email"]');
            if (data.email && !isValidEmail(data.email)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            // Check privacy consent
            const privacyInput = contactForm.querySelector('[name="privacy"]');
            if (!privacyInput.checked) {
                showFieldError(privacyInput.parentElement, 'You must agree to the privacy policy');
                isValid = false;
            } else {
                clearFieldError(privacyInput.parentElement);
            }

            if (!isValid) {
                e.preventDefault(); // Only prevent submission if validation fails
            } else {
                // Show loading state
                const submitButton = contactForm.querySelector('.form-submit');
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                // Let the form submit naturally to Formspree
                // Formspree will handle the redirect/response
            }
        });
    }
}

// Form validation helpers
function showFieldError(field, message) {
    clearFieldError(field);

    field.style.borderColor = '#ef4444';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#d1d5db';

    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animation and scroll effects
function initAnimations() {
    // Animate floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });

    // Animate tech elements
    const techElements = document.querySelectorAll('.tech-element');
    techElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });

    // Animate counters
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = /^\d+/.test(target);

        if (isNumber) {
            const finalNumber = parseInt(target.replace(/[^0-9]/g, ''));
            const suffix = target.replace(/[0-9]/g, '');

            animateNumber(counter, 0, finalNumber, 2000, suffix);
        }
    });
}

function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Scroll effects
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-item, .team-member, .pricing-card, .consultation-step'
        // Temporarily removed .faq-item to debug CSS styling issues
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.add('loaded');

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Analytics:', { category, action, label });
}

// Track form interactions
document.addEventListener('change', function(e) {
    if (e.target.closest('form')) {
        trackEvent('Form', 'Field Change', e.target.name);
    }
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('Button', 'Click', e.target.textContent.trim());
    }
});