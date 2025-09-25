// HealthTwin Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initDemoFlow();
    initAvatarAnimations();
    initFormHandling();
    initSmoothScrolling();
    initParticleAnimation();
    initScrollAnimations();
});

// Demo Flow Interactive Functionality
function initDemoFlow() {
    const stepButtons = document.querySelectorAll('.step-button');
    const demoInterfaces = document.querySelectorAll('.demo-interface');
    const demoAvatar = document.getElementById('demo-avatar');
    
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const stepNumber = index + 1;
            
            // Remove active class from all buttons and interfaces
            stepButtons.forEach(btn => btn.classList.remove('active'));
            demoInterfaces.forEach(interface => interface.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Find and activate the corresponding interface
            const targetInterface = document.querySelector(`[data-interface="${stepNumber}"]`);
            if (targetInterface) {
                // Add small delay for smoother transition
                setTimeout(() => {
                    targetInterface.classList.add('active');
                }, 100);
            }
            
            // Update demo avatar based on step
            updateDemoAvatar(stepNumber);
            
            // Add click animation to button
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Log for debugging
            console.log(`Activated step ${stepNumber}, interface:`, targetInterface);
        });
    });
    
    // Auto-cycle through demo steps every 6 seconds (increased from 5)
    let currentStep = 0;
    const autoCycle = setInterval(() => {
        currentStep = (currentStep + 1) % stepButtons.length;
        stepButtons[currentStep].click();
    }, 6000);
    
    // Pause auto-cycle when user interacts
    stepButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(autoCycle);
            // Restart auto-cycle after 10 seconds of inactivity
            setTimeout(() => {
                let newCurrentStep = 0;
                setInterval(() => {
                    newCurrentStep = (newCurrentStep + 1) % stepButtons.length;
                    stepButtons[newCurrentStep].click();
                }, 6000);
            }, 10000);
        });
    });
}

function updateDemoAvatar(step) {
    const demoAvatar = document.getElementById('demo-avatar');
    if (!demoAvatar) return;
    
    // Remove all avatar state classes
    demoAvatar.classList.remove('energized', 'tired', 'stressed', 'leveled-up');
    
    // Add appropriate class based on step
    switch(step) {
        case 1:
            demoAvatar.classList.add('tired');
            break;
        case 2:
            demoAvatar.classList.add('stressed');
            break;
        case 3:
            demoAvatar.classList.add('tired');
            break;
        case 4:
            demoAvatar.classList.add('energized');
            break;
        case 5:
            demoAvatar.classList.add('leveled-up');
            break;
        default:
            demoAvatar.classList.add('energized');
    }
    
    // Add transformation animation
    demoAvatar.style.transform = 'scale(1.1)';
    setTimeout(() => {
        demoAvatar.style.transform = 'scale(1)';
    }, 300);
}

