// ===========================
// ABOUT PAGE JS
// ===========================

// Stat card hover — highlight active on click
document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.stat-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// Animate stats on scroll
function animateStats() {
  const cards = document.querySelectorAll('.stat-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.2s, color 0.2s, box-shadow 0.2s';
    observer.observe(card);
  });
}

// Animate story section on scroll
function animateStory() {
  const section = document.querySelector('.story-section');
  if (!section) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
}

// Animate features
function animateFeatures() {
  const items = document.querySelectorAll('.feature-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
  });
}

// Footer email subscribe
function subscribeEmail() {
  const input = document.querySelector('.email-subscribe input');
  if (!input) return;
  const email = input.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    input.style.borderBottom = '2px solid #db4444';
    input.placeholder = 'Enter a valid email!';
    setTimeout(() => {
      input.style.borderBottom = '';
      input.placeholder = 'Enter your email';
    }, 2500);
    return;
  }
  alert(`🎉 Subscribed! Check ${email} for 10% off!`);
  input.value = '';
}

document.querySelector('.email-subscribe button')?.addEventListener('click', subscribeEmail);

// ===========================
// BADGE NAVBAR — Wishlist & Cart
// Inject badge span ke dalam elemen <a> yang sudah ada
// ===========================

// Style badge (inject sekali saja)
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

// Inject elemen badge ke link wishlist dan cart
function injectBadgeEl(linkEl, badgeId) {
  if (!linkEl || linkEl.querySelector('#' + badgeId)) return;
  const span = document.createElement('span');
  span.id        = badgeId;
  span.className = 'nav-badge-count';
  span.style.display = 'none';
  linkEl.appendChild(span);
}

const wishLink = document.querySelector('a[href="wishlist.php"].icon-btn');
const cartLink = document.querySelector('a[href="cart.php"].icon-btn');

injectBadgeEl(wishLink, 'wishBadgeAbout');
injectBadgeEl(cartLink, 'cartBadgeAbout');

function updateWishlistBadge() {
  const list = JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
  const el   = document.getElementById('wishBadgeAbout');
  if (!el) return;
  el.textContent   = list.length;
  el.style.display = list.length > 0 ? 'flex' : 'none';
}

function updateCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const el    = document.getElementById('cartBadgeAbout');
  if (!el) return;
  el.textContent = total;
  el.style.display = total > 0 ? 'flex' : 'none';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  animateStory();
  animateStats();
  animateFeatures();
  updateWishlistBadge();
  updateCartBadge();
});

// ===========================
// CHATBOT — sama seperti home.js
// ===========================

const chatbotWidget  = document.getElementById('chatbotWidget');
const chatbotToggle  = document.getElementById('chatbotToggle');
const chatbotClose   = document.getElementById('chatbotClose');
const chatbotInput   = document.getElementById('chatbotInput');
const chatbotSendBtn = document.getElementById('chatbotSend');
const chatbotMsgs    = document.getElementById('chatbotMessages');

if (chatbotToggle) {
  chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('open');
    if (chatbotWidget.classList.contains('open')) chatbotInput?.focus();
  });
}
if (chatbotClose)   chatbotClose.addEventListener('click', () => chatbotWidget.classList.remove('open'));
if (chatbotSendBtn) chatbotSendBtn.addEventListener('click', () => chatSend());
if (chatbotInput)   chatbotInput.addEventListener('keydown', e => { if (e.key === 'Enter') chatSend(); });

function chatSend(text) {
  const msg = text || chatbotInput?.value.trim();
  if (!msg) return;
  if (chatbotInput) chatbotInput.value = '';
  appendMsg(msg, 'user');
  const sugg = document.getElementById('chatbotSuggestions');
  if (sugg) sugg.style.display = 'none';
  setTimeout(() => appendMsg(chatbotReply(msg), 'bot'), 400);
}

function appendMsg(text, sender) {
  const wrap = document.createElement('div');
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
  if (q.includes('tentang') || q.includes('about') || q.includes('exclusive') || q.includes('siapa'))
    return '🏢 <strong>Exclusive</strong> didirikan 2015, marketplace terbesar di Asia Selatan dengan 10.500+ seller, 300+ brand, dan 3 juta pelanggan!';
  if (q.includes('seller') || q.includes('jual') || q.includes('daftar seller'))
    return '🏪 Ada <strong>10.500+</strong> seller aktif di Exclusive. Tertarik jadi seller? Hubungi kami di halaman Contact!';
  if (q.includes('cs') || q.includes('customer') || q.includes('bantuan') || q.includes('kontak'))
    return '🎧 <strong>Customer Service 24/7</strong><br>📧 exclusive@gmail.com<br>📞 +88015-88888-9999<br><a href="contact.php" style="color:#db4444;">→ Halaman Contact</a>';
  if (q.includes('login') || q.includes('daftar') || q.includes('akun') || q.includes('register'))
    return '👤 <a href="login.php" style="color:#db4444;">Login</a> atau <a href="register.php" style="color:#db4444;">Daftar</a> untuk pengalaman belanja lebih baik!';
  if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('hi'))
    return 'Halo! 👋 Selamat datang di halaman About Exclusive. Ada yang ingin ditanyakan?';
  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks'))
    return 'Sama-sama! 😊 Selamat berbelanja di Exclusive!';
  return 'Hmm, saya belum mengerti 🤔<br>Coba tanya: Flash Sales · Wishlist · Cart · Pengiriman · Tentang Exclusive';
}