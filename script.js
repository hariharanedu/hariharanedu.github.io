/* ============================================
   HARI'S GARAGE - Movie Portal JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSearch();
    initAnimations();
    initModal();
    initMobileMenu();
});

// ============================================
// HEADER - Sticky & Scroll Effects
// ============================================
function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
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
// SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchBtn) return;

    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            // Show modal first, then redirect
            showModal();
        } else {
            searchInput.focus();
            searchInput.classList.add('shake');
            setTimeout(() => searchInput.classList.remove('shake'), 500);
        }
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        .shake { animation: shake 0.5s ease; }
    `;
    document.head.appendChild(style);
}

// ============================================
// MODAL
// ============================================
function initModal() {
    const modal = document.getElementById('telegramModal');
    if (!modal) return;

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function showModal() {
    const modal = document.getElementById('telegramModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('telegramModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global function for onclick handlers
window.redirectToTelegram = function () {
    showModal();
};

window.closeModal = closeModal;

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');

    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');

        // Toggle nav visibility (you can expand this)
        if (nav) {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        }

        // Show modal as fallback for now
        showModal();
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
    // Intersection Observer for fade-in animations
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
    const animatedElements = document.querySelectorAll('.movie-card, .category-card, .step-card, .stat');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transitionDelay = `${index * 0.05}s`;
        fadeInObserver.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);

    // Parallax for hero
    initParallax();
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
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Mouse move effect for hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            heroBg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

// ============================================
// MOVIE CARD HOVER EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.movie-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });
});

// ============================================
// TYPING EFFECT FOR SEARCH PLACEHOLDER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const placeholders = [
        'Search for movies...',
        'Search for TV series...',
        'Search for anime...',
        'Try: Oppenheimer',
        'Try: Squid Game',
        'Try: One Piece'
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
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % placeholders.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after a delay
    setTimeout(type, 1000);
});

// ============================================
// DROPDOWN BEHAVIOR FOR TOUCH DEVICES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});
