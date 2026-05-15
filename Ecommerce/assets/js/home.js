// ===========================
// SHARED PRODUCT DATA
// produk.js di-load duluan → PRODUCTS & allProducts sudah global
// ===========================

const CONTROLLER = '/ProjekAkhir/Ecommerce/controllers/ProductController.php';



// ===========================
// HERO BANNER SLIDER
// ===========================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 4000); }
function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
});

if (slides.length) startAutoSlide();

// ===========================
// COUNTDOWN TIMER (Flash Sales)
// ===========================

function getEndTime() {
  const stored = localStorage.getItem('flashSaleEnd');
  if (stored) {
    const end = parseInt(stored);
    if (end > Date.now()) return end;
  }
  const newEnd = Date.now() + (3 * 86400000) + (23 * 3600000) + (19 * 60000) + (56 * 1000);
  localStorage.setItem('flashSaleEnd', newEnd.toString());
  return newEnd;
}

const flashEndTime = getEndTime();

function updateCountdown() {
  const diff = Math.max(0, flashEndTime - Date.now());
  const pad = n => String(n).padStart(2, '0');
  const elD = document.getElementById('days');
  const elH = document.getElementById('hours');
  const elM = document.getElementById('minutes');
  const elS = document.getElementById('seconds');
  if (elD) elD.textContent = pad(Math.floor(diff / 86400000));
  if (elH) elH.textContent = pad(Math.floor((diff % 86400000) / 3600000));
  if (elM) elM.textContent = pad(Math.floor((diff % 3600000) / 60000));
  if (elS) elS.textContent = pad(Math.floor((diff % 60000) / 1000));
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===========================
// MUSIC BANNER COUNTDOWN
// ===========================

function getMusicEndTime() {
  const stored = localStorage.getItem('musicSaleEnd');
  if (stored) {
    const end = parseInt(stored);
    if (end > Date.now()) return end; // belum habis, pakai yang lama
  }
  // Habis atau belum ada → reset ulang 5 hari
  const end = Date.now() + (5 * 86400000) + (22 * 3600000) + (59 * 60000) + (35 * 1000);
  localStorage.setItem('musicSaleEnd', end.toString());
  return end;
}

// musicEndTime diambil dinamis tiap tick

function updateMusicCountdown() {
  const endTime = getMusicEndTime();
  const diff = endTime - Date.now();
  if (diff <= 0) { localStorage.removeItem('musicSaleEnd'); return; }
  const pad = n => String(n).padStart(2, '0');
  const elH = document.getElementById('mHours');
  const elD = document.getElementById('mDays');
  const elM = document.getElementById('mMinutes');
  const elS = document.getElementById('mSeconds');
  if (elH) elH.textContent = pad(Math.floor(diff / 3600000) % 24);
  if (elD) elD.textContent = pad(Math.floor(diff / 86400000));
  if (elM) elM.textContent = pad(Math.floor((diff % 3600000) / 60000));
  if (elS) elS.textContent = pad(Math.floor((diff % 60000) / 1000));
}

setInterval(updateMusicCountdown, 1000);
updateMusicCountdown();

// ===========================
// CART — format {id, name, price, qty}
// ===========================

function getCart() {
  return JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('exclusive_cart', JSON.stringify(cart));
}

// Dipanggil dari onclick di HTML: addToCart(productId)
// PRODUCTS sudah diisi oleh initProducts() dari produk.js
function addToCart(productId) {
  if (Object.keys(PRODUCTS).length === 0) {
    showToast('Tunggu sebentar, memuat produk...');
    setTimeout(() => addToCart(productId), 500);
    return;
  }

  const product = PRODUCTS[productId];
  if (!product) return;

  const cart     = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart(cart);

  const total   = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = total;

  showToast(`✓ "${product.name}" added to cart — $${product.price}`);
}

// ===========================
// TOAST
// ===========================

function showToast(message) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===========================
// SEARCH BAR
// ===========================

const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (q) alert(`Searching for: "${q}"`);
  });
}
if (searchInput) {
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchBtn?.click();
  });
}

// ===========================
// SCROLL TO TOP
// ===========================

const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===========================
// CATEGORY CARDS TOGGLE
// ===========================

document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// ===========================
// FLASH SALES SLIDER ARROWS
// ===========================

const flashSlider = document.getElementById('flashSlider');
const flashPrev   = document.getElementById('flashPrev');
const flashNext   = document.getElementById('flashNext');

if (flashPrev && flashSlider) flashPrev.addEventListener('click', () => flashSlider.scrollBy({ left: -260, behavior: 'smooth' }));
if (flashNext && flashSlider) flashNext.addEventListener('click', () => flashSlider.scrollBy({ left: 260,  behavior: 'smooth' }));

// ===========================
// FOOTER EMAIL SUBSCRIBE
// ===========================

function subscribeEmail() {
  const emailInput = document.getElementById('footerEmail');
  if (!emailInput) return;
  const email = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.style.borderBottom = '2px solid #db4444';
    emailInput.placeholder = 'Enter a valid email!';
    setTimeout(() => { emailInput.style.borderBottom = ''; emailInput.placeholder = 'Enter your email'; }, 2500);
    return;
  }
  showToast(`🎉 Subscribed! Check ${email} for 10% off!`);
  emailInput.value = '';
}

