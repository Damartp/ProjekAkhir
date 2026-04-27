const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');

// ===========================
// FORM SUBMIT
// ===========================
document.getElementById('createBtn').addEventListener('click', async () => {
    const name     = nameInput.value.trim();
    const email    = emailInput.value.trim();
    const password = passwordInput.value;

    if (!name || !email || !password) {
        alert('Semua field wajib diisi!');
        return;
    }

    const formData = new FormData();
    formData.append('action', 'register');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    const res  = await fetch('/ProjekAkhir/Ecommerce/controllers/AuthController.php', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();

    if (data.success) {
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = 'login.php';
    } else {
        alert(data.message);
    }
});

// ===========================
// INPUT FOCUS EFFECTS
// ===========================
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
const searchBtn   = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query) {
        alert('Searching for: ' + query);
    }
});

searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') searchBtn.click();
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