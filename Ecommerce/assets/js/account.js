const ACCOUNT_CTRL = '/ProjekAkhir/Ecommerce/controllers/AccountController.php';
const HISTORY_CTRL = '/ProjekAkhir/Ecommerce/controllers/HistoryController.php';

// ===========================
// PAYMENT — label, emoji, warna
// Sesuaikan dengan pilihan di checkout.php kamu
// ===========================
const PAYMENT_INFO = {
  'Bank Transfer':    { emoji: '🏦', label: 'Bank Transfer',    color: '#1a73e8' },
  'bank_transfer':    { emoji: '🏦', label: 'Bank Transfer',    color: '#1a73e8' },
  'Credit Card':      { emoji: '💳', label: 'Credit Card',      color: '#2e7d32' },
  'credit_card':      { emoji: '💳', label: 'Credit Card',      color: '#2e7d32' },
  'Visa':             { emoji: '💳', label: 'Visa',             color: '#1a1f71' },
  'Mastercard':       { emoji: '💳', label: 'Mastercard',       color: '#eb001b' },
  'PayPal':           { emoji: '🅿️', label: 'PayPal',          color: '#003087' },
  'paypal':           { emoji: '🅿️', label: 'PayPal',          color: '#003087' },
  'GoPay':            { emoji: '🟢', label: 'GoPay',            color: '#00aed6' },
  'gopay':            { emoji: '🟢', label: 'GoPay',            color: '#00aed6' },
  'OVO':              { emoji: '🟣', label: 'OVO',              color: '#4c3494' },
  'ovo':              { emoji: '🟣', label: 'OVO',              color: '#4c3494' },
  'Dana':             { emoji: '🔵', label: 'DANA',             color: '#118ee9' },
  'dana':             { emoji: '🔵', label: 'DANA',             color: '#118ee9' },
  'QRIS':             { emoji: '📱', label: 'QRIS',             color: '#e63946' },
  'qris':             { emoji: '📱', label: 'QRIS',             color: '#e63946' },
  'COD':              { emoji: '🚚', label: 'Bayar di Tempat',  color: '#f59c00' },
  'cod':              { emoji: '🚚', label: 'Bayar di Tempat',  color: '#f59c00' },
  'Cash on Delivery': { emoji: '🚚', label: 'Bayar di Tempat',  color: '#f59c00' },
};

function getPaymentInfo(raw) {
  if (!raw) return { emoji: '💰', label: raw || '-', color: '#888' };
  return PAYMENT_INFO[raw] || PAYMENT_INFO[raw.toLowerCase()] || { emoji: '💰', label: raw, color: '#888' };
}

// ===========================
// TAB SWITCHING
// ===========================
document.querySelectorAll('.side-menu-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll('.side-menu-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');

    if (tab === 'history') loadHistory();
  });
});

