
// Get form and input elements
const form = document.getElementById('booking-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const guestsInput = document.getElementById('guests');
const specialRequestsInput = document.getElementById('special-requests');

// Validation functions
function validateName(name) {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return '';
}

function validateEmail(email) {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
        return 'Phone number must be at least 10 digits';
    }
    return '';
}

function validateDate(date) {
    if (!date) {
        return 'Please select a date';
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        return 'Please select a future date';
    }
    
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (selectedDate > maxDate) {
        return 'Reservations can only be made up to 3 months in advance';
    }
    
    return '';
}

function validateTime(time, date) {
    if (!time) {
        return 'Please select a time';
    }
    
    const [hours, minutes] = time.split(':').map(Number);
    
    // Check if time is within restaurant hours (e.g., 11:00 AM - 10:00 PM)
    if (hours < 11 || hours >= 22) {
        return 'Please select a time between 11:00 AM and 10:00 PM';
    }
    
    // If booking for today, make sure time is in the future
    if (date) {
        const selectedDate = new Date(date);
        const today = new Date();
        
        if (selectedDate.toDateString() === today.toDateString()) {
            const selectedTime = hours * 60 + minutes;
            const currentTime = today.getHours() * 60 + today.getMinutes();
            
            if (selectedTime <= currentTime + 60) {
                return 'Please select a time at least 1 hour from now';
            }
        }
    }
    
    return '';
}

function validateGuests(guests) {
    if (!guests) {
        return 'Please select number of guests';
    }
    return '';
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('error');
    input.classList.remove('success');
}

// Show success
function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('error');
    input.classList.add('success');
}

// Clear validation
function clearValidation(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('error');
    input.classList.remove('success');
}

// Real-time validation on blur
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        showError(nameInput, error);
    } else if (nameInput.value.trim()) {
        showSuccess(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailInput, error);
    } else if (emailInput.value.trim()) {
        showSuccess(emailInput);
    }
});

phoneInput.addEventListener('blur', () => {
    const error = validatePhone(phoneInput.value);
    if (error) {
        showError(phoneInput, error);
    } else if (phoneInput.value.trim()) {
        showSuccess(phoneInput);
    }
});

dateInput.addEventListener('change', () => {
    const error = validateDate(dateInput.value);
    if (error) {
        showError(dateInput, error);
    } else {
        showSuccess(dateInput);
    }
    
    // Re-validate time when date changes
    if (timeInput.value) {
        const timeError = validateTime(timeInput.value, dateInput.value);
        if (timeError) {
            showError(timeInput, timeError);
        } else {
            showSuccess(timeInput);
        }
    }
});

timeInput.addEventListener('change', () => {
    const error = validateTime(timeInput.value, dateInput.value);
    if (error) {
        showError(timeInput, error);
    } else {
        showSuccess(timeInput);
    }
});

guestsInput.addEventListener('change', () => {
    const error = validateGuests(guestsInput.value);
    if (error) {
        showError(guestsInput, error);
    } else {
        showSuccess(guestsInput);
    }
});

// Set minimum date to today
dateInput.min = new Date().toISOString().split('T')[0];

// Set maximum date to 3 months from now
const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 3);
dateInput.max = maxDate.toISOString().split('T')[0];

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const phoneError = validatePhone(phoneInput.value);
    const dateError = validateDate(dateInput.value);
    const timeError = validateTime(timeInput.value, dateInput.value);
    const guestsError = validateGuests(guestsInput.value);
    
    // Show errors or success for each field
    if (nameError) {
        showError(nameInput, nameError);
    } else {
        showSuccess(nameInput);
    }
    
    if (emailError) {
        showError(emailInput, emailError);
    } else {
        showSuccess(emailInput);
    }
    
    if (phoneError) {
        showError(phoneInput, phoneError);
    } else {
        showSuccess(phoneInput);
    }
    
    if (dateError) {
        showError(dateInput, dateError);
    } else {
        showSuccess(dateInput);
    }
    
    if (timeError) {
        showError(timeInput, timeError);
    } else {
        showSuccess(timeInput);
    }
    
    if (guestsError) {
        showError(guestsInput, guestsError);
    } else {
        showSuccess(guestsInput);
    }
    
    // If there are any errors, don't submit
    if (nameError || emailError || phoneError || dateError || timeError || guestsError) {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // If validation passes, collect form data
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        date: dateInput.value,
        time: timeInput.value,
        guests: guestsInput.value,
        specialRequests: specialRequestsInput.value.trim()
    };
    
    // Show success message
    alert(Reservation submitted successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests});
    
    // Reset form
    form.reset();
    
    // Clear all validation states
    [nameInput, emailInput, phoneInput, dateInput, timeInput, guestsInput].forEach(input => {
        clearValidation(input);
    });
    
    // Here you would typically send the data to your server
    // Example: 
    // fetch('/api/reservations', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
});