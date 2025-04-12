// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Initialize particles
    initParticles();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize scroll effects
    initScrollEffects();
});

// Initialize animations
function initAnimations() {
    // Hero animations with slight delays for sequence
    gsap.to("h1 .line1", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.to("h1 .line2", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
    });
    
    gsap.to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
    });
    
    gsap.to(".button-container", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
    });
    
    // Platform architecture
    gsap.to(".platform-architecture", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });
}

// Initialize particles
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animationDuration = (Math.random() * 20 + 10) + 's';
        const animationDelay = (Math.random() * 10) + 's';
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${animationDuration} linear infinite`;
        particle.style.animationDelay = animationDelay;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
            cursor.style.left = posX + 'px';
            cursor.style.top = posY + 'px';
            
            cursorDot.style.left = posX + 'px';
            cursorDot.style.top = posY + 'px';
        });
    });
    
    // Handle cursor leaving the window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Interactive elements for cursor effects
    const interactiveElements = document.querySelectorAll('a, .button, .component-card, .feature-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.querySelector('.cursor')?.classList.add('cursor-grow');
            document.querySelector('.cursor-dot')?.classList.add('cursor-dot-grow');
        });
        
        el.addEventListener('mouseleave', () => {
            document.querySelector('.cursor')?.classList.remove('cursor-grow');
            document.querySelector('.cursor-dot')?.classList.remove('cursor-dot-grow');
        });
    });
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle section highlighting based on navigation
            const section = link.getAttribute('data-section');
            highlightSection(section);
        });
    });
    
    // Interactive component cards
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            const glow = card.querySelector('.component-glow');
            if (glow) {
                glow.style.left = `${mouseX - 75}px`;
                glow.style.top = `${mouseY - 75}px`;
            }
        });
    });
}

// Highlight platform section based on navigation
function highlightSection(section) {
    // Reset all components
    const componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach(card => card.classList.remove('active'));
    
    // Highlight relevant component
    if (section === 'technology') {
        document.querySelector('.component-card[data-name="core-ai"]')?.classList.add('active');
    } else if (section === 'solutions') {
        document.querySelector('.component-card[data-name="client-apps"]')?.classList.add('active');
    } else if (section === 'services') {
        document.querySelector('.component-card[data-name="strategic-services"]')?.classList.add('active');
    }
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.control-dot');
    let currentSlide = 0;
    
    // Set up control dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        testimonials.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
}

// Initialize scroll effects with GSAP ScrollTrigger
function initScrollEffects() {
    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });
    
    // Workflow steps animation
    gsap.to(".workflow-step", {
        scrollTrigger: {
            trigger: ".workflow-container",
            start: "top 70%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });
    
    // Feature cards animation
    gsap.to(".feature-card", {
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 70%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
    
    // CTA section animation
    gsap.to(".cta-section", {
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Parallax effect on particles
    gsap.to(".particles-container", {
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        },
        y: "20%",
        ease: "none"
    });
}

// Dynamic data loading (simulated)
// Could be replaced with real API calls in production
function loadDynamicData() {
    // Example of how you might load data dynamically
    fetch('https://api.example.com/platform-data')
        .then(response => response.json())
        .then(data => {
            // Update platform components with real data
            updatePlatformComponents(data);
        })
        .catch(error => {
            console.error('Error loading dynamic data:', error);
        });
}

// Update platform components with dynamic data
function updatePlatformComponents(data) {
    // This is a placeholder function showing how dynamic data could be used
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach((card, index) => {
        if (data.components && data.components[index]) {
            const component = data.components[index];
            
            // Update component title
            const title = card.querySelector('h3');
            if (title && component.title) {
                title.textContent = component.title;
            }
            
            // Update component description
            const description = card.querySelector('p');
            if (description && component.description) {
                description.textContent = component.description;
            }
        }
    });
}

// Add magnetic effect to buttons
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const position = button.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = '';
        });
    });
}