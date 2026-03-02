// Main JavaScript

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            hamburger.innerHTML = "<i class='bx bx-x'></i>";
            document.body.style.overflow = 'hidden';
        } else {
            hamburger.innerHTML = "<i class='bx bx-menu'></i>";
            document.body.style.overflow = '';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = "<i class='bx bx-menu'></i>";
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = "<i class='bx bx-menu'></i>";
            document.body.style.overflow = '';
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Change navbar background
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    // Hide/Show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Scroll Animations (Intersection Observer)
const isMobile = window.innerWidth <= 768;

const observerOptions = {
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(section);
});

// Observe feature cards
document.querySelectorAll('.feature-card, .service-card, .portfolio-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    // Reduce stagger delay on mobile since cards stack vertically
    const delay = isMobile ? (index % 2) * 0.1 : index * 0.1;
    card.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;

    fadeInObserver.observe(card);
});

// Testimonials Carousel
const track = document.querySelector('.testimonial-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    let currentSlideIndex = 0;

    const updateSlide = (index) => {
        const amountToMove = -100 * index;
        track.style.transform = `translateX(${amountToMove}%)`;

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0.5';
            slide.style.transform = 'scale(0.9)';

            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'scale(1)';
            }
        });
    };

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlide(currentSlideIndex);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlide(currentSlideIndex);
        });
    }

    // Auto play testimonials
    setInterval(() => {
        if (slides.length > 0) {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlide(currentSlideIndex);
        }
    }, 6000);

    // Initialize first slide
    updateSlide(0);
}

// Smooth Scroll for Anchor Links
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

// Parallax Effect for Hero Background
const heroBackground = document.querySelector('.hero-bg');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '').trim();

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Image Lazy Loading Enhancement
document.querySelectorAll('img[data-src]').forEach(img => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.disconnect();
            }
        });
    });
    observer.observe(img);
});

// Form Validation Enhancement
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#ff5555';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });

        if (!valid) {
            e.preventDefault();
            alert('Por favor completa todos los campos requeridos.');
        }
    });
});

// Add Loading State to Buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', () => {
        if (button.form && button.form.checkValidity()) {
            button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Enviando...';
            // button.disabled = true; // Removed because it blocks native form submission
        }
    });
});

// Portfolio Item Hover Effect Enhancement
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.03)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Mobile Scroll Animation for Interactive Cards
if (isMobile) {
    const mobileScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-active');
            } else {
                entry.target.classList.remove('scroll-active');
            }
        });
    }, {
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0
    });

    document.querySelectorAll('.portfolio-item, .feature-card, .service-card, .gallery-item').forEach(item => {
        mobileScrollObserver.observe(item);
    });
}

// Lightbox Logic for Image Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent scrolling behind
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300); // clear image after animate out
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Service Card Click to Expand (optional feature)
document.querySelectorAll('.service-card, .feature-card').forEach(card => {
    card.addEventListener('click', function () {
        // Add pulse animation on click
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.5s ease';
        }, 10);
    });
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #ff6b35, #ff8555);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Add typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Activate typing effect on hero title if exists
const typeText = document.getElementById('typewriterText');
if (typeText && (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/'))) {
    const originalText = typeText.textContent;
    setTimeout(() => {
        typeWriter(typeText, originalText, 80);
    }, 500);
}

// Add cursor pointer to clickable elements
document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .client-card').forEach(el => {
    el.style.cursor = 'pointer';
});

// Console Easter Egg
console.log('%c¡Hola Developer! 👋', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en trabajar con nosotros? Envíanos tu CV a hola@feriasystands.com', 'color: #666; font-size: 12px;');

// Performance: Debounce scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based animations can go here
}, 10));

console.log('✅ Ferias y Stands - Website Loaded Successfully');

// Initialize Flatpickr for Date and Custom Time Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('waDate');
    const timeSelect = document.getElementById('waTime');

    // Function to generate time options for the select element
    const generateTimeOptions = (startHour, endHour) => {
        let options = '<option value="" style="background: #1a1a1a; color: #fff;">Selecciona una hora</option>';
        for (let h = startHour; h < endHour; h++) {
            // :00
            options += `<option value="${String(h).padStart(2, '0')}:00" style="background: #1a1a1a; color: #fff;">${String(h).padStart(2, '0')}:00</option>`;
            // :30
            options += `<option value="${String(h).padStart(2, '0')}:30" style="background: #1a1a1a; color: #fff;">${String(h).padStart(2, '0')}:30</option>`;
        }
        // Add the final exact end hour (e.g. 18:00)
        options += `<option value="${String(endHour).padStart(2, '0')}:00" style="background: #1a1a1a; color: #fff;">${String(endHour).padStart(2, '0')}:00</option>`;
        return options;
    };

    if (dateInput && typeof flatpickr !== 'undefined') {
        const currentLang = localStorage.getItem('selectedLang') || 'es';

        flatpickr(dateInput, {
            dateFormat: "Y-m-d",
            minDate: "today",
            locale: currentLang === 'es' ? 'es' : 'en',
            disableMobile: "true",
            disable: [
                function (date) {
                    // Disable Sundays (0)
                    return (date.getDay() === 0);
                }
            ],
            onChange: function (selectedDates, dateStr, instance) {
                if (selectedDates.length > 0 && timeSelect) {
                    const day = selectedDates[0].getDay();
                    timeSelect.disabled = false;
                    timeSelect.style.color = "var(--white)";

                    if (day === 6) { // Saturday
                        timeSelect.innerHTML = generateTimeOptions(10, 14);
                    } else { // Monday-Friday
                        timeSelect.innerHTML = generateTimeOptions(9, 18);
                    }
                }
            }
        });
    }

    // AJAX Form Handling to avoid redirect
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (submitBtn) {
                // Determine text based on lang (fallback to current text)
                const currentText = submitBtn.innerText;
                submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i>...";
                submitBtn.disabled = true;

                // Keep reference to origin lang text
                submitBtn.dataset.originalText = currentText;
            }

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formSuccessMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    alert("Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.");
                }
            }).catch(error => {
                alert("Error de red. Por favor, comprueba tu conexión y vuelve a intentarlo.");
            }).finally(() => {
                if (submitBtn) {
                    // Restore original HTML
                    submitBtn.innerText = submitBtn.dataset.originalText || "Enviar Mensaje";
                    submitBtn.disabled = false;
                }
                setTimeout(() => {
                    if (formSuccessMessage && formSuccessMessage.style.display === 'block') {
                        formSuccessMessage.style.display = 'none';
                    }
                }, 8000); // Hide after 8s
            });
        });
    }
});