// ===========================
// LOAD DATA USER
// ===========================
async function loadUser() {
  try {
    const fd = new FormData();
    fd.append('action', 'getUser');
    const res  = await fetch(ACCOUNT_CTRL, { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success) {
      const u = data.user;
      document.getElementById('userId').textContent      = u.id;
      document.getElementById('userName').textContent    = u.name;
      document.getElementById('userEmail').textContent   = u.email;
      document.getElementById('welcomeName').textContent = u.name;
      document.getElementById('newName').value           = u.name;
    } else {
      window.location.href = 'login.php';
    }
  } catch(e) {
    console.error('loadUser error:', e);
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

  const res  = await fetch(ACCOUNT_CTRL, { method: 'POST', body: fd });
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
  if (newPass !== confirm)              { showMsg(msg, 'Password baru tidak cocok', false); return; }

  const fd = new FormData();
  fd.append('action', 'updatePassword');
  fd.append('current_password', current);
  fd.append('new_password', newPass);

  const res  = await fetch(ACCOUNT_CTRL, { method: 'POST', body: fd });
  const data = await res.json();
  showMsg(msg, data.message, data.success);
  if (data.success) {
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value     = '';
    document.getElementById('confirmPassword').value = '';
  }
});

// ===========================
// LOAD HISTORY ORDER (tabel hs)
// ===========================
let historyLoaded = false;

async function loadHistory() {
  if (historyLoaded) return;
  historyLoaded = true;

  const container = document.getElementById('historyList');
  container.innerHTML = '<div class="history-loading">Memuat riwayat pesanan...</div>';

  try {
    const fd = new FormData();
    fd.append('action', 'getHistory');
    const res  = await fetch(HISTORY_CTRL, { method: 'POST', body: fd });
    const data = await res.json();

    if (!data.success || !data.orders || data.orders.length === 0) {
      container.innerHTML = `
        <div class="history-empty">
          <span>🛍️</span>
          Belum ada riwayat pesanan.
        </div>`;
      return;
    }

    container.innerHTML = data.orders.map(order => renderOrderCard(order)).join('');
  } catch(e) {
    container.innerHTML = '<div class="history-empty"><span>⚠️</span>Gagal memuat riwayat pesanan.</div>';
    console.error('loadHistory error:', e);
  }
}

// ===========================
// RENDER KARTU ORDER
// ===========================
function renderOrderCard(order) {
  // Parse items JSON dari DB
  let items = [];
  try {
    items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);
  } catch(e) { items = []; }

  // Format tanggal
  const date = order.created_at
    ? new Date(order.created_at).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    : '-';

  // Status label & badge
  const STATUS_MAP = {
    pending:   'Menunggu',
    paid:      'Dibayar',
    shipped:   'Dikirim',
    done:      'Selesai',
    cancelled: 'Dibatalkan',
  };
  const statusLabel = STATUS_MAP[order.status] || order.status || 'pending';
  const isCancelled = order.status === 'cancelled';
  const isDone      = order.status === 'done' || order.status === 'shipped';
  // Hanya bisa dibatalkan jika masih pending / paid
  const canCancel   = !isCancelled && !isDone;

  // Payment logo
  const pay = getPaymentInfo(order.payment);

  // Emoji item: coba ambil dari allProducts (global dari products.js), fallback ke data item
  const itemRows = items.length > 0
    ? items.map(item => {
        // Cari emoji dari allProducts global
        let emoji = item.emoji || '📦';
        if (typeof allProducts !== 'undefined' && allProducts.length) {
          const match = allProducts.find(p => p.id === parseInt(item.id));
          if (match && match.emoji) emoji = match.emoji;
        }
        const qty      = item.qty || item.quantity || 1;
        const price    = parseFloat(item.price || 0);
        const subtotal = (price * qty).toFixed(2);
        return `
          <tr>
            <td>
              <span class="item-emoji">${emoji}</span>
              <span class="item-name">${escHtml(item.name || '-')}</span>
            </td>
            <td style="color:#888;">x${qty}</td>
            <td style="text-align:right;color:#db4444;font-weight:600;">$${subtotal}</td>
          </tr>`;
      }).join('')
    : `<tr><td colspan="3" style="color:#aaa;padding:8px 0;">Data item tidak tersedia.</td></tr>`;

  // Tombol batal / label cancelled
  const cancelBtn = isCancelled
    ? `<span class="cancelled-label">✕ Order dibatalkan</span>`
    : isDone
      ? `<span style="font-size:12px;color:#2e7d32;">✔ Selesai</span>`
      : `<button class="btn-cancel-order" onclick="cancelOrder(${order.id}, this)">Batalkan Order</button>`;

  return `
    <div class="order-card" id="order-card-${order.id}">
      <div class="order-header">
        <div>
          <span class="order-id">Order #${order.id}</span>
          <span class="order-date" style="margin-left:10px;">${date}</span>
        </div>
        <span class="order-status ${order.status || 'pending'}">${statusLabel}</span>
      </div>
      <div class="order-body">
        <div class="order-meta">
          <div class="order-meta-item">
            <strong>Kota</strong>${escHtml(order.kota || '-')}
          </div>
          <div class="order-meta-item">
            <strong>Alamat</strong>${escHtml(order.alamat || '-')}
          </div>
          <div class="order-meta-item">
            <strong>Pembayaran</strong>
            <span class="payment-logo-wrap">
              <span class="payment-logo-emoji">${pay.emoji}</span>
              <span style="color:${pay.color};font-weight:600;">${escHtml(pay.label)}</span>
            </span>
          </div>
        </div>
        <table class="order-items">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Qty</th>
              <th style="text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
      </div>
      <div class="order-footer">
        <div>${cancelBtn}</div>
        <div class="order-total">
          <span>Total</span>$${parseFloat(order.total || 0).toFixed(2)}
        </div>
      </div>
    </div>`;
}

