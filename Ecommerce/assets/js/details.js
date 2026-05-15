// ===========================
// BACA id PRODUK DARI URL PARAM
// ===========================

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || null;
}

// ===========================
// CART
// ===========================

function getCart() {
  return JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('exclusive_cart', JSON.stringify(cart));
}

function addToCart(product, qty) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`🛒 "${product.name}" x${qty} ditambahkan ke cart!`);
}

function updateCartBadge() {
  const total = getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
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

function toggleWishlist(id) {
  const list = getWishlist();
  const idx  = list.indexOf(id);
  const adding = idx === -1;
  if (adding) list.push(id); else list.splice(idx, 1);
  saveWishlist(list);
  return adding;
}

// ===========================
// TOAST
// ===========================

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===========================
// RENDER PRODUCT DETAIL
// ===========================

function renderProduct(product) {
  const bn = document.getElementById('breadcrumbName');
  if (bn) bn.textContent = product.name;

  const mainImg = document.getElementById('mainImg');
  if (mainImg) mainImg.textContent = product.emoji;

  const title = document.getElementById('productName');
  if (title) title.textContent = product.name;

  const starsEl = document.getElementById('productStars');
  if (starsEl) starsEl.textContent = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);

  const reviewsEl = document.getElementById('productReviews');
  if (reviewsEl) reviewsEl.textContent = `(${product.reviews} Reviews)`;

  const priceEl = document.getElementById('productPrice');
  if (priceEl) {
    priceEl.innerHTML = `$${parseFloat(product.price).toFixed(2)}`;
    if (product.oldPrice) {
      priceEl.innerHTML += ` <span style="font-size:16px;color:#999;text-decoration:line-through;margin-left:12px;">$${parseFloat(product.oldPrice).toFixed(2)}</span>`;
    }
  }

  const descEl = document.getElementById('productDesc');
  if (descEl) descEl.textContent = product.desc || 'Produk berkualitas tinggi dari Exclusive.';

  const wishBtn = document.getElementById('wishDetailBtn');
  if (wishBtn) {
    const inWish = getWishlist().includes(product.id);
    wishBtn.classList.toggle('active', inWish);
    wishBtn.style.background = inWish ? '#db4444' : '';
    wishBtn.style.color      = inWish ? '#fff'    : '';
  }
}

// ===========================
// RENDER RELATED ITEMS
// ===========================