// ===========================
// WISHLIST
// ===========================
function getWishlist() {
  return JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
}

function saveWishlist(list) {
  localStorage.setItem('exclusive_wishlist', JSON.stringify(list));
}

function syncWishlistButtons() {
  const list = getWishlist();
  document.querySelectorAll('.wish-btn').forEach(btn => {
    const id     = parseInt(btn.dataset.id);
    const active = list.includes(id);
    btn.classList.toggle('active', active);
    btn.style.background = active ? '#db4444' : '';
    btn.style.color      = active ? '#fff'    : '';
  });
}

document.addEventListener('click', function(e) {
  const btn = e.target.closest('.wish-btn');
  if (!btn) return;
  const id     = parseInt(btn.dataset.id);
  const list   = getWishlist();
  const idx    = list.indexOf(id);
  const adding = idx === -1;
  if (adding) list.push(id); else list.splice(idx, 1);
  saveWishlist(list);
  btn.classList.toggle('active', adding);
  btn.style.background = adding ? '#db4444' : '';
  btn.style.color      = adding ? '#fff'    : '';
  updateWishlistBadge(); // ← update badge navbar
  showToast(adding ? '❤️ Added to wishlist!' : '💔 Removed from wishlist');
});

// ===========================
// NEW ARRIVAL CARD HOVER
// ===========================
document.querySelectorAll('.arrival-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.filter = 'brightness(1.1)'; });
  card.addEventListener('mouseleave', () => { card.style.filter = ''; });
});

// ===========================
// UPDATE BADGE NAVBAR
// ===========================
function updateWishlistBadge() {
  const count = getWishlist().length;
  const el    = document.getElementById('wishCount');
  if (!el) return;
  el.textContent    = count;
  el.style.display  = count > 0 ? 'flex' : 'none';
}

function updateCartBadge() {
  const total = getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
  const el    = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
  await initProducts();
  renderAllSections();
  updateCartBadge();
  updateWishlistBadge();
  syncWishlistButtons();
});
// ===========================
// RENDER PRODUK KE HOME
// ===========================

function renderProductCard(p) {
  return `
    <div class="product-card">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ''}
        <div class="product-img">${p.emoji}</div>
        <div class="product-actions">
          <button class="wish-btn" data-id="${p.id}" title="Wishlist">♥</button>
          <a class="view-icon-btn" href="details.php?id=${p.id}" title="View">👁</a>
        </div>
        <button class="add-cart-btn" onclick="addToCart(${p.id})">Add To Cart</button>
      </div>
      <div class="product-info-card">
        <p class="product-name-card">
          <a href="details.php?id=${p.id}" style="color:inherit;text-decoration:none;">${p.name}</a>
        </p>
        <div class="product-price-wrap">
          <span class="price-new">$${p.price}</span>
          ${p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : ''}
        </div>
        <div class="stars-small">
          ${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}
          <span class="review-count-small">(${p.reviews})</span>
        </div>
      </div>
    </div>
  `;
}

