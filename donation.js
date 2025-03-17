document.addEventListener('DOMContentLoaded', () => {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const typeButtons = document.querySelectorAll('.type-btn');
    const customAmountInput = document.getElementById('customAmount');
    const impactPreview = document.querySelector('.impact-preview');

    // Handle amount selection
    amountButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            amountButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            customAmountInput.value = '';
            updateImpactPreview(btn.dataset.amount);
        });
    });

    // Handle donation type selection
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Handle custom amount input
    customAmountInput.addEventListener('input', (e) => {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        updateImpactPreview(e.target.value);
    });

    function updateImpactPreview(amount) {
        if (!amount) return;
        amount = parseInt(amount);
        let impact = '';
        
        if (amount >= 250) {
            impact = `Your $${amount} donation can provide comprehensive care for multiple animals for a month!`;
        } else if (amount >= 100) {
            impact = `Your $${amount} donation can provide medical care and food for an animal for two weeks!`;
        } else if (amount >= 50) {
            impact = `Your $${amount} donation can feed and care for an animal for a week!`;
        } else {
            impact = `Your $${amount} donation helps provide essential care for animals in need!`;
        }
        
        impactPreview.textContent = impact;
        impactPreview.style.opacity = '0';
        setTimeout(() => {
            impactPreview.style.opacity = '1';
        }, 50);
    }

    // Handle dedication checkbox
    const dedicateCheckbox = document.getElementById('dedicateCheckbox');
    const dedicationForm = document.querySelector('.dedication-form');
    
    dedicateCheckbox.addEventListener('change', () => {
        dedicationForm.style.display = dedicateCheckbox.checked ? 'block' : 'none';
    });

    // Handle comment checkbox
    const commentCheckbox = document.getElementById('commentCheckbox');
    const commentForm = document.querySelector('.comment-form');
    
    commentCheckbox.addEventListener('change', () => {
        commentForm.style.display = commentCheckbox.checked ? 'block' : 'none';
    });

    // Handle required fields
    const requiredInputs = document.querySelectorAll('.form-input[required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            const errorMessage = input.nextElementSibling;
            if (!input.value.trim()) {
                errorMessage.classList.add('visible');
            } else {
                errorMessage.classList.remove('visible');
            }
        });
    });

    // Handle next button click
    const nextBtn = document.querySelector('.next-btn');
    const donationForm = document.querySelector('.donation-box');
    const informationForm = document.querySelector('.information-form');
    
    nextBtn.addEventListener('click', () => {
        // Only validate that an amount is selected
        const selectedAmount = document.querySelector('.amount-btn.active');
        const customAmount = document.getElementById('customAmount').value;
        
        if (!selectedAmount && !customAmount) {
            alert('Please select or enter a donation amount');
            return;
        }
        
        donationForm.style.display = 'none';
        informationForm.style.display = 'block';
    });

    // Handle information form submission
    const paymentForm = document.querySelector('.payment-form');
    const continueToPaymentBtn = informationForm.querySelector('.next-btn');
    
    continueToPaymentBtn.addEventListener('click', () => {
        const infoInputs = informationForm.querySelectorAll('.form-input[required]');
        let isValid = true;
        
        infoInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            informationForm.style.display = 'none';
            paymentForm.style.display = 'block';
        }
    });

    // Handle card input preview
    const cardNumber = document.getElementById('cardNumber');
    const cardNumberDisplay = document.getElementById('cardNumberDisplay');
    const cardHolderDisplay = document.getElementById('cardHolderDisplay');
    const cardExpiryDisplay = document.getElementById('cardExpiryDisplay');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    // Format card number as user types
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        cardNumberDisplay.textContent = formattedValue || '•••• •••• •••• ••••';
    });

    // Update card holder name
    document.querySelector('input[name="cardHolder"]').addEventListener('input', (e) => {
        cardHolderDisplay.textContent = e.target.value || 'Your Name';
    });

    // Update expiry date
    document.querySelector('input[placeholder="MM/YY"]').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
        cardExpiryDisplay.textContent = value || 'MM/YY';
    });

    // Update total amount display
    function updateTotalAmount() {
        const selectedAmount = document.querySelector('.amount-btn.active');
        const customAmount = document.getElementById('customAmount').value;
        const amount = selectedAmount ? selectedAmount.dataset.amount : (customAmount || '0');
        totalAmountSpan.textContent = amount;
    }

    // Add event listeners for amount updates
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', updateTotalAmount);
    });

    document.getElementById('customAmount').addEventListener('input', updateTotalAmount);
});
