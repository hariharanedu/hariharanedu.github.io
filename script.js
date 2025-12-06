/* ============================================
   HARI'S GARAGE - Interactive JavaScript
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    initScrollAnimations();
    initParallaxEffect();
    initHoverEffects();
    initTypingEffect();
});

// Scroll-based reveal animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate stat numbers when visible
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .step, .stat-item, .disclaimer-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// Animate stat numbers counting up
function animateStatNumber(statItem) {
    const numberEl = statItem.querySelector('.stat-number');
    const text = numberEl.textContent;
    const match = text.match(/(\d+)/);

    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(/[\d,]/g, '');
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const animate = () => {
        current += increment;
        if (current < target) {
            numberEl.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(animate);
        } else {
            numberEl.textContent = target.toLocaleString() + suffix;
        }
    };

    animate();
}

// Subtle parallax effect for background shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Add ripple effect to telegram button
    const telegramBtn = document.querySelector('.telegram-btn');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                margin-left: -5px;
                margin-top: -5px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(40);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add tilt effect to feature cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Optional typing effect for tagline
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.visibility = 'visible';

    let index = 0;
    const typeSpeed = 50;

    function type() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 800);
}

// Smooth scroll for navigation (if any anchor links)
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';

        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger special animation
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});
