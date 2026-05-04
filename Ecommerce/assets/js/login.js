// ===========================
// FORM VALIDATION & SUBMIT
// ===========================

 document.getElementById('createBtn').addEventListener('click', async () => {
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Email dan password wajib diisi!');
        return;
    }

    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('email', email);
    formData.append('password', password);

    const res  = await fetch('/ProjekAkhir/Ecommerce/controllers/AuthController.php', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();

    if (data.success) {
        alert('Login berhasil! Selamat datang, ' + data.user.name);
        if (data.user.role === 'admin') {
            window.location.href = 'admin.php';
        } else {
            window.location.href = 'home.php';
        }
    } else {
        alert(data.message);
    }
    });

// ===========================
// HELPER FUNCTIONS
// ===========================

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) || /^[0-9+\-\s]+$/.test(email); // also allow phone number
}

// ===========================
// INPUT FOCUS EFFECTS
// ===========================

const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');

[nameInput, emailInput, passwordInput].forEach(input => {
  input.addEventListener('focus', function () {
    this.style.borderBottomColor = '#db4444';
  });
  input.addEventListener('blur', function () {
    if (!this.value.trim()) {
      this.style.borderBottomColor = '#ccc';
    }
  });
});

// ===========================
// SEARCH BAR
// ===========================

const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function () {
  const query = searchInput.value.trim();
  if (query) {
    alert('Searching for: ' + query);
    // In a real app, navigate to search results page
  }
});

searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// ===========================
// SHOW/HIDE PASSWORD
// ===========================
const passwordField = document.getElementById('password');

const toggleBtn = document.createElement('span');
toggleBtn.innerHTML = '👁';
toggleBtn.style.cssText = `
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 16px;
    user-select: none;
`;

const passwordWrapper = passwordField.parentElement;
passwordWrapper.style.position = 'relative';
passwordWrapper.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.innerHTML = '👁️‍🗨️';
    } else {
        passwordField.type = 'password';
        toggleBtn.innerHTML = '👁';
    }
});