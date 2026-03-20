document.addEventListener('DOMContentLoaded', () => {
    // Confetti effect
    const body = document.body;
    const colors = ['#D4AF37', '#F9E29B', '#E6F1FF', '#B8860B'];
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.top = `-20px`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }

    // Initial burst
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // Continuous flow
    setInterval(createConfetti, 200);

    // Update share link with current URL
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        const currentUrl = window.location.href;
        shareBtn.href = `https://wa.me/?text=Eid%20Mubarak!%20Wishing%20you%20a%20joyous%20day.%20Check%20this%20out:%20${encodeURIComponent(currentUrl)}`;
    }
});
