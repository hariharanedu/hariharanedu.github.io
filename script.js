/* ============================================
   HARI'S GARAGE - Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSearchRedirect();
    initAnimations();
    initMobileMenu();
    initTypingEffect();
});

// ============================================
// HEADER - Sticky & Scroll Effects
// ============================================
function initHeader() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SEARCH REDIRECT
// ============================================
function initSearchRedirect() {
    const searchInput = document.getElementById('searchInput');
    const searchBox = document.querySelector('.search-box');

    if (!searchInput) return;

    // Make the entire search box clickable
    searchBox.addEventListener('click', (e) => {
        // Don't redirect if clicking the button (it has its own link)
        if (e.target.classList.contains('search-btn')) return;
        window.open('https://t.me/+oLvCDNTpvGI5MmNl', '_blank');
    });

    searchInput.style.cursor = 'pointer';
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        // For now, redirect to Telegram
        window.open('https://t.me/+oLvCDNTpvGI5MmNl', '_blank');
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');

                // Counter animation for stats
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.ecosystem-card, .category-card, .step-card, .feature-card, .stat'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        fadeInObserver.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Hero animation
    animateHero();

    // Parallax
    initParallax();
}

// ============================================
// HERO ANIMATION
// ============================================
function animateHero() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';

    setTimeout(() => {
        heroContent.style.transition = 'all 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element) {
    const numberEl = element.querySelector('.stat-number');
    if (!numberEl || numberEl.dataset.animated) return;

    numberEl.dataset.animated = 'true';

    const text = numberEl.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(/\d+/, '');

    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberEl.textContent = Math.floor(current).toLocaleString() + suffix;
    }, stepTime);
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ============================================
// TYPING EFFECT FOR SEARCH
// ============================================
function initTypingEffect() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const placeholders = [
        'Type any movie name...',
        'Search for TV series...',
        'Find your favorite anime...',
        'Try: Oppenheimer',
        'Try: Squid Game',
        'Try: One Piece',
        'Try: Leo 2023',
        'Try: Jujutsu Kaisen'
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const current = placeholders[currentIndex];

        if (isDeleting) {
            searchInput.placeholder = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            searchInput.placeholder = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % placeholders.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// ============================================
// CARD HOVER EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add hover glow effect to ecosystem cards
    const ecoCards = document.querySelectorAll('.ecosystem-card');

    ecoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });

    // Category cards pulse effect
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});

// ============================================
// DEMO CHAT ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const demoBox = document.querySelector('.demo-box');
    if (!demoBox) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateDemo();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(demoBox);
});

function animateDemo() {
    const messages = document.querySelectorAll('.demo-message');

    messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(20px)';

        setTimeout(() => {
            msg.style.transition = 'all 0.5s ease';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
        }, index * 800 + 300);
    });

    // Animate buttons
    const buttons = document.querySelectorAll('.demo-btn');
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';

        setTimeout(() => {
            btn.style.transition = 'all 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, 1500 + index * 100);
    });
}

// ============================================
// PAGE LOADED
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
