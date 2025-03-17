document.addEventListener('DOMContentLoaded', () => {
    // Handle active state for services link
    const servicesLink = document.querySelector('.nav-link[href="#services"]');
    const servicesSection = document.getElementById('services');

    if (servicesLink && servicesSection) {
        // Update active state on scroll
        window.addEventListener('scroll', () => {
            const rect = servicesSection.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                servicesLink.classList.add('active');
            } else {
                servicesLink.classList.remove('active');
            }
        });

        // Smooth scroll with offset
        servicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            const yOffset = -80; // Adjust based on header height
            const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        });
    }
}); 