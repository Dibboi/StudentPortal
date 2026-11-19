/* ===== Shared app logic for all protected pages ===== */

// Redirect to login if not authenticated
(function guard() {
  const page = window.location.pathname.split('/').pop();
  if (page !== 'index.html' && page !== '' && !sessionStorage.getItem('uitm_loggedIn')) {
    window.location.href = 'index.html';
  }

  const nameEl = document.getElementById('studentName');
  if (nameEl) {
    nameEl.textContent = sessionStorage.getItem('uitm_username') || 'username';
  }
})();

// Logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = 'index.html';
  });
}