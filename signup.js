let getUsersdata = JSON.parse(localStorage.getItem("usersdata")) || [];
console.log(getUsersdata);

function Signup(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const name = document.getElementById('naam').value;
    const password = document.getElementById('pass').value;
    
    // Validate phone number
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid 10-digit mobile number');
        return false;
    }
    
    // Validate name
    if (!validateName(name)) {
        showError('naam', 'Please enter a valid name');
        return false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        showError('pass', 'Password must be at least 6 characters long');
        return false;
    }
    
    // If all validations pass, proceed with signup
    const userData = {
        phone,
        name,
        password
    };
    
    // Store user data in localStorage (for demo purposes)
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Show success message
    showSuccess('Signup successful! Redirecting to login...');
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
        window.location.href = 'signin.html';
    }, 2000);
    
    return false;
}

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('invalid');
    
    // Focus the field
    field.focus();
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = '#4CAF50';
    successDiv.style.padding = '10px';
    successDiv.style.marginTop = '10px';
    successDiv.style.textAlign = 'center';
    
    const form = document.getElementById('signupForm');
    form.appendChild(successDiv);
    
    // Disable the form
    const inputs = form.querySelectorAll('input');
    const button = form.querySelector('button');
    inputs.forEach(input => input.disabled = true);
    button.disabled = true;
}