// ===========================
// BATAL ORDER
// ===========================
async function cancelOrder(orderId, btnEl) {
  if (!confirm(`Batalkan Order #${orderId}?\nTindakan ini tidak bisa diurungkan.`)) return;

  btnEl.disabled    = true;
  btnEl.textContent = 'Membatalkan...';

  try {
    const fd = new FormData();
    fd.append('action', 'cancelOrder');
    fd.append('order_id', orderId);
    const res  = await fetch(HISTORY_CTRL, { method: 'POST', body: fd });
    const data = await res.json();

    if (data.success) {
      // Update badge status langsung di DOM
      const card       = document.getElementById('order-card-' + orderId);
      const statusEl   = card.querySelector('.order-status');
      statusEl.className   = 'order-status cancelled';
      statusEl.textContent = 'Dibatalkan';

      // Ganti tombol dengan label
      btnEl.parentElement.innerHTML = `<span class="cancelled-label">✕ Order dibatalkan</span>`;
    } else {
      btnEl.disabled    = false;
      btnEl.textContent = 'Batalkan Order';
      alert(data.message || 'Gagal membatalkan order.');
    }
  } catch(e) {
    btnEl.disabled    = false;
    btnEl.textContent = 'Batalkan Order';
    alert('Error: Tidak dapat terhubung ke server.');
    console.error('cancelOrder error:', e);
  }
}

// ===========================
// LOGOUT
// ===========================
document.getElementById('btnLogout').addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/ProjekAkhir/Ecommerce/controllers/AuthController.php?action=logout')
    .then(() => window.location.href = 'login.php');
});

// ===========================
// BADGE NAVBAR (wishlist & cart)
// ===========================
function updateWishlistBadge() {
  const list  = JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
  const el    = document.getElementById('wishCount');
  if (!el) return;
  el.textContent   = list.length;
  el.style.display = list.length > 0 ? 'flex' : 'none';
}

function updateCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const el    = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

