// Immediately invoked function to avoid global scope pollution
(function() {
    // Check if the script has already been initialized
    if (window.pawCursorInitialized) return;
    window.pawCursorInitialized = true;

    const pawPrints = [];
    const maxPrints = 4;
    const pawSVG = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="
                M50 40 
                C60 40 60 55 50 55 
                C40 55 40 40 50 40 
                Z
                M30 25
                C37 25 37 32 30 32
                C23 32 23 25 30 25
                Z
                M70 25
                C77 25 77 32 70 32
                C63 32 63 25 70 25
                Z
                M30 55
                C37 55 37 62 30 62
                C23 62 23 55 30 55
                Z
                M70 55
                C77 55 77 62 70 62
                C63 62 63 55 70 55
                Z
            "/>
        </svg>
    `;

    function createPawPrint(x, y, angle) {
        const paw = document.createElement('div');
        paw.className = 'paw-print';
        paw.innerHTML = pawSVG;
        paw.style.left = x + 'px';
        paw.style.top = y + 'px';
        
        // Set rotation based on movement direction
        paw.style.setProperty('--rotation', angle + 'deg');
        
        (document.body || document.documentElement).appendChild(paw);

        // Fade in with slight delay for trailing effect
        requestAnimationFrame(() => {
            paw.style.opacity = '1';
        });

        // Remove old paw prints if we exceed maxPrints
        if (pawPrints.length >= maxPrints) {
            const oldPaw = pawPrints.shift();
            if (oldPaw && oldPaw.parentNode) {
                oldPaw.style.opacity = '0';
                setTimeout(() => {
                    oldPaw.parentNode.removeChild(oldPaw);
                }, 300);
            }
        }

        pawPrints.push(paw);

        // Fade out and remove after delay
        setTimeout(() => {
            if (paw && paw.parentNode) {
                paw.style.opacity = '0';
                setTimeout(() => {
                    if (paw.parentNode) {
                        paw.parentNode.removeChild(paw);
                    }
                    const index = pawPrints.indexOf(paw);
                    if (index > -1) {
                        pawPrints.splice(index, 1);
                    }
                }, 300);
            }
        }, 600);
    }

    let lastX = 0;
    let lastY = 0;
    const minDistance = 30; // Slightly reduced for smoother trail

    function calculateAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 90;
    }

    // Main mouse move handler with throttling
    const handleMouseMove = throttle((e) => {
        const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        
        if (distance >= minDistance) {
            const angle = calculateAngle(lastX, lastY, e.clientX, e.clientY);
            createPawPrint(e.clientX, e.clientY, angle);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    }, 16);

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(event) {
            if (!inThrottle) {
                func(event);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Initialize the event listener
    function initPawCursor() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousemove', handleMouseMove);
    }

    // Handle different document loading states
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPawCursor);
    } else {
        initPawCursor();
    }

    // Clean up on page unload
    window.addEventListener('unload', () => {
        document.removeEventListener('mousemove', handleMouseMove);
        pawPrints.forEach(paw => {
            if (paw && paw.parentNode) {
                paw.parentNode.removeChild(paw);
            }
        });
        pawPrints.length = 0;
    });
})(); 