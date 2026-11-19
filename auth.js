/* ===== Authentication Logic (simulated, no database) =====
   Demo account: username / password
========================================================== */

const DEMO_USER = { username: 'username', password: 'password' };

function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem('uitm_users') || '[]');
}

function saveRegisteredUsers(users) {
  localStorage.setItem('uitm_users', JSON.stringify(users));
}

// ---- LOGIN ----
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorBox = document.getElementById('loginError');

  const registered = getRegisteredUsers();
  const isValid =
    (username === DEMO_USER.username && password === DEMO_USER.password) ||
    registered.some(u => u.username === username && u.password === password);

  if (!isValid) {
    errorBox.textContent = '❌ Invalid username or password. Please try again.';
    errorBox.classList.remove('d-none');
    return;
  }

  errorBox.classList.add('d-none');
  sessionStorage.setItem('uitm_loggedIn', 'true');
  sessionStorage.setItem('uitm_username', username);
  window.location.href = 'dashboard.html';
});

// ---- REGISTER ----
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  const errorBox = document.getElementById('regError');
  const successBox = document.getElementById('regSuccess');

  errorBox.classList.add('d-none');
  successBox.classList.add('d-none');

  if (!username || password.length < 6) {
    errorBox.textContent = '⚠️ Username required and password must be at least 6 characters.';
    errorBox.classList.remove('d-none');
    return;
  }

  const users = getRegisteredUsers();
  if (users.some(u => u.username === username) || username === DEMO_USER.username) {
    errorBox.textContent = '⚠️ This username is already registered.';
    errorBox.classList.remove('d-none');
    return;
  }

  users.push({ username, password });
  saveRegisteredUsers(users);

  successBox.textContent = '✅ Account created! You may now log in.';
  successBox.classList.remove('d-none');
  document.getElementById('registerForm').reset();
});