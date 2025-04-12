// Three.js Background
function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    for(let i = 0; i < particlesCount; i++) {
        scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        transparent: true,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate particles slightly based on mouse position
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
        
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
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
    
    // Interactive elements for cursor effects
    const interactiveElements = document.querySelectorAll('a, .button, .component-card, .workflow-step');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
            cursorDot.classList.add('cursor-dot-grow');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
            cursorDot.classList.remove('cursor-dot-grow');
        });
    });
}

// Initialize interactive component cards
function initComponentCards() {
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach(card => {
        // 3D hover effect
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const percentX = (mouseX - centerX) / centerX;
            const percentY = (mouseY - centerY) / centerY;
            
            const maxRotate = 5; // Max rotation in degrees
            
            card.style.transform = `perspective(1000px) rotateX(${-percentY * maxRotate}deg) rotateY(${percentX * maxRotate}deg)`;
            
            // Update glow position
            const glow = card.querySelector('.component-glow');
            if (glow) {
                glow.style.left = `${mouseX - 150}px`;
                glow.style.top = `${mouseY - 150}px`;
            }
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
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

// Initialize workflow steps interaction
function initWorkflowSteps() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const workflowProgress = document.querySelector('.workflow-progress');
    
    workflowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            // Reset all steps
            workflowSteps.forEach(s => s.classList.remove('active'));
            
            // Activate current step
            step.classList.add('active');
            
            // Update progress bar
            const progressPercent = ((index + 1) / workflowSteps.length) * 100;
            workflowProgress.style.width = `${progressPercent}%`;
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Hero section animations
    gsap.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
    });
    
    gsap.to('h1', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.to('.button-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Scroll-triggered animations
    gsap.to('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.to('.section-description', {
        scrollTrigger: {
            trigger: '.section-description',
            start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.to('.platform-architecture', {
        scrollTrigger: {
            trigger: '.platform-architecture',
            start: 'top 70%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Workflow steps animation
    gsap.to('.workflow-step', {
        scrollTrigger: {
            trigger: '.workflow-container',
            start: 'top 70%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Fixed header on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js background
    initThreeBackground();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize component cards
    initComponentCards();
    
    // Initialize workflow steps
    initWorkflowSteps();
    
    // Initialize scroll animations
    initScrollAnimations();
});