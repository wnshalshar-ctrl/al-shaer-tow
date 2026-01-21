// ===================================
// ونش الشاعر - JavaScript Functionality
// ===================================

(function() {
    'use strict';

    // Language Management
    const LanguageManager = {
        currentLang: 'ar',
        
        init() {
            // Load saved language preference
            const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
            this.setLanguage(savedLang);
            
            // Setup language toggle button
            const langToggle = document.getElementById('langToggle');
            if (langToggle) {
                langToggle.addEventListener('click', () => this.toggleLanguage());
            }
        },
        
        toggleLanguage() {
            const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
            this.setLanguage(newLang);
        },
        
        setLanguage(lang) {
            this.currentLang = lang;
            
            // Update HTML attributes
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            
            // Update all translatable elements
            this.updateContent(lang);
            
            // Save preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Add smooth transition class
            document.body.style.transition = 'all 0.3s ease';
        },
        
        updateContent(lang) {
            // Update all elements with data-ar and data-en attributes
            const translatableElements = document.querySelectorAll('[data-ar][data-en]');
            
            translatableElements.forEach(element => {
                const text = element.getAttribute(`data-${lang}`);
                if (text) {
                    // Check if element contains HTML or plain text
                    if (text.includes('<')) {
                        element.innerHTML = text;
                    } else {
                        element.textContent = text;
                    }
                }
            });
        }
    };

    // Smooth Scroll Enhancement
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        }
    };

    // Lazy Loading Images
    const LazyLoad = {
        init() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
    };

    // Scroll Animations
    const ScrollAnimations = {
        init() {
            if ('IntersectionObserver' in window) {
                const animateOnScroll = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                // Animate service cards
                document.querySelectorAll('.service-card').forEach(card => {
                    animateOnScroll.observe(card);
                });

                // Animate gallery items
                document.querySelectorAll('.gallery-item').forEach(item => {
                    animateOnScroll.observe(item);
                });

                // Animate stats
                document.querySelectorAll('.stat-item').forEach(stat => {
                    animateOnScroll.observe(stat);
                });
            }
        }
    };

    // Header Scroll Effect
    const HeaderScroll = {
        init() {
            let lastScroll = 0;
            const header = document.querySelector('.header');
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                } else {
                    header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                }
                
                lastScroll = currentScroll;
            });
        }
    };

    // Gallery Lightbox (Simple Implementation)
    const GalleryLightbox = {
        init() {
            const galleryItems = document.querySelectorAll('.gallery-item img');
            
            galleryItems.forEach(img => {
                img.addEventListener('click', function() {
                    // Create lightbox overlay
                    const overlay = document.createElement('div');
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.95);
                        z-index: 10000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        animation: fadeIn 0.3s ease;
                    `;
                    
                    const lightboxImg = document.createElement('img');
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                    lightboxImg.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        object-fit: contain;
                        border-radius: 10px;
                        box-shadow: 0 10px 50px rgba(255, 215, 0, 0.3);
                    `;
                    
                    overlay.appendChild(lightboxImg);
                    document.body.appendChild(overlay);
                    
                    // Close on click
                    overlay.addEventListener('click', () => {
                        overlay.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => overlay.remove(), 300);
                    });
                    
                    // Close on Escape key
                    const closeOnEscape = (e) => {
                        if (e.key === 'Escape') {
                            overlay.click();
                            document.removeEventListener('keydown', closeOnEscape);
                        }
                    };
                    document.addEventListener('keydown', closeOnEscape);
                });
            });
        }
    };

    // Phone Number Click Tracking (Analytics Ready)
    const PhoneTracking = {
        init() {
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.addEventListener('click', () => {
                    console.log('Phone call initiated:', link.href);
                    // Here you can add analytics tracking
                    // Example: gtag('event', 'call', { phone_number: '0798856950' });
                });
            });
        }
    };

    // WhatsApp Click Tracking
    const WhatsAppTracking = {
        init() {
            const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
            whatsappLinks.forEach(link => {
                link.addEventListener('click', () => {
                    console.log('WhatsApp chat initiated:', link.href);
                    // Here you can add analytics tracking
                    // Example: gtag('event', 'whatsapp', { phone_number: '962798856950' });
                });
            });
        }
    };

    // Performance Optimization - Debounce Function
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

    // Add CSS animations dynamically
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize all modules when DOM is ready
    function init() {
        // Add animation styles
        addAnimationStyles();
        
        // Initialize all features
        LanguageManager.init();
        SmoothScroll.init();
        LazyLoad.init();
        ScrollAnimations.init();
        HeaderScroll.init();
        GalleryLightbox.init();
        PhoneTracking.init();
        WhatsAppTracking.init();
        
        console.log('ونش الشاعر - Website initialized successfully! 🚗✨');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose language manager globally for debugging
    window.WinchAlShaer = {
        changeLanguage: (lang) => LanguageManager.setLanguage(lang),
        getCurrentLanguage: () => LanguageManager.currentLang
    };

})();
