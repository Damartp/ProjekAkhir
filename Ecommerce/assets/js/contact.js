/* =============================================
   EXCLUSIVE E-COMMERCE — CONTACT PAGE SCRIPTS
   ============================================= */

// ===========================
// BADGE NAVBAR — Wishlist & Cart
// Inject badge span ke dalam <a> yang sudah ada di navbar
// ===========================

(function injectBadgeStyle() {
  if (document.getElementById('navBadgeStyle')) return;
  const s = document.createElement('style');
  s.id = 'navBadgeStyle';
  s.textContent = `
    .nav-badge-count {
      position: absolute;
      top: -7px;
      right: -9px;
      min-width: 17px;
      height: 17px;
      background: #db4444;
      color: #fff;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      pointer-events: none;
      line-height: 1;
    }
    a[href="wishlist.php"].icon-btn,
    a[href="cart.php"].icon-btn {
      position: relative;
      display: inline-flex;
    }
  `;
  document.head.appendChild(s);
})();

function injectBadgeEl(linkEl, badgeId) {
  if (!linkEl || linkEl.querySelector('#' + badgeId)) return;
  const span = document.createElement('span');
  span.id        = badgeId;
  span.className = 'nav-badge-count';
  span.style.display = 'none';
  linkEl.appendChild(span);
}

function updateWishlistBadge() {
  const list = JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
  const el   = document.getElementById('wishBadgeContact');
  if (!el) return;
  el.textContent   = list.length;
  el.style.display = list.length > 0 ? 'flex' : 'none';
}

function updateCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const el    = document.getElementById('cartBadgeContact');
  if (!el) return;
  el.textContent   = total;
  el.style.display = total > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const wishLink = document.querySelector('a[href="wishlist.php"].icon-btn');
  const cartLink = document.querySelector('a[href="cart.php"].icon-btn');
  injectBadgeEl(wishLink, 'wishBadgeContact');
  injectBadgeEl(cartLink, 'cartBadgeContact');
  updateWishlistBadge();
  updateCartBadge();

  /* ------------------------------------------
     1. HAMBURGER MENU (Mobile)
  ------------------------------------------ */
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');

  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    navActions.classList.toggle('mobile-open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      navActions.classList.remove('mobile-open');
      hamburger.classList.remove('active');
    });
  });

  /* ------------------------------------------
     2. SEND MESSAGE — Form Validation & Submit
  ------------------------------------------ */
  const sendBtn    = document.getElementById('sendBtn');
  const successMsg = document.getElementById('successMsg');
  const nameInput  = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput   = document.getElementById('message');

  sendBtn.addEventListener('click', () => {
    const errors = [];

    if (!nameInput.value.trim()) {
      errors.push(nameInput);
      shakeField(nameInput);
    }
    if (!isValidEmail(emailInput.value.trim())) {
      errors.push(emailInput);
      shakeField(emailInput);
    }
    if (!msgInput.value.trim()) {
      errors.push(msgInput);
      shakeField(msgInput);
    }

    if (errors.length > 0) { errors[0].focus(); return; }

    sendBtn.classList.add('loading');
    sendBtn.querySelector('span').textContent = 'Sending…';

    setTimeout(() => {
      sendBtn.classList.remove('loading');
      sendBtn.querySelector('span').textContent = 'Send Message';
      successMsg.classList.add('show');
      nameInput.value  = '';
      emailInput.value = '';
      document.getElementById('phone').value = '';
      msgInput.value   = '';
      setTimeout(() => successMsg.classList.remove('show'), 4000);
    }, 1200);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeField(el) {
    el.style.borderColor = '#DB4444';
    el.style.boxShadow   = '0 0 0 3px rgba(219,68,68,0.18)';
    el.classList.add('shake');
    setTimeout(() => {
      el.classList.remove('shake');
      el.style.borderColor = '';
      el.style.boxShadow   = '';
    }, 600);
  }

  /* ------------------------------------------
     3. SUBSCRIBE — Footer email
  ------------------------------------------ */
  const subscribeInput = document.querySelector('.subscribe-box input');
  const subscribeBtn   = document.querySelector('.subscribe-box button');

  if (subscribeBtn && subscribeInput) {
    subscribeBtn.addEventListener('click', () => {
      const val = subscribeInput.value.trim();
      if (!isValidEmail(val)) {
        subscribeInput.style.borderBottom = '1px solid #DB4444';
        subscribeInput.focus();
        setTimeout(() => { subscribeInput.style.borderBottom = ''; }, 1500);
        return;
      }
      subscribeBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>`;
      subscribeInput.value = '';
      subscribeInput.placeholder = 'Subscribed! 🎉';
      setTimeout(() => {
        subscribeInput.placeholder = 'Enter your email';
        subscribeBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>`;
      }, 3000);
    });

    subscribeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') subscribeBtn.click();
    });
  }

  /* ------------------------------------------
     4. Prevent default # links
  ------------------------------------------ */
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });

  /* ------------------------------------------
     5. NAVBAR SHADOW on Scroll
  ------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,.08)'
      : 'none';
  });

});

/* ------------------------------------------
   6. CSS INJECT — Mobile nav & shake animation
------------------------------------------ */
(function injectDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .nav-links.mobile-open,
      .nav-actions.mobile-open { display: flex; }
      .nav-links.mobile-open {
        position: fixed; top: 70px; left: 0; right: 0;
        background: #fff; flex-direction: column;
        padding: 20px 24px; gap: 16px;
        border-bottom: 1px solid #e0e0e0;
        box-shadow: 0 8px 24px rgba(0,0,0,.1);
        z-index: 99; animation: slideDown .25s ease;
      }
      .nav-actions.mobile-open {
        position: fixed; top: calc(70px + 200px); right: 0;
        flex-direction: row; padding: 12px 24px;
        background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,.08); z-index: 99;
      }
    }
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    .shake { animation: shake .5s ease; }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();

