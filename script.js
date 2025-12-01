// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form handling (keeping this since it's separate from contact form)
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateNewsletterForm(this)) {
            showMessage('Thanks for subscribing! Stay tuned for updates. 📧', 'success');
            this.classList.add('success');
            this.reset();
            setTimeout(() => {
                this.classList.remove('success');
            }, 2000);
        }
    });
}

// Newsletter form validation
function validateNewsletterForm(form) {
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email || !isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show temporary messages
function showMessage(message, type) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#FFD700' : '#ff6b6b'};
        color: #333;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(msgDiv);
    setTimeout(() => {
        msgDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => msgDiv.remove(), 300);
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, observerOptions);

// Observe sections and cards for animation
document.querySelectorAll('.about, .services, .contact, .team, .skills, .videos, .service-card, .mission-card, .team-member, .skill-item, .video-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Enhanced video functionality
const videoItems = document.querySelectorAll('.video-item');

videoItems.forEach(item => {
    const video = item.querySelector('video');
    const overlay = item.querySelector('.video-overlay');

    // Click overlay to play/pause video
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
            } else {
                video.pause();
                overlay.style.opacity = '1';
            }
        });
    }

    // Show overlay when video is paused
    if (video) {
        video.addEventListener('pause', () => {
            if (overlay) overlay.style.opacity = '1';
        });

        video.addEventListener('play', () => {
            if (overlay) overlay.style.opacity = '0';
        });

        // Auto-pause videos when out of viewport for performance
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                    if (overlay) overlay.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });

        videoObserver.observe(item);
    }
});


// Skills animation
function animateSkills() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const percentage = fill.getAttribute('data-percentage');
        fill.style.width = percentage + '%';
    });
}

// Trigger skills animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills').forEach(section => {
    skillsObserver.observe(section);
});

// Throttle function for performance
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

// Progress bar and parallax
const handleScrollEffects = throttle(() => {
    const progressBar = document.getElementById('progress-bar');
    const scrollProgress = document.getElementById('scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;

    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    if (scrollProgress) {
        scrollProgress.style.width = progress + '%';
    }

    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        heroBg.style.transform = `translateY(${rate}px)`;
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.2)';
    }

    // Back to top button visibility
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}, 16); // ~60fps

window.addEventListener('scroll', handleScrollEffects);

// Back to top functionality
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'light');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'dark');
            }
        }
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        document.body.style.opacity = '1';

        // Start typing effect after preloader
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            typeWriter(heroTitle, 'All Things Are Possible');
            setTimeout(() => {
                typeWriter(heroSubtitle, 'Young minds, sparkling future');
            }, 2500);
        }, 500);
    }, 1000); // Minimum 1 second display
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// Gold cursor trail effect with performance optimization
let trailCount = 0;
const maxTrails = 20;

document.addEventListener('mousemove', (e) => {
    if (trailCount >= maxTrails) return;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    trailCount++;

    setTimeout(() => {
        trail.remove();
        trailCount--;
    }, 1000);
});

// Newsletter modal
const modal = document.getElementById('newsletter-modal');
const modalClose = document.querySelector('.modal-close');

function showModal() {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Show modal after 30 seconds or when user scrolls to contact section
setTimeout(() => {
    if (!localStorage.getItem('modalShown')) {
        showModal();
        localStorage.setItem('modalShown', 'true');
    }
}, 30000);

const contactSection = document.getElementById('contact');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !localStorage.getItem('modalShown')) {
                setTimeout(() => {
                    showModal();
                    localStorage.setItem('modalShown', 'true');
                }, 2000);
            }
        });
    }, { threshold: 0.5 });
    contactObserver.observe(contactSection);
}

if (modalClose) {
    modalClose.addEventListener('click', hideModal);
}

window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
        hideModal();
    }
});

// Keyboard support for modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        hideModal();
    }
});

// Modal form submission
const modalForm = document.getElementById('modal-newsletter-form');
if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateNewsletterForm(this)) {
            showMessage('Thank you for subscribing! Welcome to our community. 🎉', 'success');
            this.reset();
            hideModal();
        }
    });
}

// Live Clock Function
function updateLiveClock() {
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        clockElement.textContent = `${dateString} | ${timeString}`;
    }
}

