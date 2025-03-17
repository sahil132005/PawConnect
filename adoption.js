document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for category rows
    const scrollContainers = document.querySelectorAll('.scroll-container');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let startY;
        let initialScroll;

        // Mouse Events
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            initialScroll = true;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        // Touch Events
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            startY = e.touches[0].pageY;
            scrollLeft = container.scrollLeft;
            initialScroll = true;
        });

        container.addEventListener('touchend', () => {
            isDown = false;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            
            const x = e.touches[0].pageX - container.offsetLeft;
            const y = e.touches[0].pageY;
            
            // Check if scrolling horizontally or vertically
            if (initialScroll) {
                const deltaX = Math.abs(x - startX);
                const deltaY = Math.abs(y - startY);
                
                if (deltaX > deltaY) {
                    e.preventDefault(); // Prevent vertical scroll only if scrolling horizontally
                }
                initialScroll = false;
            }
            
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Filter button functionality
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn.addEventListener('click', () => {
        // Create and show filter modal
        const modal = document.createElement('div');
        modal.className = 'filter-modal';
        modal.innerHTML = `
            <div class="filter-content">
                <h3>Filter Pets</h3>
                <div class="filter-options">
                    <label>
                        <input type="checkbox" name="age" value="young"> Young (0-2 years)
                    </label>
                    <label>
                        <input type="checkbox" name="age" value="adult"> Adult (2-8 years)
                    </label>
                    <label>
                        <input type="checkbox" name="gender" value="male"> Male
                    </label>
                    <label>
                        <input type="checkbox" name="gender" value="female"> Female
                    </label>
                    <label>
                        <input type="checkbox" name="vaccinated" value="true"> Vaccinated
                    </label>
                </div>
                <button class="apply-filters">Apply Filters</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });

    // Smooth scroll function for category navigation
    function smoothScrollTo(element, duration) {
        const target = element.getBoundingClientRect().left;
        const startPosition = element.parentElement.scrollLeft;
        const distance = target - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            element.parentElement.scrollLeft = run;
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add scroll buttons to each category
    document.querySelectorAll('.scroll-container').forEach(container => {
        const leftBtn = document.createElement('button');
        const rightBtn = document.createElement('button');
        
        leftBtn.className = 'scroll-indicator scroll-left';
        rightBtn.className = 'scroll-indicator scroll-right';
        
        leftBtn.innerHTML = '←';
        rightBtn.innerHTML = '→';
        
        container.appendChild(leftBtn);
        container.appendChild(rightBtn);
        
        leftBtn.addEventListener('click', () => {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        rightBtn.addEventListener('click', () => {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });

    // Add hover sound effect
    const hoverSound = new Audio('hover.mp3'); // Add a subtle hover sound file
    document.querySelectorAll('.pet-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });

    // Update the adoption button click handler
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('adopt-btn')) {
            const petName = e.target.dataset.petName;
            const petId = e.target.dataset.petId;
            
            // Create and show adoption modal
            const modal = document.createElement('div');
            modal.className = 'adoption-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Adopt ${petName}</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="pet-info-detailed">
                            <h3>About ${petName}</h3>
                            <div class="pet-stats">
                                <span>Age: 2 years</span>
                                <span>Gender: Male</span>
                                <span>Vaccinated: Yes</span>
                            </div>
                            <p class="pet-description">
                                ${petName} is a loving companion who's looking for a forever home. 
                                Friendly with children and other pets, house-trained, and full of energy.
                            </p>
                        </div>
                        <div class="adoption-steps">
                            <h3>Next Steps</h3>
                            <ol>
                                <li>Schedule a meet-and-greet with ${petName}</li>
                                <li>Complete background check</li>
                                <li>Home visit assessment</li>
                                <li>Finalize adoption</li>
                            </ol>
                        </div>
                        <div class="cta-buttons">
                            <button class="schedule-visit-btn">Schedule Visit</button>
                            <button class="contact-shelter-btn">Contact Shelter</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => modal.remove());
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });

            // Handle schedule visit button
            const scheduleBtn = modal.querySelector('.schedule-visit-btn');
            scheduleBtn.addEventListener('click', () => {
                window.location.href = `/schedule-visit/${petId}`;
            });

            // Handle contact shelter button
            const contactBtn = modal.querySelector('.contact-shelter-btn');
            contactBtn.addEventListener('click', () => {
                window.location.href = '/contact';
            });
        }
    });

    // Define the pet data
    const petCategories = {
        dogs: {
            container: 'dogs-container',
            names: ['Max', 'Rocky', 'Buddy', 'Charlie', 'Luna', 'Bailey'],
            image: 'dog.jpg'
        },
        cats: {
            container: 'cats-container',
            names: ['Luna', 'Oliver', 'Milo', 'Lucy', 'Leo', 'Bella'],
            image: 'cat.jpeg'
        },
        birds: {
            container: 'birds-container',
            names: ['Rio', 'Sky', 'Sunny', 'Blue', 'Angel', 'Phoenix'],
            image: 'bird.jpg'
        },
        rodents: {
            container: 'rodents-container',
            names: ['Hoppy', 'Nibbles', 'Peanut', 'Cookie', 'Ginger', 'Oreo'],
            image: 'rabbit.jpg'
        },
        others: {
            container: 'others-container',
            names: ['George', 'Ziggy', 'Coco', 'Mango', 'Kiwi', 'Banana'],
            image: 'monkey.jpeg'
        }
    };

    // Function to generate cards for a category
    function generatePetCards(category, data) {
        const container = document.getElementById(data.container);
        if (!container) return;

        const cardsHTML = Array(20).fill().map((_, i) => {
            const name = data.names[i % data.names.length];
            const age = (i % 3 + 1);
            const gender = i % 2 ? 'Male' : 'Female';
            const personality = ['Playful', 'Friendly', 'Gentle', 'Active', 'Calm'][i % 5];
            const trained = i % 2 ? 'Yes' : 'In Training';
            
            return `
                <div class="pet-card" data-type="${category}">
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${data.image}" alt="${category}" loading="lazy">
                            <div class="card-overlay">
                                <h3 class="pet-name" 
                                    data-name="${name}"
                                    data-age="${age}"
                                    data-gender="${gender}"
                                    data-personality="${personality}"
                                    data-trained="${trained}"
                                    data-image="${data.image}"
                                    data-category="${category}"
                                >${name}</h3>
                                <p>${age} years old • ${gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = cardsHTML;

        // Add click handlers for pet names
        container.querySelectorAll('.pet-name').forEach(nameElement => {
            nameElement.addEventListener('click', (e) => {
                const data = e.target.dataset;
                showPetDetails(data);
            });
        });
    }

    function showPetDetails(petData) {
        const modal = document.createElement('div');
        modal.className = 'pet-details-modal';
        modal.innerHTML = `
            <div class="pet-details-content">
                <div class="pet-details-header">
                    <h2>${petData.name}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="pet-details-body">
                    <img src="${petData.image}" alt="${petData.name}" class="pet-details-image">
                    <div class="pet-details-info">
                        <div class="pet-details-stats">
                            <div class="stat-item">
                                <strong>Age:</strong>
                                <p>${petData.age} years</p>
                            </div>
                            <div class="stat-item">
                                <strong>Gender:</strong>
                                <p>${petData.gender}</p>
                            </div>
                            <div class="stat-item">
                                <strong>Personality:</strong>
                                <p>${petData.personality}</p>
                            </div>
                            <div class="stat-item">
                                <strong>Trained:</strong>
                                <p>${petData.trained}</p>
                            </div>
                        </div>
                        <p class="pet-description">
                            Meet ${petData.name}, a ${petData.personality.toLowerCase()} ${petData.category} 
                            looking for a loving forever home. ${petData.name} is ${petData.age} years old and 
                            would make a perfect companion for ${petData.personality === 'Active' ? 
                            'an active family' : 'any loving family'}.
                        </p>
                    </div>
                    <div class="cta-buttons">
                        <button class="schedule-visit-btn">Schedule a Visit</button>
                        <button class="contact-shelter-btn">Contact Shelter</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add animation class after a brief delay
        setTimeout(() => modal.classList.add('active'), 10);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    // Generate cards for all categories
    Object.entries(petCategories).forEach(([category, data]) => {
        generatePetCards(category, data);
    });

    // Handle scroll buttons
    document.querySelectorAll('.scroll-container').forEach(container => {
        const leftBtn = container.querySelector('.scroll-left');
        const rightBtn = container.querySelector('.scroll-right');
        const cardContainer = container.querySelector('.pet-cards');

        // Show/hide arrows based on scroll position
        const updateArrowVisibility = () => {
            leftBtn.style.opacity = cardContainer.scrollLeft > 0 ? '1' : '0';
            rightBtn.style.opacity = 
                (cardContainer.scrollLeft + cardContainer.clientWidth) < cardContainer.scrollWidth ? '1' : '0';
        };

        // Initial arrow visibility
        updateArrowVisibility();

        // Update arrows on scroll
        cardContainer.addEventListener('scroll', updateArrowVisibility);

        // Scroll buttons functionality
        leftBtn.addEventListener('click', () => {
            cardContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        rightBtn.addEventListener('click', () => {
            cardContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    });
}); 