/* ------------------------------------------
   7. CHATBOT — sama seperti home.js
------------------------------------------ */

function chatSend(text) {
  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMsgs = document.getElementById('chatbotMessages');
  const chatbotSuggestions = document.getElementById('chatbotSuggestions');
  const msg = text || chatbotInput?.value.trim();
  if (!msg) return;
  if (chatbotInput) chatbotInput.value = '';
  appendMsg(msg, 'user', chatbotMsgs);
  if (chatbotSuggestions) chatbotSuggestions.style.display = 'none';
  setTimeout(() => appendMsg(chatbotReply(msg), 'bot', chatbotMsgs), 400);
}

function appendMsg(text, sender, container) {
  const msgs = container || document.getElementById('chatbotMessages');
  if (!msgs) return;
  const wrap = document.createElement('div');
  wrap.className = `chat-msg ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = text;
  wrap.appendChild(bubble);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function chatbotReply(input) {
  const q = input.toLowerCase();
  if (q.includes('flash') || q.includes('sale') || q.includes('diskon'))
    return '🔥 <strong>Flash Sales</strong> tersedia di halaman utama dengan diskon hingga <strong>-40%</strong>! <a href="home.php" style="color:#db4444;">→ Lihat Flash Sales</a>';
  if (q.includes('wishlist') || q.includes('wish') || q.includes('favorit'))
    return '❤️ Simpan produk favorit dengan klik ikon ♥. <a href="wishlist.php" style="color:#db4444;">Lihat Wishlist</a>';
  if (q.includes('cart') || q.includes('keranjang') || q.includes('beli') || q.includes('checkout'))
    return '🛒 Tambahkan produk ke cart lalu checkout. <a href="cart.php" style="color:#db4444;">Buka Cart</a>';
  if (q.includes('promo') || q.includes('voucher') || q.includes('hemat'))
    return '🏷️ Promo aktif: Summer Sale 50%, Flash Sale hingga 40%, dan diskon 10% untuk subscriber newsletter!';
  if (q.includes('kirim') || q.includes('delivery') || q.includes('ongkir'))
    return '🚚 Gratis pengiriman untuk order di atas $140. Estimasi 2–5 hari kerja.';
  if (q.includes('return') || q.includes('refund') || q.includes('garansi'))
    return '✅ <strong>Money Back Guarantee</strong> — pengembalian uang dalam 30 hari jika produk tidak sesuai.';
  if (q.includes('contact') || q.includes('kontak') || q.includes('hubungi') || q.includes('form'))
    return '📬 Isi form di halaman ini untuk menghubungi kami, atau:<br>📞 +88001611112222<br>📧 customer@exclusive.com<br>Kami balas dalam 24 jam!';
  if (q.includes('telepon') || q.includes('phone') || q.includes('nomor') || q.includes('call'))
    return '📞 Hubungi kami di <strong>+88001611112222</strong> — tersedia 24/7!';
  if (q.includes('email') || q.includes('surat') || q.includes('pesan'))
    return '📧 Email kami di:<br>customer@exclusive.com<br>support@exclusive.com<br>Respons dalam 24 jam!';
  if (q.includes('cs') || q.includes('customer') || q.includes('bantuan') || q.includes('support'))
    return '🎧 <strong>Customer Service 24/7</strong><br>📞 +88001611112222<br>📧 customer@exclusive.com';
  if (q.includes('login') || q.includes('daftar') || q.includes('akun') || q.includes('register'))
    return '👤 <a href="login.php" style="color:#db4444;">Login</a> atau <a href="register.php" style="color:#db4444;">Daftar</a> untuk pengalaman belanja lebih baik!';
  if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('hi'))
    return 'Halo! 👋 Ada yang bisa saya bantu? Atau gunakan form di halaman ini untuk menghubungi tim kami!';
  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks'))
    return 'Sama-sama! 😊 Jangan ragu hubungi kami lagi jika ada pertanyaan!';
  return 'Hmm, saya belum mengerti 🤔<br>Coba tanya: Flash Sales · Cart · Pengiriman · Kontak · Nomor Telepon';
}

window.addEventListener('DOMContentLoaded', () => {
  const wishLink = document.querySelector('a[href="wishlist.php"].icon-btn');
  const cartLink = document.querySelector('a[href="cart.php"].icon-btn');
  injectBadgeEl(wishLink, 'wishBadgeContact');
  injectBadgeEl(cartLink, 'cartBadgeContact');
  updateWishlistBadge();
  updateCartBadge();

  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSendBtn = document.getElementById('chatbotSend');

  if (chatbotToggle && chatbotWidget) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWidget.classList.toggle('open');
      if (chatbotWidget.classList.contains('open')) chatbotInput?.focus();
    });
  }
  if (chatbotClose && chatbotWidget) {
    chatbotClose.addEventListener('click', () => chatbotWidget.classList.remove('open'));
  }
  if (chatbotSendBtn) {
    chatbotSendBtn.addEventListener('click', () => chatSend());
  }
  if (chatbotInput) {
    chatbotInput.addEventListener('keydown', e => { if (e.key === 'Enter') chatSend(); });
  }
});