// ===========================
// HELPERS
// ===========================
function showMsg(el, text, success) {
  el.textContent = text;
  el.className   = 'msg ' + (success ? 'success' : 'error');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ===========================
// CHATBOT — Functions
// ===========================
window.chatSend = function(text) {
  const chatbotWidget  = document.getElementById('chatbotWidget');
  const chatbotInput   = document.getElementById('chatbotInput');
  const chatbotMsgs    = document.getElementById('chatbotMessages');
  
  const msg = text || chatbotInput?.value.trim();
  if (!msg) return;
  if (chatbotInput) chatbotInput.value = '';
  appendMsg(msg, 'user');
  const sugg = document.getElementById('chatbotSuggestions');
  if (sugg) sugg.style.display = 'none';
  setTimeout(() => appendMsg(chatbotReply(msg), 'bot'), 400);
};

function appendMsg(text, sender) {
  const chatbotMsgs = document.getElementById('chatbotMessages');
  if (!chatbotMsgs) return;
  const wrap   = document.createElement('div');
  wrap.className = `chat-msg ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = text;
  wrap.appendChild(bubble);
  chatbotMsgs.appendChild(wrap);
  chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
}

function chatbotReply(input) {
  const q = input.toLowerCase();

  if (q.includes('batal') || q.includes('cancel') || q.includes('hapus order')) {
    return '❌ <strong>Cara membatalkan order:</strong><br>1. Buka tab <strong>🧾 History Order</strong><br>2. Cari order yang ingin dibatalkan<br>3. Klik tombol <strong>"Batalkan Order"</strong><br><em>Hanya order berstatus Menunggu atau Dibayar yang bisa dibatalkan.</em>';
  }
  if (q.includes('history') || q.includes('riwayat') || q.includes('pesanan')) {
    return '🧾 <strong>History Order</strong> ada di tab kiri bawah.<br>Klik <strong>"🧾 History Order"</strong> untuk melihat semua riwayat belanja kamu.';
  }
  if (q.includes('flash') || q.includes('sale') || q.includes('diskon')) {
    return '🔥 <strong>Flash Sales</strong> adalah promo harga spesial waktu terbatas!<br><a href="home.php" style="color:#db4444;">→ Lihat Flash Sales di Home</a>';
  }
  if (q.includes('wishlist') || q.includes('favorit')) {
    return '❤️ <strong>Wishlist</strong> bisa diakses di ikon ♡ navbar atas.<br><a href="wishlist.php" style="color:#db4444;">→ Buka Wishlist</a>';
  }
  if (q.includes('cart') || q.includes('keranjang') || q.includes('beli') || q.includes('checkout')) {
    return '🛒 <strong>Cara membeli:</strong><br>1. Pilih produk di <a href="home.php" style="color:#db4444;">Home</a><br>2. Klik "Add To Cart"<br>3. Lakukan checkout di <a href="cart.php" style="color:#db4444;">Cart</a>';
  }
  if (q.includes('password') || q.includes('nama') || q.includes('profil') || q.includes('ubah')) {
    return '👤 Untuk mengubah nama atau password, klik tab <strong>"👤 Profil Saya"</strong> di sebelah kiri.';
  }
  if (q.includes('kirim') || q.includes('delivery') || q.includes('ongkir')) {
    return '🚚 <strong>Info Pengiriman:</strong><br>• Gratis pengiriman untuk order di atas <strong>$140</strong>';
  }
  if (q.includes('garansi') || q.includes('return') || q.includes('refund')) {
    return '✅ <strong>Money Back Guarantee 30 hari</strong> jika produk tidak sesuai.';
  }
  if (q.includes('cs') || q.includes('bantuan') || q.includes('support') || q.includes('kontak')) {
    return '🎧 <strong>Customer Service 24/7</strong><br>📧 exclusive@gmail.com<br>📞 +88015-88888-9999';
  }
  if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('hi')) {
    return 'Halo! 👋 Selamat datang di <strong>Exclusive</strong>! Ada yang bisa saya bantu?';
  }
  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks')) {
    return 'Sama-sama! 😊 Ada lagi yang ditanyakan?';
  }

  return 'Hmm, saya belum mengerti 🤔<br>Coba tanyakan:<br>• ❌ Cara batalkan order<br>• 🧾 History order<br>• 🛒 Cara beli produk<br>• 🎧 Customer Service';
}

// ===========================
// INIT
// ===========================
loadUser();
updateWishlistBadge();
updateCartBadge();

// products.js di-load lewat account.php → allProducts tersedia saat loadHistory
// initProducts() dipanggil setelah page load
document.addEventListener('DOMContentLoaded', async () => {
  if (typeof initProducts === 'function') await initProducts();

  // ===========================
  // CHATBOT INITIALIZATION — di dalam DOMContentLoaded agar DOM siap
  // ===========================
  const chatbotWidget  = document.getElementById('chatbotWidget');
  const chatbotToggle  = document.getElementById('chatbotToggle');
  const chatbotClose   = document.getElementById('chatbotClose');
  const chatbotInput   = document.getElementById('chatbotInput');
  const chatbotSendBtn = document.getElementById('chatbotSend');

  if (chatbotToggle && chatbotWidget) {
    chatbotToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('✓ Chatbot toggle clicked. Current classes:', chatbotWidget.className);
      chatbotWidget.classList.toggle('open');
      console.log('✓ After toggle, classes:', chatbotWidget.className);
      if (chatbotWidget.classList.contains('open') && chatbotInput) {
        chatbotInput.focus();
      }
    });
  }

  if (chatbotClose && chatbotWidget) {
    chatbotClose.addEventListener('click', () => {
      chatbotWidget.classList.remove('open');
    });
  }

  if (chatbotSendBtn) {
    chatbotSendBtn.addEventListener('click', () => window.chatSend());
  }

  if (chatbotInput) {
    chatbotInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') window.chatSend();
    });
  }

  // Debug: Verify elements are found
  if (!chatbotWidget) console.error('❌ Chatbot widget element not found!');
  if (!chatbotToggle) console.error('❌ Chatbot toggle button not found!');
  if (chatbotWidget && chatbotToggle) {
    console.log('✓ Chatbot initialized successfully');
    console.log('✓ Widget:', chatbotWidget.id);
    console.log('✓ Toggle button:', chatbotToggle.id);
  }
});