// Avatar Animations
function initAvatarAnimations() {
    const avatars = document.querySelectorAll('.avatar');
    
    // Add breathing animation to all avatars
    avatars.forEach(avatar => {
        // Random delay for more organic feel
        const delay = Math.random() * 2000;
        setTimeout(() => {
            avatar.style.animation = 'breathe 4s ease-in-out infinite';
        }, delay);
    });
    
    // Add hover effects to showcase avatars
    const showcaseAvatars = document.querySelectorAll('.avatar-state');
    showcaseAvatars.forEach(avatarState => {
        const avatar = avatarState.querySelector('.avatar');
        
        avatarState.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
            avatar.style.transition = 'all 0.3s ease';
            
            // Add extra glow effect on hover
            const glow = avatar.querySelector('.avatar-glow');
            if (glow) {
                glow.style.transform = 'scale(1.2)';
                glow.style.opacity = '1';
            }
        });
        
        avatarState.addEventListener('mouseleave', () => {
            avatar.style.transform = 'scale(1) rotate(0deg)';
            
            // Reset glow effect
            const glow = avatar.querySelector('.avatar-glow');
            if (glow) {
                glow.style.transform = 'scale(1)';
                glow.style.opacity = '';
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = signupForm.querySelector('input[type="email"]');
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.innerHTML = 'Joining...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Welcome to HealthTwin! Check your email for early access. 🎉', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = 'Get Early Access';
                submitBtn.disabled = false;
                
                // Add celebration animation
                createCelebrationParticles();
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'rgba(var(--color-success-rgb), 0.95)' : 'rgba(var(--color-error-rgb), 0.95)',
        color: 'white',
        padding: 'var(--space-16)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.4s ease',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }
    }, 5000);
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button smooth scroll
    const ctaButtons = document.querySelectorAll('.hero-cta, .btn--primary');
    ctaButtons.forEach(button => {
        if (!button.closest('form')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const ctaSection = document.querySelector('.cta');
                if (ctaSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = ctaSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Enhanced Particle Animation
function initParticleAnimation() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        // Add more dynamic particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and animation
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 6 + 4;
            const duration = Math.random() * 8 + 6;
            const delay = Math.random() * 4;
            
            Object.assign(particle.style, {
                left: left + '%',
                top: top + '%',
                width: size + 'px',
                height: size + 'px',
                animationDuration: duration + 's',
                animationDelay: delay + 's'
            });
            
            heroParticles.appendChild(particle);
        }
    }
}

function createCelebrationParticles() {
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'];
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = ['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)];
        
        Object.assign(particle.style, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            fontSize: Math.random() * 10 + 15 + 'px',
            pointerEvents: 'none',
            zIndex: '10000',
            userSelect: 'none'
        });
        
        document.body.appendChild(particle);
        
        // Random direction and distance
        const angle = (Math.PI * 2 * i) / 25;
        const distance = Math.random() * 300 + 150;
        const finalX = Math.cos(angle) * distance;
        const finalY = Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${finalX - 50}px, ${finalY - 50}px) scale(1) rotate(360deg)`, 
                opacity: 1, 
                offset: 0.7 
            },
            { 
                transform: `translate(${finalX - 50}px, ${finalY + 200 - 50}px) scale(0) rotate(720deg)`, 
                opacity: 0 
            }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        };
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe avatar states
    const avatarStates = document.querySelectorAll('.avatar-state');
    avatarStates.forEach((state, index) => {
        state.style.opacity = '0';
        state.style.transform = 'translateY(30px)';
        state.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(state);
    });
    
    // Observe social content
    const socialCards = document.querySelectorAll('.social-feed, .global-leaderboard');
    socialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(' + (index % 2 === 0 ? '-30px' : '30px') + ')';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Interactive Range Sliders
function initRangeSliders() {
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const value = this.value;
            const max = this.max;
            const percentage = (value / max) * 100;
            
            // Update slider background
            this.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-secondary) ${percentage}%, var(--color-secondary) 100%)`;
            
            // Update associated label if it exists
            const label = this.parentNode.querySelector('.stress-label');
            if (label) {
                const emoji = value <= 3 ? '😌' : value <= 6 ? '📚' : value <= 8 ? '😰' : '🔥';
                label.textContent = `${value}/10 ${emoji}`;
            }
        });
        
        // Initialize slider appearance
        slider.dispatchEvent(new Event('input'));
    });
}

// Add CSS for animations
const animationCSS = `
    @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) translateX(0) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-12);
        position: relative;
    }
    
    .notification-icon {
        font-size: 18px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0 var(--space-8);
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    /* Enhanced feature card hover effects */
    .feature-card:hover {
        transform: translateY(-8px) scale(1.02);
    }
    
    /* Range slider styling */
    input[type="range"] {
        width: 100%;
        height: 8px;
        border-radius: 4px;
        background: var(--color-secondary);
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        margin: var(--space-8) 0;
        cursor: pointer;
    }
    
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(var(--color-primary-rgb, 33, 128, 141), 0.4);
        transition: all 0.2s ease;
        border: 2px solid white;
    }
    
    input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        box-shadow: 0 4px 16px rgba(var(--color-primary-rgb, 33, 128, 141), 0.5);
    }
    
    input[type="range"]::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(var(--color-primary-rgb, 33, 128, 141), 0.4);
    }
    
    /* Demo interface transition improvements */
    .demo-interface {
        transition: all 0.4s ease;
    }
    
    .demo-interface:not(.active) {
        pointer-events: none;
    }
`;

// Inject animation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Initialize range sliders after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initRangeSliders, 200);
});

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.closest('.avatar')) {
        clickCount++;
        if (clickCount === 7) {
            showNotification('You discovered the avatar easter egg! Keep clicking for health! 🥳', 'success');
            createCelebrationParticles();
            clickCount = 0;
        }
    }
});

// Performance optimization - lazy load heavy animations
function initLazyAnimations() {
    const heavyElements = document.querySelectorAll('.avatar-glow.rainbow');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'rotate 3s linear infinite, pulse 2s ease-in-out infinite';
            } else {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    });
    
    heavyElements.forEach(el => observer.observe(el));
}

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initLazyAnimations, 500);
});