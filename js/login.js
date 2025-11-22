// login.js — authenticate demo user from localStorage (same user store used by signup.js)

document.addEventListener('DOMContentLoaded', () => {
  // set footer year
  const y = document.getElementById('copyYear');
  if (y) y.textContent = new Date().getFullYear();

  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidation(form);

    const email = (form.email.value || '').trim().toLowerCase();
    const password = (form.password.value || '');

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setFieldError(form.email, 'Please enter a valid email');
      return;
    }
    if (!password) {
      setFieldError(form.password, 'Please enter your password');
      return;
    }

    // lookup users stored in localStorage (demo)
    const users = JSON.parse(localStorage.getItem('skillloop_users') || '[]');

    // In our demo we don't store password — so we treat presence of email as success.
    // If your signup stores password, check it here:
    const matched = users.find(u => u.email === email);

    if (!matched) {
      setFieldError(form.email, 'No account found for this email.');
      return;
    }

    // For demo: set a session flag in localStorage and redirect
    localStorage.setItem('skillloop_session', JSON.stringify({ email: matched.email, id: matched.id, startedAt: new Date().toISOString() }));

    showToast('Welcome back! Redirecting...');
    setTimeout(() => {
      // change to your desired landing page after login
      window.location.href = 'index.html';
    }, 1000);
  });

  // clear errors on input
  form.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => {
      inp.classList.remove('input-error');
      const m = inp.parentElement.querySelector('.error-msg'); if (m) m.remove();
    });
  });

  function setFieldError(el, message) {
    if (!el) return;
    el.classList.add('input-error');
    let msg = el.parentElement.querySelector('.error-msg');
    if (!msg) {
      msg = document.createElement('div'); msg.className = 'error-msg'; el.parentElement.appendChild(msg);
    }
    msg.textContent = message;
    if (el.focus) el.focus();
  }
  function clearValidation(frm) {
    frm.querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));
    frm.querySelectorAll('.error-msg').forEach(n => n.remove());
  }

  // toast
  function showToast(text) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = text; t.style.opacity = '1';
    setTimeout(() => { t.style.opacity = '0'; }, 2400);
  }
});
