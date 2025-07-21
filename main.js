document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initNavigation();
    initScrollEffects();
    initTypingEffect();
    initScrollAnimations();
    initScrollToTop();
    initParallaxEffects();
    initLoadingAnimations();
});

// Funcionalidad de navegación
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Efecto de scroll en navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efectos de scroll y animaciones
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animaciones específicas basadas en atributos
                const animationType = entry.target.getAttribute('data-aos');
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    switch(animationType) {
                        case 'fade-up':
                            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                            break;
                        case 'fade-left':
                            entry.target.style.animation = 'fadeInLeft 0.6s ease forwards';
                            break;
                        case 'fade-right':
                            entry.target.style.animation = 'fadeInRight 0.6s ease forwards';
                            break;
                        default:
                            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    // Observar elementos animados
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Efecto de escritura para el título hero
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    const speed = 100;
    let index = 0;
    
    typingElement.textContent = '';
    typingElement.classList.add('typing-effect');

    function typeWriter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Remover cursor después de completar
            setTimeout(() => {
                typingElement.classList.remove('typing-effect');
            }, 1000);
        }
    }

    // Iniciar animación después de un breve retraso
    setTimeout(typeWriter, 500);
}

// Animaciones de scroll para varios elementos
function initScrollAnimations() {
    const cards = document.querySelectorAll('.service-card, .about-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación escalonada para tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Botón scroll to top
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Efectos parallax
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-decoration');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Animación flotante para círculos decorativos
    const circles = document.querySelectorAll('.decoration-circle');
    circles.forEach((circle, index) => {
        const randomDelay = Math.random() * 2;
        circle.style.animationDelay = `${randomDelay}s`;
    });
}

// Animaciones de carga
function initLoadingAnimations() {
    const elements = document.querySelectorAll('.service-card, .about-card, .contact-item');
    
    elements.forEach((element, index) => {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 100);
    });
}

// Scroll suave para botones hero
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.btn-hero');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Función throttle para optimización de rendimiento
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Parallax mejorado con throttling
window.addEventListener('scroll', throttle(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16));

// Intersection Observer para mejor rendimiento
const createObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Animaciones avanzadas
function initAdvancedAnimations() {
    const animationObserver = createObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('animate');
                    element.style.animationName = animationType;
                }, delay);
            }
        });
    });

    document.querySelectorAll('[data-animation]').forEach(element => {
        animationObserver.observe(element);
    });
}

// Inicializar animaciones avanzadas
document.addEventListener('DOMContentLoaded', initAdvancedAnimations);

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = createObserver((entries) => {
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
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Efectos hover suaves
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.service-card, .about-card, .contact-item, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
});

// Detección de soporte para animaciones
function supportsAnimations() {
    const testEl = document.createElement('div');
    return 'animation' in testEl.style || 'webkitAnimation' in testEl.style;
}

// Funcionalidad de notificaciones (sin formulario)
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Agregar a la página
    document.body.appendChild(notification);

    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Cerrar al hacer clic
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    if (notification && notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Optimización de rendimiento - debounce para resize
window.addEventListener('resize', throttle(function() {
    // Reajustar elementos si es necesario
    initScrollAnimations();
}, 250));

// Prevenir errores en consola
window.addEventListener('error', function(e) {
    console.warn('Error capturado:', e.message);
});

// Inicialización final
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si todas las funciones están disponibles
    if (supportsAnimations()) {
        document.body.classList.add('animations-supported');
    }
    
    // Agregar clase para indicar que JS está cargado
    document.body.classList.add('js-loaded');
});