function renderAllSections() {
  const flashSlider  = document.getElementById('flashSlider');
  const bestsellGrid = document.getElementById('bestsellGrid');
  const exploreGrid  = document.getElementById('exploreGrid');

  const flash    = allProducts.filter(p => p.section === 'flash');
  const bestsell = allProducts.filter(p => p.section === 'bestsell');
  const explore  = allProducts.filter(p => p.section === 'explore');

  if (flashSlider  && flash.length)    flashSlider.innerHTML    = flash.map(renderProductCard).join('');
  if (bestsellGrid && bestsell.length) bestsellGrid.innerHTML   = bestsell.map(renderProductCard).join('');
  if (exploreGrid  && explore.length)  exploreGrid.innerHTML    = explore.map(renderProductCard).join('');

  syncWishlistButtons();
}
// ===========================
// CHATBOT
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
  // hide suggestions after first message
  const sugg = document.getElementById('chatbotSuggestions');
  if (sugg) sugg.style.display = 'none';
  setTimeout(() => {
    appendMsg(chatbotReply(msg), 'bot');
  }, 400);
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

  // Flash Sales
  if (q.includes('flash') || q.includes('sale') || q.includes('diskon')) {
    return '🔥 <strong>Flash Sales</strong> adalah promo harga spesial dengan waktu terbatas!<br>Produk flash sales ada di bagian <em>Today\'s Flash Sales</em> di halaman utama. Diskon bisa sampai <strong>-40%</strong>! Timer countdown menunjukkan sisa waktu promo. <a href="#section-flash" style="color:#db4444;">→ Lihat Flash Sales</a>';
  }

  // Wishlist
  if (q.includes('wishlist') || q.includes('wish') || q.includes('favorit') || q.includes('simpan')) {
    return '❤️ <strong>Wishlist</strong> berfungsi untuk menyimpan produk favoritmu!<br>Klik ikon ♥ di setiap produk untuk menambahkan. Lihat semua wishlist-mu di halaman <a href="wishlist.php" style="color:#db4444;">Wishlist</a>. Jumlah produk ditampilkan di ikon hati navbar atas.';
  }

  // Cart
  if (q.includes('cart') || q.includes('keranjang') || q.includes('beli') || q.includes('checkout')) {
    return '🛒 <strong>Cara membeli produk:</strong><br>1. Pilih produk yang diinginkan<br>2. Klik tombol <strong>"Add To Cart"</strong><br>3. Buka <a href="cart.php" style="color:#db4444;">Cart</a> di navbar atas<br>4. Lakukan checkout';
  }

  // Promo / voucher
  if (q.includes('promo') || q.includes('voucher') || q.includes('diskon') || q.includes('off') || q.includes('hemat')) {
    return '🏷️ <strong>Promo yang tersedia:</strong><br>• <strong>Summer Sale</strong> – Diskon 50% untuk semua swim suits + free express delivery<br>• <strong>Flash Sales</strong> – Diskon hingga 40%<br>• <strong>Newsletter</strong> – Daftar email di footer untuk dapat diskon <strong>10% pertama</strong>!';
  }

  // Pengiriman
  if (q.includes('kirim') || q.includes('delivery') || q.includes('ongkir') || q.includes('pengiriman')) {
    return '🚚 <strong>Info Pengiriman:</strong><br>• Gratis pengiriman untuk order di atas <strong>$140</strong><br>• Summer Sale: <strong>Free Express Delivery</strong> untuk semua swim suits<br>• Estimasi pengiriman tergantung lokasi';
  }

  // Garansi / return
  if (q.includes('garansi') || q.includes('return') || q.includes('refund') || q.includes('uang kembali') || q.includes('money back')) {
    return '✅ <strong>Money Back Guarantee</strong><br>Kami menjamin pengembalian uang dalam <strong>30 hari</strong> jika produk tidak sesuai. Hubungi customer service untuk proses refund.';
  }

  // Customer service
  if (q.includes('cs') || q.includes('customer') || q.includes('bantuan') || q.includes('support') || q.includes('kontak')) {
    return '🎧 <strong>Customer Service 24/7</strong><br>Kami siap membantu kapan saja!<br>📧 exclusive@gmail.com<br>📞 +88015-88888-9999<br>Atau scroll ke bagian <a href="#section-features" style="color:#db4444;">Contact</a> di halaman ini.';
  }

  // New Arrival
  if (q.includes('new') || q.includes('baru') || q.includes('arrival') || q.includes('terbaru')) {
    return '✨ <strong>New Arrival</strong> tersedia di halaman utama!<br>Produk terbaru meliputi:<br>• 🎮 PlayStation 5<br>• 👗 Women\'s Collections<br>• 🔊 Speakers<br>• 🧴 Perfume Gucci<br><a href="#section-arrival" style="color:#db4444;">→ Lihat New Arrival</a>';
  }

  // Kategori produk
  if (q.includes('kategori') || q.includes('produk') || q.includes('apa saja') || q.includes('jual')) {
    return '🛍️ <strong>Kategori produk di Exclusive:</strong><br>• 👗 Woman\'s & Men\'s Fashion<br>• 💻 Electronics & Gaming<br>• 🏠 Home & Lifestyle<br>• 💊 Medicine<br>• ⚽ Sports & Outdoor<br>• 🧸 Baby\'s & Toys<br>• 🛒 Groceries & Pets<br>• 💄 Health & Beauty';
  }

  // Register / login / akun
  if (q.includes('daftar') || q.includes('register') || q.includes('login') || q.includes('akun') || q.includes('sign')) {
    return '👤 <strong>Akun Exclusive:</strong><br>• Belum punya akun? <a href="register.php" style="color:#db4444;">Daftar sekarang</a><br>• Sudah punya akun? <a href="login.php" style="color:#db4444;">Login di sini</a><br>• Kelola akun di ikon 👤 navbar kanan atas';
  }

  // App download
  if (q.includes('app') || q.includes('aplikasi') || q.includes('download') || q.includes('mobile')) {
    return '📱 <strong>Download Aplikasi Exclusive</strong><br>Hemat $3 untuk pengguna baru!<br>Tersedia di:<br>• Google Play<br>• App Store<br>Scan QR code di footer halaman ini.';
  }

  // Halo / sapaan
  if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Halo! 👋 Selamat datang di <strong>Exclusive</strong>! Saya siap membantu kamu belanja. Mau tanya soal apa?';
  }

  // Terima kasih
  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks') || q.includes('thank')) {
    return 'Sama-sama! 😊 Senang bisa membantu. Ada lagi yang ingin ditanyakan?';
  }

  // Default
  return 'Hmm, saya belum mengerti pertanyaan itu 🤔<br>Coba tanyakan tentang:<br>• 🔥 Flash Sales<br>• ❤️ Wishlist<br>• 🛒 Cart & Checkout<br>• 🚚 Pengiriman<br>• 🎧 Customer Service';
}