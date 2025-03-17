document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('centersModal');
    const vaccBtn = document.querySelector('.service-card:first-child .service-btn');
    const sterilBtn = document.querySelector('.service-card:last-child .service-btn');
    const closeBtn = document.querySelector('.close-modal');
    const centersList = document.querySelector('.centers-list');
    const template = document.getElementById('centerCardTemplate');

    // Sample data - Replace with actual API call
    const centers = [
        {
            name: "PawCare Veterinary Clinic",
            rating: 4.8,
            ratingCount: 524,
            address: "123 Pet Street, Downtown",
            distance: "1.2 km",
            vaccination: 75,
            sterilization: 150
        },
        {
            name: "Animal Wellness Center",
            rating: 4.6,
            ratingCount: 328,
            address: "456 Health Avenue, Uptown",
            distance: "2.5 km",
            vaccination: 65,
            sterilization: 140
        },
        {
            name: "City Pet Hospital",
            rating: 4.9,
            ratingCount: 892,
            address: "789 Care Lane, Midtown",
            distance: "3.1 km",
            vaccination: 80,
            sterilization: 160
        }
    ];

    function showModal(serviceType) {
        modal.classList.add('active');
        populateCenters(serviceType);
    }

    function hideModal() {
        modal.classList.remove('active');
    }

    function populateCenters(serviceType) {
        centersList.innerHTML = '';
        centers.forEach(center => {
            const card = template.content.cloneNode(true);
            
            card.querySelector('.center-name').textContent = center.name;
            card.querySelector('.stars').innerHTML = '★'.repeat(Math.floor(center.rating));
            card.querySelector('.rating-count').textContent = `(${center.ratingCount})`;
            card.querySelector('.center-address').textContent = center.address;
            card.querySelector('.center-distance span').textContent = center.distance;
            
            const price = serviceType === 'vaccination' ? center.vaccination : center.sterilization;
            card.querySelector('.service-type').textContent = serviceType === 'vaccination' ? 'Vaccination' : 'Sterilization';
            card.querySelector('.price').textContent = `$${price}`;

            centersList.appendChild(card);
        });
    }

    vaccBtn.addEventListener('click', () => showModal('vaccination'));
    sterilBtn.addEventListener('click', () => showModal('sterilization'));
    closeBtn.addEventListener('click', hideModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // Location search functionality
    const searchInput = document.getElementById('locationSearch');
    const locateBtn = document.querySelector('.locate-btn');

    locateBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // Here you would typically make an API call to get nearby centers
                console.log(position.coords.latitude, position.coords.longitude);
            });
        }
    });

    searchInput.addEventListener('input', (e) => {
        // Here you would typically implement search/filter functionality
        console.log(e.target.value);
    });
}); 