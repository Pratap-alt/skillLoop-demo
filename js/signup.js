// signup.js - client-side form handling and simulated signup

document.addEventListener('DOMContentLoaded', () => {
  // simple copy of year in footer
  document.getElementById('copyYear').textContent = new Date().getFullYear();

  const form = document.getElementById('signupForm');
  const passwordEl = document.getElementById('password');
  const confirmEl = document.getElementById('confirmPassword');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidation(form);

    const data = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      dob: form.dob.value,
      email: form.email.value.trim().toLowerCase(),
      phone: form.phone.value.trim(),
      street: form.street.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      zip: form.zip.value.trim(),
      country: form.country.value.trim(),
      password: form.password.value
    };

    // client validation
    const errors = validate(data, form);
    if (Object.keys(errors).length) {
      showValidationErrors(errors);
      return;
    }

    // password match
    if (data.password !== form.confirmPassword.value) {
      setFieldError(confirmEl, 'Passwords do not match');
      return;
    }

    // simulated sign up: store in localStorage
    const users = JSON.parse(localStorage.getItem('skillloop_users') || '[]');

    // check duplicate email
    if (users.some(u => u.email === data.email)) {
      setFieldError(form.email, 'An account with this email already exists.');
      return;
    }

    // Hashing passwords on client is not secure; for demo we'll store a simple token (do NOT use in production)
    const record = {
      id: 'u_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };

    users.push(record);
    localStorage.setItem('skillloop_users', JSON.stringify(users));

    // show success and redirect (optional)
    showToast('Account created successfully! Redirecting to sign in...');
    setTimeout(() => {
      window.location.href = 'login.html'; // or index.html
    }, 1800);
  });

  // simple focus validation removal on input
  Array.from(form.querySelectorAll('input')).forEach(input => {
    input.addEventListener('input', () => input.classList.remove('input-error'));
  });

  // validation helpers
  function validate(data, form) {
    const out = {};
    if (!data.firstName) out.firstName = 'First name is required';
    if (!data.lastName) out.lastName = 'Last name is required';
    if (!data.dob) out.dob = 'Date of birth is required';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) out.email = 'Enter a valid email';
    if (!data.password || data.password.length < 8) out.password = 'Password must be at least 8 characters';
    return out;
  }

  function showValidationErrors(errors) {
    for (const key in errors) {
      const el = form.querySelector(`[name="${key}"]`);
      if (el) setFieldError(el, errors[key]);
    }
  }

  function setFieldError(el, message) {
    el.classList.add('input-error');
    // create a small error message under the field if not exists
    let msg = el.parentNode.querySelector('.error-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'error-msg';
      msg.style.color = '#ff6b6b';
      msg.style.marginTop = '6px';
      msg.style.fontSize = '0.9rem';
      el.parentNode.appendChild(msg);
    }
    msg.textContent = message;
    el.focus();
  }

  function clearValidation(form) {
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    form.querySelectorAll('.error-msg').forEach(n => n.remove());
  }

  // small toast helper
  function showToast(text) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
});
