// Form handling and validation logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentRegistrationForm');
  const statusMessage = document.getElementById('statusMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    clearErrors();

    // Field validations
    const fullName = document.getElementById('fullName');
    if (!fullName.value.trim()) {
      showError(fullName, 'fullNameError', 'Full name is required.');
      isValid = false;
    }

    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'emailError', 'Email address is required.');
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email, 'emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
      showError(phone, 'phoneError', 'Phone number is required.');
      isValid = false;
    }

    const dob = document.getElementById('dob');
    if (!dob.value) {
      showError(dob, 'dobError', 'Date of birth is required.');
      isValid = false;
    }

    const genderChecked = form.querySelector('input[name="gender"]:checked');
    if (!genderChecked) {
      const genderErr = document.getElementById('genderError');
      if (genderErr) genderErr.textContent = 'Please select a gender.';
      isValid = false;
    }

    const course = document.getElementById('course');
    if (!course.value) {
      showError(course, 'courseError', 'Please select an academic course.');
      isValid = false;
    }

    const semester = document.getElementById('semester');
    if (!semester.value) {
      showError(semester, 'semesterError', 'Please select a starting semester.');
      isValid = false;
    }

    const address = document.getElementById('address');
    if (!address.value.trim()) {
      showError(address, 'addressError', 'Residential street address is required.');
      isValid = false;
    }

    const city = document.getElementById('city');
    if (!city.value.trim()) {
      showError(city, 'cityError', 'City is required.');
      isValid = false;
    }

    const zipCode = document.getElementById('zipCode');
    if (!zipCode.value.trim()) {
      showError(zipCode, 'zipCodeError', 'Zip / Postal code is required.');
      isValid = false;
    }

    const terms = document.getElementById('terms');
    if (!terms.checked) {
      const termsErr = document.getElementById('termsError');
      if (termsErr) termsErr.textContent = 'You must certify the declaration before submitting.';
      isValid = false;
    }

    if (isValid) {
      // Display success message
      showStatus('Registration submitted successfully! Welcome aboard.', 'success');
      form.reset();
      clearErrors();
    } else {
      showStatus('Please correct the highlighted errors before submitting.', 'error');
    }
  });

  form.addEventListener('reset', () => {
    clearErrors();
    hideStatus();
  });

  function showError(inputElement, errorElementId, message) {
    if (inputElement) {
      inputElement.classList.add('is-invalid');
    }
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
    }
  }

  function clearErrors() {
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.error-text').forEach(el => el.textContent = '');
  }

  function showStatus(message, type) {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    statusMessage.className = `alert-message ${type}`;
    statusMessage.style.display = 'block';
    statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideStatus() {
    if (!statusMessage) return;
    statusMessage.style.display = 'none';
  }
});