// Random Quote Rotator
const quotes = [
    "\"Innovation distinguishes between a leader and a follower.\" - Steve Jobs",
    "\"The best way to predict the future is to create it.\" - Peter Drucker",
    "\"Your most unhappy customers are your greatest source of learning.\" - Bill Gates",
    "\"Technology is best when it brings people together.\" - Matt Mullenweg",
    "\"The only way to do great work is to love what you do.\" - Steve Jobs",
    "\"Creativity is intelligence having fun.\" - Albert Einstein",
    "\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt"
];

function rotateQuotes() {
    const quoteElement = document.getElementById('hero-quote');
    if (quoteElement) {
        let currentIndex = 0;
        setInterval(() => {
            quoteElement.style.opacity = '0';
            setTimeout(() => {
                quoteElement.textContent = quotes[currentIndex];
                quoteElement.style.opacity = '1';
                currentIndex = (currentIndex + 1) % quotes.length;
            }, 500);
        }, 8000); // Change quote every 8 seconds

        // Initial quote
        quoteElement.textContent = quotes[0];
        quoteElement.style.opacity = '1';
    }
}

// Form Progress Indicator
function updateFormProgress() {
    const form = document.getElementById('contact-form');
    const progressFill = document.getElementById('form-progress-fill');
    const progressText = document.getElementById('form-progress-text');

    if (form && progressFill && progressText) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let filledCount = 0;

        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                filledCount++;
            }
        });

        const progress = (filledCount / inputs.length) * 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '% Complete';

        // Add event listeners for real-time updates
        inputs.forEach(input => {
            input.addEventListener('input', updateFormProgress);
        });
    }
}

// Enhanced Cursor Trail with Performance
let trailElements = [];
const maxTrailElements = 15;

