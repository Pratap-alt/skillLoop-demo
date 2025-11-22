// signup.js — modern glass signup logic (client-only demo storing to localStorage)

document.addEventListener('DOMContentLoaded', () => {
  // Set footer year
  const y = document.getElementById('copyYear');
  if (y) y.textContent = new Date().getFullYear();

  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidation(form);

    const data = {
      firstName: (form.firstName?.value || '').trim(),
      lastName: (form.lastName?.value || '').trim(),
      email: (form.email?.value || '').trim().toLowerCase(),
      password: (form.password?.value || ''),
      confirmPassword: (form.confirmPassword?.value || '')
    };

    // Basic validation
    const errors = {};
    if (!data.firstName) errors.firstName = 'First name is required';
    if (!data.lastName) errors.lastName = 'Last name is required';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Please enter a valid email';
    if (!data.password || data.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!form.agreeTerms?.checked) errors.agreeTerms = 'You must accept the Terms and Privacy';

    if (Object.keys(errors).length) {
      showValidationErrors(errors);
      return;
    }

    // Demo: localStorage user store (NOT for production)
    const users = JSON.parse(localStorage.getItem('skillloop_users') || '[]');
    if (users.some(u => u.email === data.email)) {
      setFieldError(form.email, 'An account with this email already exists.');
      return;
    }

    const record = {
      id: 'u_' + Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      createdAt: new Date().toISOString()
      // Do not store plain passwords in production. This demo does not store pw.
    };

    users.push(record);
    localStorage.setItem('skillloop_users', JSON.stringify(users));

    showToast('Account created — redirecting to sign in...');
    setTimeout(() => window.location.href = 'login.html', 1400);
  });

  // Remove error once user types
  form.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => {
      inp.classList.remove('input-error');
      const msg = inp.parentElement?.querySelector('.error-msg');
      if (msg) msg.remove();
    });
  });

  function showValidationErrors(errors) {
    Object.keys(errors).forEach(k => {
      const el = form.querySelector(`[name="${k}"]`) || document.getElementById(k);
      if (el) setFieldError(el, errors[k]);
      if (k === 'agreeTerms') {
        const checkbox = form.querySelector('#agreeTerms');
        if (checkbox) setFieldError(checkbox, errors[k]);
      }
    });
  }

  function setFieldError(el, message) {
    if (!el) return;
    el.classList.add('input-error');
    let msg = el.parentElement.querySelector('.error-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'error-msg';
      el.parentElement.appendChild(msg);
    }
    msg.textContent = message;
    if (el.focus) el.focus();
  }

  function clearValidation(form) {
    form.querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));
    form.querySelectorAll('.error-msg').forEach(n => n.remove());
  }

  // simple toast
  function showToast(text) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.style.opacity = '1';
    setTimeout(() => { t.style.opacity = '0'; }, 2800);
  }
});
