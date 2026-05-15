// checkout.js — pakai allProducts dari products.js untuk emoji
// Pastikan products.js di-load SEBELUM checkout.js di checkout.php

const CONTROLLER = '/ProjekAkhir/Ecommerce/controllers/CheckoutController.php';

// ===========================
// PAYMENT INFO — emoji & warna
// Sesuaikan value dengan input[name="payment"] di checkout.php
// ===========================
const PAYMENT_META = {
  'bank_transfer':    { emoji: '🏦', label: 'Bank Transfer',   color: '#1a73e8' },
  'Bank Transfer':    { emoji: '🏦', label: 'Bank Transfer',   color: '#1a73e8' },
  'credit_card':      { emoji: '💳', label: 'Credit Card',     color: '#2e7d32' },
  'Credit Card':      { emoji: '💳', label: 'Credit Card',     color: '#2e7d32' },
  'paypal':           { emoji: '🅿️', label: 'PayPal',         color: '#003087' },
  'PayPal':           { emoji: '🅿️', label: 'PayPal',         color: '#003087' },
  'gopay':            { emoji: '🟢', label: 'GoPay',           color: '#00aed6' },
  'GoPay':            { emoji: '🟢', label: 'GoPay',           color: '#00aed6' },
  'ovo':              { emoji: '🟣', label: 'OVO',             color: '#4c3494' },
  'OVO':              { emoji: '🟣', label: 'OVO',             color: '#4c3494' },
  'dana':             { emoji: '🔵', label: 'DANA',            color: '#118ee9' },
  'Dana':             { emoji: '🔵', label: 'DANA',            color: '#118ee9' },
  'qris':             { emoji: '📱', label: 'QRIS',            color: '#e63946' },
  'QRIS':             { emoji: '📱', label: 'QRIS',            color: '#e63946' },
  'cod':              { emoji: '🚚', label: 'Bayar di Tempat', color: '#f59c00' },
  'COD':              { emoji: '🚚', label: 'Bayar di Tempat', color: '#f59c00' },
  'Cash on Delivery': { emoji: '🚚', label: 'Bayar di Tempat', color: '#f59c00' },
};

// ===========================
// AMBIL DATA USER DARI DB
// ===========================
async function loadUserData() {
  const fd = new FormData();
  fd.append('action', 'getUserData');
  const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
  const data = await res.json();
  if (data.success) {
    document.getElementById('nama').value  = data.user.name;
    document.getElementById('email').value = data.user.email;
  } else {
    window.location.href = 'login.php';
  }
}

// ===========================
// LOAD CART DARI LOCALSTORAGE
// Emoji diambil dari allProducts (global dari products.js)
// ===========================
function loadCart() {
  const cart     = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
  const discount = parseFloat(localStorage.getItem('exclusive_discount') || '0');
  const items    = document.getElementById('orderItems');

  if (cart.length === 0) {
    items.innerHTML = '<p style="color:#888;font-size:13px;">Cart kosong</p>';
    document.getElementById('subtotal').textContent   = '$0.00';
    document.getElementById('totalFinal').textContent = '$0.00';
    return;
  }

  let subtotal = 0;
  items.innerHTML = cart.map(item => {
    const qty       = item.qty || 1;
    const itemTotal = item.price * qty;
    subtotal       += itemTotal;

    // Ambil emoji dari allProducts, fallback ke item.emoji atau 📦
    let emoji = item.emoji || '📦';
    if (typeof allProducts !== 'undefined' && allProducts.length) {
      const match = allProducts.find(p => p.id === parseInt(item.id));
      if (match && match.emoji) emoji = match.emoji;
    }

    return `
      <div class="order-item">
        <span class="item-emoji-checkout">${emoji}</span>
        <span class="item-name">${escHtmlCo(item.name)}</span>
        <span class="item-qty">x${qty}</span>
        <span class="item-price">$${itemTotal.toFixed(2)}</span>
      </div>`;
  }).join('');

  const total = Math.max(0, subtotal - discount);

  document.getElementById('subtotal').textContent   = `$${subtotal.toFixed(2)}`;
  document.getElementById('totalFinal').textContent = `$${total.toFixed(2)}`;

  // Baris diskon (jika ada)
  const existingDisc = document.getElementById('discountRow');
  if (existingDisc) existingDisc.remove();
  if (discount > 0) {
    items.insertAdjacentHTML('afterend', `
      <div class="total-row" id="discountRow">
        <span>Diskon Kupon</span>
        <span style="color:green">-$${discount.toFixed(2)}</span>
      </div>`);
  }
}

// ===========================
// UPDATE LABEL PAYMENT YANG DIPILIH
// Tampilkan emoji + label di bawah radio button
// ===========================
function updatePaymentLabel() {
  const selected = document.querySelector('input[name="payment"]:checked');
  const infoEl   = document.getElementById('paymentInfo');
  if (!infoEl) return;

  if (!selected) { infoEl.innerHTML = ''; return; }

  const meta = PAYMENT_META[selected.value] || { emoji: '💰', label: selected.value, color: '#555' };
  infoEl.innerHTML = `
    <span style="font-size:20px;">${meta.emoji}</span>
    <span style="color:${meta.color};font-weight:600;margin-left:6px;">${meta.label}</span>
    <span style="color:#aaa;font-size:12px;margin-left:8px;">dipilih</span>`;
}

// Pasang listener ke semua radio payment
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', updatePaymentLabel);
});
// Tampilkan dari awal jika ada yang sudah tercentang
updatePaymentLabel();

// ===========================
// PLACE ORDER
// ===========================
document.getElementById('btnPlaceOrder').addEventListener('click', async () => {
  const kota    = document.getElementById('kota').value.trim();
  const alamat  = document.getElementById('alamat').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  const total   = document.getElementById('totalFinal').textContent.replace('$', '');
  const cart    = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
  const msg     = document.getElementById('msgOrder');

  if (!kota || !alamat) {
    showMsgCo(msg, 'Kota dan alamat wajib diisi!', false); return;
  }
  if (!payment) {
    showMsgCo(msg, 'Pilih metode pembayaran terlebih dahulu!', false); return;
  }
  if (cart.length === 0) {
    showMsgCo(msg, 'Cart kamu kosong!', false); return;
  }

  const fd = new FormData();
  fd.append('action',  'placeOrder');
  fd.append('kota',    kota);
  fd.append('alamat',  alamat);
  fd.append('payment', payment);
  fd.append('total',   total);
  fd.append('items',   JSON.stringify(cart));

  const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
  const data = await res.json();

  if (data.success) {
    localStorage.removeItem('exclusive_cart');
    localStorage.removeItem('exclusive_discount');
    showMsgCo(msg, `✅ Order #${data.order_id} berhasil! Terima kasih.`, true);
    setTimeout(() => window.location.href = 'home.php', 2500);
  } else {
    showMsgCo(msg, data.message, false);
  }
});

// ===========================
// HELPERS
// ===========================
function showMsgCo(el, text, success) {
  if (!el) return;
  el.textContent = text;
  el.className   = 'msg ' + (success ? 'success' : 'error');
}

function escHtmlCo(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ===========================
// INIT
// Tunggu products.js selesai load
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
  if (typeof initProducts === 'function') await initProducts();
  loadUserData();
  loadCart();
});