function createEnhancedTrail(e) {
    if (trailElements.length >= maxTrailElements) {
        const oldestTrail = trailElements.shift();
        if (oldestTrail && oldestTrail.parentNode) {
            oldestTrail.parentNode.removeChild(oldestTrail);
        }
    }

    const trail = document.createElement('div');
    trail.className = 'cursor-trail enhanced-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    trail.style.width = Math.random() * 8 + 4 + 'px';
    trail.style.height = trail.style.width;
    document.body.appendChild(trail);
    trailElements.push(trail);

    setTimeout(() => {
        const index = trailElements.indexOf(trail);
        if (index > -1) {
            trailElements.splice(index, 1);
        }
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 1500);
}

// Enhanced Service Calculator Function
function calculateServiceCost() {
    const serviceType = document.getElementById('service-type').value;
    const complexity = document.getElementById('complexity').value;
    const timeline = parseInt(document.getElementById('timeline').value) || 4;
    const costDisplay = document.getElementById('estimated-cost');
    const breakdownElement = document.getElementById('cost-breakdown');
    const statusIndicator = document.querySelector('.calculator-status');
    const confidenceElement = document.getElementById('result-confidence');

    if (!costDisplay) return;

    // Update status to calculating
    if (statusIndicator) {
        statusIndicator.innerHTML = `
            <span class="status-indicator calculating"></span>
            <span class="status-text">Calculating...</span>
        `;
    }

    // Much lower base prices (in USD) - very affordable
    const basePrices = {
        web: { basic: 50, standard: 120, premium: 250 },
        design: { basic: 30, standard: 80, premium: 150 },
        video: { basic: 40, standard: 100, premium: 200 }
    };

    let baseCost = basePrices[serviceType][complexity];
    let finalCost = baseCost;

    // Timeline adjustment (rush jobs cost more, longer projects get discount)
    let timelineMultiplier = 1;
    let timelineNote = '';
    if (timeline <= 2) {
        timelineMultiplier = 1.25; // 25% rush fee for very quick turnaround
        timelineNote = ' (Rush +25%)';
    } else if (timeline <= 3) {
        timelineMultiplier = 1.1; // 10% rush fee
        timelineNote = ' (Rush +10%)';
    } else if (timeline >= 8) {
        timelineMultiplier = 0.9; // 10% discount for longer timelines
        timelineNote = ' (Extended -10%)';
    }

    finalCost = baseCost * timelineMultiplier;

    // Add service details for better UX
    const serviceNames = {
        web: 'Web Development',
        design: 'Graphic Design',
        video: 'Videography'
    };

    const complexityNames = {
        basic: 'Basic',
        standard: 'Standard',
        premium: 'Premium'
    };

    // Update breakdown if element exists
    if (breakdownElement) {
        breakdownElement.innerHTML = `
            <div class="breakdown-header">
                <h4>Cost Breakdown</h4>
            </div>
            <div class="breakdown-content">
                <div class="breakdown-item">
                    <span>Service:</span>
                    <span>${serviceNames[serviceType]} (${complexityNames[complexity]})</span>
                </div>
                <div class="breakdown-item">
                    <span>Base Price:</span>
                    <span>$${baseCost}</span>
                </div>
                <div class="breakdown-item">
                    <span>Timeline:</span>
                    <span>${timeline} weeks${timelineNote}</span>
                </div>
                <div class="breakdown-item total">
                    <span>Total Estimate:</span>
                    <span>$${Math.round(finalCost)}</span>
                </div>
            </div>
        `;
    }

    // Update confidence indicator
    if (confidenceElement) {
        let confidenceLevel = 'High confidence';
        let confidenceClass = 'high';

        if (timeline <= 2) {
            confidenceLevel = 'Medium confidence';
            confidenceClass = 'medium';
        } else if (timeline >= 8) {
            confidenceLevel = 'High confidence';
            confidenceClass = 'high';
        }

        confidenceElement.innerHTML = `
            <span class="confidence-dot ${confidenceClass}"></span>
            <span class="confidence-text">${confidenceLevel}</span>
        `;
    }

    // Animate the cost display
    animateCost(costDisplay, Math.round(finalCost));

    // Add visual feedback
    addCalculatorFeedback();

    // Update status to complete
    setTimeout(() => {
        if (statusIndicator) {
            statusIndicator.innerHTML = `
                <span class="status-indicator"></span>
                <span class="status-text">Estimate ready</span>
            `;
        }
    }, 600);
}

// Reset calculator function
function resetCalculator() {
    const serviceType = document.getElementById('service-type');
    const complexity = document.getElementById('complexity');
    const timeline = document.getElementById('timeline');
    const costDisplay = document.getElementById('estimated-cost');
    const breakdownElement = document.getElementById('cost-breakdown');
    const statusIndicator = document.querySelector('.calculator-status');
    const confidenceElement = document.getElementById('result-confidence');

    // Reset form values
    if (serviceType) serviceType.value = '';
    if (complexity) complexity.value = '';
    if (timeline) timeline.value = '4';

    // Reset display
    if (costDisplay) costDisplay.textContent = '0';
    if (breakdownElement) {
        breakdownElement.innerHTML = `
            <div class="breakdown-header">
                <h4>Cost Breakdown</h4>
            </div>
            <div class="breakdown-content">
                <div class="breakdown-item">
                    <span>Select options above to see estimate</span>
                </div>
            </div>
        `;
    }

    // Reset status
    if (statusIndicator) {
        statusIndicator.innerHTML = `
            <span class="status-indicator"></span>
            <span class="status-text">Ready to calculate</span>
        `;
    }

    // Reset confidence
    if (confidenceElement) {
        confidenceElement.innerHTML = `
            <span class="confidence-dot"></span>
            <span class="confidence-text">High confidence</span>
        `;
    }

    // Remove calculation classes
    const calculator = document.querySelector('.service-calculator');
    if (calculator) {
        calculator.classList.remove('calculation-complete', 'calculation-updating');
    }
}

function addCalculatorFeedback() {
    const calculator = document.querySelector('.service-calculator');
    const resultValue = document.getElementById('estimated-cost');

    if (calculator) {
        // Remove existing feedback classes
        calculator.classList.remove('calculation-complete', 'calculation-updating');

        // Add updating class
        calculator.classList.add('calculation-updating');

        // Add bounce effect to result
        if (resultValue) {
            resultValue.style.animation = 'none';
            setTimeout(() => {
                resultValue.style.animation = 'bounce 0.6s ease-out';
            }, 10);
        }

        // Remove updating and add complete after animation
        setTimeout(() => {
            calculator.classList.remove('calculation-updating');
            calculator.classList.add('calculation-complete');
        }, 500);
    }
}

// Add bounce animation keyframes to CSS dynamically
const bounceKeyframes = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}
`;

// Inject keyframes if not already present
if (!document.querySelector('#bounce-keyframes')) {
    const style = document.createElement('style');
    style.id = 'bounce-keyframes';
    style.textContent = bounceKeyframes;
    document.head.appendChild(style);
}

function animateCost(element, targetCost) {
    const startCost = parseFloat(element.textContent.replace('$', '')) || 0;
    const increment = (targetCost - startCost) / 20; // 20 steps
    let currentCost = startCost;
    let step = 0;

    const timer = setInterval(() => {
        currentCost += increment;
        step++;

        if (step >= 20) {
            currentCost = targetCost;
            clearInterval(timer);
        }

        element.textContent = '$' + Math.round(currentCost);
    }, 50);
}

// Enhanced Video Controls
function enhanceVideoControls() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        const container = video.parentElement;

        // Add loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'video-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <p>Loading video...</p>
            </div>
        `;
        container.appendChild(loadingOverlay);

        // Show loading on load start
        video.addEventListener('loadstart', () => {
            loadingOverlay.style.display = 'flex';
        });

        // Hide loading when can play
        video.addEventListener('canplay', () => {
            loadingOverlay.style.display = 'none';
        });

        // Enhanced play/pause overlay
        const playOverlay = document.createElement('div');
        playOverlay.className = 'video-play-overlay';
        playOverlay.innerHTML = '<i class="fas fa-play"></i>';
        container.appendChild(playOverlay);

        playOverlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playOverlay.style.opacity = '0';
            } else {
                video.pause();
                playOverlay.style.opacity = '1';
            }
        });

        video.addEventListener('play', () => {
            playOverlay.style.opacity = '0';
        });

        video.addEventListener('pause', () => {
            playOverlay.style.opacity = '1';
        });

        // Add custom controls
        const controls = document.createElement('div');
        controls.className = 'custom-video-controls';
        controls.innerHTML = `
            <button class="control-btn play-pause">
                <i class="fas fa-play"></i>
            </button>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <button class="control-btn fullscreen">
                <i class="fas fa-expand"></i>
            </button>
        `;
        container.appendChild(controls);

        const playPauseBtn = controls.querySelector('.play-pause');
        const progressFill = controls.querySelector('.progress-fill');
        const fullscreenBtn = controls.querySelector('.fullscreen');

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = progress + '%';
        });

        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        });

        // Show controls on hover
        container.addEventListener('mouseenter', () => {
            controls.style.opacity = '1';
        });

        container.addEventListener('mouseleave', () => {
            if (!video.paused) {
                setTimeout(() => {
                    controls.style.opacity = '0';
                }, 2000);
            }
        });
    });
}

