document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Add subtle flicker effect
    setInterval(() => {
        const text = document.querySelector('.latest-events-title');
        text.style.textShadow = `0 0 ${15 + Math.random() * 5}px rgba(255, 255, 255, ${0.6 + Math.random() * 0.3})`;
    }, 300);
});

function createParticles() {
    const container = document.querySelector('.latest-events-container');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const tx = Math.random() * 200 - 100;
        const ty = Math.random() * 200 - 100;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(particle);
    }
} 