// ===========================
// FORM VALIDATION & SUBMIT
// ===========================

const createBtn     = document.getElementById('createBtn');
const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');

if (createBtn) {
  createBtn.addEventListener('click', async () => {
    const email    = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert('Email dan password wajib diisi!');
      return;
    }

    createBtn.disabled    = true;
    createBtn.textContent = 'Loading...';

    const formData = new FormData();
    formData.append('action',   'login');
    formData.append('email',    email);
    formData.append('password', password);

    try {
      const res  = await fetch('/ProjekAkhir/Ecommerce/controllers/AuthController.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        alert('Login berhasil! Selamat datang, ' + data.user.name);
        window.location.href = data.user.role === 'admin' ? 'admin.php' : 'home.php';
      } else {
        alert(data.message || 'Login gagal, coba lagi.');
        createBtn.disabled    = false;
        createBtn.textContent = 'Login';
      }
    } catch (e) {
      alert('Terjadi kesalahan koneksi. Coba lagi.');
      createBtn.disabled    = false;
      createBtn.textContent = 'Login';
    }
  });
}

// ===========================
// INPUT FOCUS EFFECTS
// ===========================

[emailInput, passwordInput].forEach(input => {
  if (!input) return;
  input.addEventListener('focus', function () {
    this.style.borderBottomColor = '#db4444';
  });
  input.addEventListener('blur', function () {
    if (!this.value.trim()) this.style.borderBottomColor = '#ccc';
  });
});

// ===========================
// SHOW/HIDE PASSWORD
// ===========================

if (passwordInput) {
  const toggleBtn = document.createElement('span');
  toggleBtn.innerHTML = '👁';
  toggleBtn.style.cssText = `
    position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); cursor: pointer;
    font-size: 16px; user-select: none;
  `;
  const passwordWrapper = passwordInput.parentElement;
  if (passwordWrapper) {
    passwordWrapper.style.position = 'relative';
    passwordWrapper.appendChild(toggleBtn);
  }
  toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type  = 'text';
      toggleBtn.innerHTML = '👁️‍🗨️';
    } else {
      passwordInput.type  = 'password';
      toggleBtn.innerHTML = '👁';
    }
  });
}
