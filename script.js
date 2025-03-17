document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
    });

    // Modal functionality
    const modal = document.getElementById('signUpModal');
    const signUpBtn = document.getElementById('signUpBtn');
    const closeModal = document.querySelector('.close-modal');
    const signUpForm = document.getElementById('signUpForm');

    signUpBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
}); 

// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const promptBtns = document.querySelectorAll('.prompt-btn');
    const userInput = document.getElementById('userInput');

    chatToggle.addEventListener('click', () => {
        chatContainer.classList.add('active');
        chatToggle.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        chatToggle.style.display = 'block';
    });

    promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.dataset.prompt;
            sendMessage();
        });
    });
});

async function sendMessage() {
    const userMessage = document.getElementById("userInput").value;
    if (!userMessage.trim()) return;
    
    const chatOutput = document.getElementById("chatOutput");
    
    // Add user message to chat
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = userMessage;
    chatOutput.appendChild(userDiv);
    
    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        
        // Add bot response to chat
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        // Format the response with proper line breaks and spacing
        const formattedResponse = data.response
            .replace(/\n\n/g, '\n')  // Replace double line breaks with single
            .replace(/([.!?])\s+/g, '$1\n')  // Add line break after sentences
            .replace(/\*\*/g, '')  // Remove any remaining asterisks
            .trim();  // Remove extra whitespace
        botDiv.textContent = formattedResponse;
        chatOutput.appendChild(botDiv);
    } catch (error) {
        // Add error message to chat
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bot-message error';
        errorDiv.textContent = "Sorry, I'm having trouble connecting right now. Please try again later.";
        chatOutput.appendChild(errorDiv);
    }
    
    // Clear input and scroll to bottom
    document.getElementById("userInput").value = '';
    chatOutput.scrollTop = chatOutput.scrollHeight;
}