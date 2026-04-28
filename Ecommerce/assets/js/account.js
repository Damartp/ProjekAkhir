const CONTROLLER = '/ProjekAkhir/Ecommerce/controllers/AccountController.php';

// ===========================
// LOAD DATA USER
// ===========================
async function loadUser() {
    const fd = new FormData();
    fd.append('action', 'getUser');
    const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success) {
        const u = data.user;
        document.getElementById('userId').textContent    = u.id;
        document.getElementById('userName').textContent  = u.name;
        document.getElementById('userEmail').textContent = u.email;
        document.getElementById('welcomeName').textContent = u.name;
        document.getElementById('newName').value = u.name;
    } else {
        window.location.href = 'login.php';
    }
}

// ===========================
// UBAH NAMA
// ===========================
document.getElementById('btnSaveName').addEventListener('click', async () => {
    const name = document.getElementById('newName').value.trim();
    const msg  = document.getElementById('msgName');

    if (!name) { showMsg(msg, 'Nama tidak boleh kosong', false); return; }

    const fd = new FormData();
    fd.append('action', 'updateName');
    fd.append('name', name);

    const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
    const data = await res.json();
    showMsg(msg, data.message, data.success);
    if (data.success) loadUser();
});

// ===========================
// UBAH PASSWORD
// ===========================
document.getElementById('btnSavePassword').addEventListener('click', async () => {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    const msg     = document.getElementById('msgPassword');

    if (!current || !newPass || !confirm) { showMsg(msg, 'Semua field wajib diisi', false); return; }
    if (newPass !== confirm) { showMsg(msg, 'Password baru tidak cocok', false); return; }

    const fd = new FormData();
    fd.append('action', 'updatePassword');
    fd.append('current_password', current);
    fd.append('new_password', newPass);

    const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
    const data = await res.json();
    showMsg(msg, data.message, data.success);
    if (data.success) {
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value     = '';
        document.getElementById('confirmPassword').value = '';
    }
});

// ===========================
// HELPER
// ===========================
function showMsg(el, text, success) {
    el.textContent  = text;
    el.className    = 'msg ' + (success ? 'success' : 'error');
}

// ===========================
// LOGOUT
// ===========================
document.querySelector('.btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/ProjekAkhir/Ecommerce/controllers/AuthController.php?action=logout')
        .then(() => window.location.href = 'login.php');
});

// Init
loadUser();