// ============================================
// SIJOU FX - CYBERPUNK PORTFOLIO
// JavaScript - Interactions & Animations
// ============================================

// ============================================
// TYPEWRITER EFFECT
// ============================================

const typewriterText = document.getElementById('typewriterText');
const phrases = [
    'Creating Digital Experiences',
    'Pushing Creative Boundaries',
    'Building Tomorrow\'s Aesthetics',
    'Merging Art & Technology'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriterEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
        // Typing phase
        if (charIndex < currentPhrase.length) {
            typewriterText.textContent += currentPhrase[charIndex];
            charIndex++;
            setTimeout(typewriterEffect, 50);
        } else {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typewriterEffect, 2000);
        }
    } else {
        // Deleting phase
        if (charIndex > 0) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typewriterEffect, 30);
        } else {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typewriterEffect, 500);
        }
    }
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    typewriterEffect();
});

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Apply animations based on element type
            if (entry.target.classList.contains('terminal-window')) {
                entry.target.classList.add('fade-in');
                entry.target.style.animationDelay = '0s';
            }

            if (entry.target.classList.contains('gallery-item')) {
                entry.target.classList.add('slide-up');
                const delay = entry.target.dataset.index * 0.1;
                entry.target.style.animationDelay = `${delay}s`;
            }

            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('slide-up');
            }

            if (entry.target.classList.contains('contact-wrapper')) {
                entry.target.style.display = 'grid';
                const children = entry.target.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add(i % 2 === 0 ? 'slide-left' : 'slide-right');
                    children[i].style.animationDelay = `${i * 0.2}s`;
                }
            }

            // Only observe once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Observe terminal window
    const terminal = document.querySelector('.terminal-window');
    if (terminal) observer.observe(terminal);

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe contact wrapper
    const contactWrapper = document.querySelector('.contact-wrapper');
    if (contactWrapper) observer.observe(contactWrapper);
});

// ============================================
// SMOOTH SCROLL TO SECTIONS
// ============================================

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Focus on name input after scroll
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
        }, 500);
    }
}

function scrollToSocials() {
    const socialSection = document.querySelector('.social-section');
    if (socialSection) {
        socialSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// FORM SUBMISSION HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate
        if (name.trim() && email.trim() && message.trim()) {
            // Show success feedback
            showFormFeedback('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Form Data:', { name, email, message });
        } else {
            showFormFeedback('Please fill in all fields.', 'error');
        }
    });
}

function showFormFeedback(message, type) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.position = 'fixed';
    feedback.style.top = '80px';
    feedback.style.right = '20px';
    feedback.style.padding = '1rem 2rem';
    feedback.style.borderRadius = '0';
    feedback.style.fontFamily = "'Share Tech Mono', monospace";
    feedback.style.fontSize = '0.9rem';
    feedback.style.fontWeight = '700';
    feedback.style.zIndex = '2000';
    feedback.style.animation = 'slideRight 0.5s ease forwards';
    
    if (type === 'success') {
        feedback.style.background = '#00f3ff';
        feedback.style.color = '#0a0a0a';
        feedback.style.border = '2px solid #00f3ff';
        feedback.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.6)';
    } else {
        feedback.style.background = '#ff003c';
        feedback.style.color = '#ffffff';
        feedback.style.border = '2px solid #ff003c';
        feedback.style.boxShadow = '0 0 30px rgba(255, 0, 60, 0.6)';
    }
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}

// ============================================
// ENHANCED HOVER EFFECTS ON BUTTONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        // Trigger reflow to restart animation
        void this.offsetWidth;
    });

    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        
        if (this.classList.contains('btn-primary')) {
            ripple.style.background = 'rgba(0, 243, 255, 0.5)';
        } else if (this.classList.contains('btn-secondary')) {
            ripple.style.background = 'rgba(255, 0, 60, 0.5)';
        } else {
            ripple.style.background = 'rgba(0, 243, 255, 0.3)';
        }
        
        ripple.style.animation = 'ripple-effect 0.6s ease-out';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically if not present
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes ripple-effect {
            from {
                width: 0;
                height: 0;
                opacity: 1;
            }
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// GLITCH EFFECT ON HOVER FOR GLITCH ELEMENTS
// ============================================

document.querySelectorAll('.glitch').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch-anim 0.3s infinite';
    });

    element.addEventListener('mouseleave', function() {
        this.style.animation = 'glitch-anim 3s infinite';
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.5), 0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.3)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// DYNAMIC BACKGROUND ANIMATION
// ============================================

// Add subtle parallax effect to grid overlay
document.addEventListener('mousemove', (e) => {
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        const moveX = (e.clientX / window.innerWidth) * 10;
        const moveY = (e.clientY / window.innerHeight) * 10;
        gridOverlay.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--cyan)';
            link.style.textShadow = '0 0 10px var(--cyan)';
        } else {
            link.style.color = 'var(--text-primary)';
            link.style.textShadow = 'none';
        }
    });
});

// ============================================
// CURSOR GLOW EFFECT
// ============================================

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create subtle glow effect
    document.documentElement.style.setProperty('--mouse-x', x + 'px');
    document.documentElement.style.setProperty('--mouse-y', y + 'px');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
const images = document.querySelectorAll('.gallery-image');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('name')?.focus();
    }
    
    // Escape to blur focused element
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🔮 WELCOME TO SIJOU FX 🔮', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
console.log('%cHeavy Cyberpunk Aesthetic Portfolio', 'color: #ff003c; font-size: 14px; font-weight: bold;');
console.log('%c--- Code is Poetry, Design is Life ---', 'color: #fcee0a; font-size: 12px; font-style: italic;');
console.log('%cBuilt with HTML5, CSS3, and Vanilla JavaScript', 'color: #00f3ff; font-size: 11px;');

// ============================================
// PERFORMANCE MONITORING (Optional)
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('%c⚡ Page Load Time: ' + pageLoadTime + 'ms', 'color: #00f3ff; font-weight: bold;');
    });
}