function renderRelated(currentId) {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;

  const related = allProducts.filter(p => p.id !== currentId).slice(0, 4);

  grid.innerHTML = related.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ''}
        <div class="product-img">${p.emoji}</div>
        <div class="product-actions">
          <button class="wish-btn" data-id="${p.id}" title="Wishlist">♥</button>
          <button class="view-btn" onclick="window.location.href='details.php?id=${p.id}'" title="View">👁</button>
        </div>
        <button class="add-cart-btn" onclick="quickAddToCart(${p.id})">Add To Cart</button>
      </div>
      <div class="product-info-card">
        <p class="product-name-card">
          <a href="details.php?id=${p.id}" style="color:inherit;">${p.name}</a>
        </p>
        <div class="product-price-wrap">
          <span class="price-new">$${parseFloat(p.price).toFixed(2)}</span>
          ${p.oldPrice ? `<span class="price-old">$${parseFloat(p.oldPrice).toFixed(2)}</span>` : ''}
        </div>
        <div class="stars-small">
          ${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}
          <span class="review-count-small">(${p.reviews})</span>
        </div>
      </div>
    </div>
  `).join('');

  syncRelatedWishBtns();
}

function syncRelatedWishBtns() {
  const list = getWishlist();
  document.querySelectorAll('.wish-btn[data-id]').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const active = list.includes(id);
    btn.style.background = active ? '#db4444' : '';
    btn.style.color      = active ? '#fff'    : '';
    btn.classList.toggle('active', active);
  });
}

function quickAddToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (p) addToCart(p, 1);
}

// ===========================
// INIT
// ===========================

document.addEventListener('DOMContentLoaded', async () => {
  await initProducts();

  const productId = getProductIdFromURL();
  const product   = (productId !== null ? allProducts.find(p => p.id === productId) : null)
                    || allProducts[0];

  if (!product) {
    const el = document.getElementById('productName');
    if (el) el.textContent = 'Produk tidak ditemukan';
    return;
  }

  renderProduct(product);
  renderRelated(product.id);
  updateCartBadge();

  const qtyInput = document.getElementById('qtyInput');

  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
  });
  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  document.getElementById('buyNowBtn')?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product, qty);
    setTimeout(() => { window.location.href = 'cart.php'; }, 800);
  });

  document.getElementById('wishDetailBtn')?.addEventListener('click', function () {
    const adding = toggleWishlist(product.id);
    this.classList.toggle('active', adding);
    this.style.background = adding ? '#db4444' : '';
    this.style.color      = adding ? '#fff'    : '';
    showToast(adding ? `❤️ "${product.name}" ditambahkan ke wishlist!` : `💔 Dihapus dari wishlist`);
  });

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.wish-btn[data-id]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const p  = allProducts.find(x => x.id === id);
    const adding = toggleWishlist(id);
    btn.style.background = adding ? '#db4444' : '';
    btn.style.color      = adding ? '#fff'    : '';
    btn.classList.toggle('active', adding);
    if (p) showToast(adding ? `❤️ "${p.name}" ke wishlist!` : `💔 Dihapus dari wishlist`);
  });

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function () {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

}); // ← penutup DOMContentLoaded

// ===========================
// CHATBOT — sama persis dengan home.js
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

  if (q.includes('flash') || q.includes('sale') || q.includes('diskon')) {
    return '🔥 <strong>Flash Sales</strong> adalah promo harga spesial dengan waktu terbatas!<br>Diskon bisa sampai <strong>-40%</strong>! <a href="home.php" style="color:#db4444;">→ Lihat Flash Sales</a>';
  }
  if (q.includes('wishlist') || q.includes('wish') || q.includes('favorit') || q.includes('simpan')) {
    return '❤️ <strong>Wishlist</strong> untuk menyimpan produk favoritmu!<br>Klik ikon ♥ di produk ini untuk menyimpan. <a href="wishlist.php" style="color:#db4444;">Lihat Wishlist</a>';
  }
  if (q.includes('cart') || q.includes('keranjang') || q.includes('beli') || q.includes('checkout')) {
    return '🛒 <strong>Cara membeli produk ini:</strong><br>1. Pilih ukuran/warna<br>2. Klik <strong>"Buy Now"</strong> atau <strong>"Add To Cart"</strong><br>3. Lanjut ke <a href="cart.php" style="color:#db4444;">Cart</a>';
  }
  if (q.includes('harga') || q.includes('promo') || q.includes('voucher') || q.includes('hemat')) {
    return '💰 <strong>Harga & Promo:</strong><br>• Flash Sales – diskon hingga 40%<br>• Summer Sale – 50% swim suits<br>• Newsletter – diskon <strong>10%</strong> pertama';
  }
  if (q.includes('ukuran') || q.includes('size') || q.includes('varian') || q.includes('warna')) {
    return '📏 <strong>Pilih ukuran/warna</strong> yang tersedia di kolom pilihan di atas. Stok terbatas!';
  }
  if (q.includes('pengiriman') || q.includes('delivery') || q.includes('ongkir') || q.includes('kirim')) {
    return '🚚 <strong>Info Pengiriman:</strong><br>• Gratis untuk order di atas $140<br>• Estimasi 2–5 hari kerja<br>• Return gratis 30 hari';
  }
  if (q.includes('garansi') || q.includes('return') || q.includes('refund') || q.includes('money back')) {
    return '✅ <strong>Money Back Guarantee</strong><br>Pengembalian uang dalam <strong>30 hari</strong> jika produk tidak sesuai.';
  }
  if (q.includes('cs') || q.includes('customer') || q.includes('bantuan') || q.includes('support') || q.includes('kontak')) {
    return '🎧 <strong>Customer Service 24/7</strong><br>📧 exclusive@gmail.com<br>📞 +88015-88888-9999';
  }
  if (q.includes('ulasan') || q.includes('review') || q.includes('rating') || q.includes('bintang')) {
    return '⭐ Rating dan jumlah ulasan ditampilkan di bawah nama produk. Semakin banyak bintang, semakin terpercaya!';
  }
  if (q.includes('daftar') || q.includes('register') || q.includes('login') || q.includes('akun') || q.includes('sign')) {
    return '👤 <strong>Akun Exclusive:</strong><br>• Belum punya akun? <a href="register.php" style="color:#db4444;">Daftar sekarang</a><br>• Sudah punya? <a href="login.php" style="color:#db4444;">Login di sini</a>';
  }
  if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Halo! 👋 Tertarik dengan produk ini? Saya siap membantu!';
  }
  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks') || q.includes('thank')) {
    return 'Sama-sama! 😊 Selamat berbelanja di Exclusive!';
  }

  return 'Hmm, saya belum mengerti pertanyaan itu 🤔<br>Coba tanyakan tentang:<br>• 🛒 Cara Beli · 💰 Promo · 🚚 Pengiriman · ⭐ Ulasan · ❤️ Wishlist';
}