// Real-time Form Validation
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback';
            input.parentElement.appendChild(feedback);

            input.addEventListener('blur', () => {
                validateField(input, feedback);
            });

            input.addEventListener('input', () => {
                if (feedback.textContent) {
                    validateField(input, feedback);
                }
            });
        });
    });
}

function validateField(input, feedback) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';

    if (input.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    } else if (input.type === 'text' && input.name === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters';
        }
    }

    input.classList.toggle('invalid', !isValid);
    input.classList.toggle('valid', isValid && value);
    feedback.textContent = message;
    feedback.className = `field-feedback ${isValid ? 'valid' : 'invalid'}`;
}

// Smooth Section Transitions
function addSectionTransitions() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.transform = 'translateY(50px)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        observer.observe(section);
    });
}

// Enhanced Accessibility
function enhanceAccessibility() {
    // Add skip links
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.getElementById('main');
            main.focus();
            main.scrollIntoView();
        });
    }

    // Add ARIA labels where missing
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
        if (btn.textContent.trim()) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });

    // Keyboard navigation for cards
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Image Lazy Loading
function implementLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance Optimizations
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    // Throttle scroll events
    let scrollTimeout;
    const handleScroll = () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Handle scroll-based animations
                scrollTimeout = null;
            }, 16);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    // Start live clock
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // Start quote rotator
    rotateQuotes();

    // Initialize form progress
    updateFormProgress();

    // Enhanced cursor trail
    document.removeEventListener('mousemove', createEnhancedTrail);
    document.addEventListener('mousemove', createEnhancedTrail);

    // Service calculator
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateServiceCost);

        // Auto-calculate on change with debounce
        let calculationTimeout;
        ['service-type', 'complexity', 'timeline'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    clearTimeout(calculationTimeout);
                    calculationTimeout = setTimeout(calculateServiceCost, 300); // Debounce 300ms
                });
                element.addEventListener('input', () => {
                    clearTimeout(calculationTimeout);
                    calculationTimeout = setTimeout(calculateServiceCost, 300);
                });
            }
        });

        // Initial calculation
        setTimeout(calculateServiceCost, 500);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }

    // Initialize new features
    enhanceVideoControls();
    enhanceFormValidation();
    addSectionTransitions();
    enhanceAccessibility();
    implementLazyLoading();
    optimizeAnimations();
});
