/**
 * Academic Website JavaScript
 * Clean, Professional Functionality
 */

// ===================================
// Utility Functions
// ===================================
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll to element
    smoothScrollTo(element, duration = 800) {
        const start = window.pageYOffset;
        const target = element.offsetTop - 80; // Account for fixed navbar
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    },

    // Get current section based on scroll position
    // ...existing code...
    getCurrentSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.pageYOffset + 120;
        let bestMatch = null;
        let bestVisibility = 0;

        // Find section with the most visibility in the viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Skip if section is below the current scroll position
            if (sectionTop > scrollPos + window.innerHeight) return;
            
            // Skip if section is above the current viewport
            if (sectionBottom < scrollPos) return;
            
            // Calculate how much of the section is visible
            const visibleTop = Math.max(scrollPos, sectionTop);
            const visibleBottom = Math.min(scrollPos + window.innerHeight, sectionBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // Update best match if this section has more visibility
            if (visibleHeight > bestVisibility) {
                bestVisibility = visibleHeight;
                bestMatch = section.id;
            }
        });

        return bestMatch || 'about';
    }
// ...existing code...
};

// ===================================
// Navigation Manager
// ===================================
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 'about';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveSection('about');
        this.setupScrollSpy();
    }

    bindEvents() {
        // Handle navigation clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.setActiveSection(sectionId);
                
                // Scroll to section
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    Utils.smoothScrollTo(targetSection);
                }
            });
        });

        // Handle keyboard navigation
        this.navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (index + 1) % this.navLinks.length;
                        this.navLinks[nextIndex].focus();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = (index - 1 + this.navLinks.length) % this.navLinks.length;
                        this.navLinks[prevIndex].focus();
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        link.click();
                        break;
                }
            });
        });
    }

    setActiveSection(sectionId) {
        // Ensure sectionId is valid, default to 'about' if not
        const validSections = ['about', 'news', 'publications', 'research', 'experience', 'awards'];
        if (!validSections.includes(sectionId)) {
            sectionId = 'about';
        }

        // Update navigation
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        // Show/hide sections
        this.sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        this.currentSection = sectionId;

        // Debug logging (remove in production)
        console.log(`Active section set to: ${sectionId}`);
    }

    setupScrollSpy() {
        // Scroll spy functionality for traditional scrolling
        const debouncedScrollSpy = Utils.debounce(() => {
            const currentSection = Utils.getCurrentSection();
            if (currentSection !== this.currentSection) {
                this.setActiveSection(currentSection);
            }
        }, 100);

        window.addEventListener('scroll', debouncedScrollSpy);
    }
}

// ===================================
// Scroll Effects Manager
// ===================================
class ScrollEffectsManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        this.bindScrollEvents();
    }

    bindScrollEvents() {
        const debouncedScroll = Utils.debounce(() => {
            this.handleScroll();
        }, 10);

        window.addEventListener('scroll', debouncedScroll);
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Add shadow to navbar when scrolling
        if (scrollY > 10) {
            this.navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        } else {
            this.navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    }
}

// ===================================
// Content Manager
// ===================================
class ContentManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupExternalLinks();
        this.setupImageFallbacks();
        this.setupNewsScroll();
        this.setupPublicationCards();
        this.enhanceAccessibility();
    }

    setupExternalLinks() {
        // Add external link indicators
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual indicator for external links
            if (!link.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt';
                icon.style.fontSize = '0.8em';
                icon.style.marginLeft = '0.3em';
                icon.style.opacity = '0.6';
                link.appendChild(icon);
            }
        });
    }

    setupImageFallbacks() {
        // Handle profile image fallback
        const profileImg = document.querySelector('.profile-image img');
        const profilePlaceholder = document.querySelector('.profile-placeholder');
        
        if (profileImg && profilePlaceholder) {
            profileImg.addEventListener('error', () => {
                profileImg.style.display = 'none';
                profilePlaceholder.style.display = 'flex';
            });

            profileImg.addEventListener('load', () => {
                profileImg.style.display = 'block';
                profilePlaceholder.style.display = 'none';
            });
        }
    }

    setupNewsScroll() {
        // Add smooth scrolling to news section if it gets too long
        const newsList = document.querySelector('.news-list');
        if (newsList) {
            // Add scroll indicator if content overflows
            const checkOverflow = () => {
                if (newsList.scrollHeight > newsList.clientHeight) {
                    newsList.classList.add('scrollable');
                }
            };
            
            window.addEventListener('resize', Utils.debounce(checkOverflow, 250));
            checkOverflow();
        }
    }

    enhanceAccessibility() {
        // Add ARIA labels
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const title = section.querySelector('.section-title');
            if (title) {
                section.setAttribute('aria-labelledby', title.id || `${section.id}-title`);
                if (!title.id) {
                    title.id = `${section.id}-title`;
                }
            }
        });

        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#about';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #6c63ff;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 4px 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// ===================================
// Analytics Manager (Optional)
// ===================================
class AnalyticsManager {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageLoad();
        this.trackNavigation();
        this.trackExternalLinks();
    }

    trackPageLoad() {
        // Track page load time
        window.addEventListener('load', () => {
            if (window.performance && window.performance.timing) {
                const loadTime = window.performance.timing.loadEventEnd - 
                               window.performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
            }
        });
    }

    trackNavigation() {
        // Track section navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const section = link.getAttribute('href');
                console.log(`Navigation to ${section}`);
                
                // If you have Google Analytics, you can track events here:
                // gtag('event', 'navigate', {
                //     'event_category': 'navigation',
                //     'event_label': section
                // });
            });
        });
    }

    trackExternalLinks() {
        // Track external link clicks
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const url = link.href;
                console.log(`External link clicked: ${url}`);
                
                // If you have Google Analytics:
                // gtag('event', 'click', {
                //     'event_category': 'external_link',
                //     'event_label': url
                // });
            });
        });
    }
}

// ===================================
// Performance Monitor
// ===================================
class PerformanceMonitor {
    constructor() {
        if (this.isDevelopment()) {
            this.init();
        }
    }

    init() {
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();
    }

    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.search.includes('debug=true');
    }

    monitorLCP() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            observer.observe({entryTypes: ['largest-contentful-paint']});
        }
    }

    monitorFID() {
        // First Input Delay
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            observer.observe({entryTypes: ['first-input']});
        }
    }

    monitorCLS() {
        // Cumulative Layout Shift
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        console.log('CLS:', clsValue);
                    }
                });
            });
            observer.observe({entryTypes: ['layout-shift']});
        }
    }
}

// ===================================
// Main Application
// ===================================
class AcademicWebsite {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initComponents());
        } else {
            this.initComponents();
        }
    }

    initComponents() {
        try {
            // Initialize core components
            this.components.navigation = new NavigationManager();
            this.components.scrollEffects = new ScrollEffectsManager();
            this.components.content = new ContentManager();
            this.components.analytics = new AnalyticsManager();
            this.components.performance = new PerformanceMonitor();

            // Setup global error handling
            this.setupErrorHandling();

            console.log('Academic website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
            this.handleInitializationError(error);
        }
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Runtime error:', e.error);
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            e.preventDefault();
        });
    }

    handleInitializationError(error) {
        // Fallback functionality if JavaScript fails
        console.warn('Falling back to basic functionality');
        
        // Basic navigation fallback
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ===================================
// Initialize Application
// ===================================

// Initialize the website
const academicWebsite = new AcademicWebsite();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AcademicWebsite, NavigationManager, Utils };
}