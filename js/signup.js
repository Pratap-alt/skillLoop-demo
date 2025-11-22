// signup.js — Modern glass signup logic (client-side demo using localStorage)

document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearEl = document.getElementById('copyYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidation(form);

    const data = {
      firstName: (form.firstName.value || '').trim(),
      lastName: (form.lastName.value || '').trim(),
      dob: form.dob.value || '',
      email: (form.email.value || '').trim().toLowerCase(),
      phone: (form.phone.value || '').trim(),
      password: form.password.value || ''
    };

    // basic client-side validation
    const errors = validate(data);
    if (Object.keys(errors).length) {
      showValidationErrors(errors);
      return;
    }

    // confirm password check
    if (form.password.value !== form.confirmPassword.value) {
      setFieldError(form.confirmPassword, 'Passwords do not match');
      return;
    }

    // Simulated signup - store in localStorage (demo only)
    const users = JSON.parse(localStorage.getItem('skillloop_users') || '[]');
    if (users.some(u => u.email === data.email)) {
      setFieldError(form.email, 'An account with this email already exists.');
      return;
    }

    const user = {
      id: 'u_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem('skillloop_users', JSON.stringify(users));

    showToast('Account created — redirecting to sign in...');
    setTimeout(() => window.location.href = 'login.html', 1500);
  });

  // remove validation classes when user types
  form.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => {
      inp.classList.remove('input-error');
      const m = inp.parentNode.querySelector('.error-msg');
      if (m) m.remove();
    });
  });

  function validate(data) {
    const out = {};
    if (!data.firstName) out.firstName = 'Please enter your first name';
    if (!data.lastName) out.lastName = 'Please enter your last name';
    if (!data.dob) out.dob = 'Please provide your date of birth';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) out.email = 'Please enter a valid email address';
    if (!data.password || data.password.length < 8) out.password = 'Password must be at least 8 characters';
    return out;
  }

  function showValidationErrors(errors) {
    Object.keys(errors).forEach(key => {
      const el = form.querySelector(`[name="${key}"]`);
      if (el) setFieldError(el, errors[key]);
    });
  }

  function setFieldError(el, message) {
    if (!el) return;
    el.classList.add('input-error');
    let msg = el.parentNode.querySelector('.error-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'error-msg';
      el.parentNode.appendChild(msg);
    }
    msg.textContent = message;
    el.focus();
  }

  function clearValidation(frm) {
    frm.querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));
    frm.querySelectorAll('.error-msg').forEach(n => n.remove());
  }

  // lightweight toast
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
