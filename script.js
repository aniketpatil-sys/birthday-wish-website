const button = document.getElementById('surpriseBtn');
const message = document.getElementById('surpriseMessage');
const music = document.getElementById('bgMusic');
const container = document.querySelector('.container');
const wrapper = document.querySelector('.parallax-wrapper');

// Reset music on page load/refresh
window.onload = () => {
    music.pause();
    music.currentTime = 0;
};

let interactionDone = false;
button.addEventListener('click', (e) => {
    message.classList.remove('hidden');
    message.style.display = 'block';
    
    if (!interactionDone) {
        music.play().catch(err => console.log("Audio play prevented: ", err));
        interactionDone = true;
    }
    
    createParticleFirework(e.clientX, e.clientY);
    
    spawnConfettiOnDemand(30);

    button.textContent = "Hooray! 💖";
});

if (window.innerWidth >= 768) {
    wrapper.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const depthX = 15; 
        const depthY = 15;
        
        const moveX = mouseX / depthX;
        const moveY = mouseY / depthY;
        
        container.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        container.style.transform = `translateX(0) translateY(0)`;
    });
}

const colors = ['#ff6f91', '#ff9671', '#ffc75f', '#f9f871', '#00c9a7', '#845EC2', '#6a1b9a', '#f5576c'];

for(let i = 0; i < 80; i++) {
    createSingleConfetti(true);
}

function createSingleConfetti(continuous = true, delay = 0) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const duration = (Math.random() * 4 + 3) + 's';
    const finalDelay = continuous ? (Math.random() * 5 + delay) + 's' : delay + 's';
    
    confetti.style.animationDuration = duration;
    confetti.style.animationDelay = finalDelay;
    
    document.body.appendChild(confetti);

    if (continuous) {
        confetti.addEventListener('animationend', () => {
            confetti.remove();
            createSingleConfetti(true, 1);
        });
    } else {
        setTimeout(() => confetti.remove(), (parseFloat(duration) + parseFloat(finalDelay)) * 1000);
    }
}

function spawnConfettiOnDemand(count = 20) {
    for (let i = 0; i < count; i++) {
        createSingleConfetti(false, Math.random() * 0.5);
    }
}

function createParticleFirework(x, y) {
    const particleCount = 45; 
    const finalCount = window.innerWidth < 480 ? 30 : particleCount;
    
    for(let i = 0; i < finalCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 160 + 50; 
        
        const finalVelocity = window.innerWidth < 480 ? velocity * 0.8 : velocity;

        particle.style.setProperty('--dx', Math.cos(angle) * finalVelocity + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * finalVelocity + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}