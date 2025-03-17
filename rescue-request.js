document.addEventListener('DOMContentLoaded', () => {
    const rescueForm = document.getElementById('rescueForm');
    const mediaUpload = document.getElementById('mediaUpload');

    // File size validation
    mediaUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (2MB = 2 * 1024 * 1024 bytes)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                e.target.value = ''; // Clear the file input
                return;
            }

            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid file type (JPEG, PNG, or MP4)');
                e.target.value = ''; // Clear the file input
                return;
            }
        }
    });

    // Form submission
    rescueForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(rescueForm);
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Rescue request submitted successfully! We will contact you shortly.');
        rescueForm.reset();
    });
}); 