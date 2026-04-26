// ===========================
// DATA PRODUK — SAMA PERSIS home.js, wishlist.js, cart.js
// ===========================

const allProducts = [
  { id: 1,  name: 'HAVIT HV-G92 Gamepad',    emoji: '🎮', price: 120,  oldPrice: 160,  badge: '-40%', badgeType: 'red',   stars: 5, reviews: 88,  desc: 'High quality gaming gamepad with dual vibration motors, ergonomic design, and plug-and-play USB connection for PC and console.' },
  { id: 2,  name: 'AK-900 Wired Keyboard',    emoji: '⌨️', price: 960,  oldPrice: 1160, badge: '-35%', badgeType: 'red',   stars: 5, reviews: 75,  desc: 'Mechanical wired keyboard with RGB backlight, anti-ghosting keys, and durable aluminum frame for professional gaming.' },
  { id: 3,  name: 'IPS LCD Gaming Monitor',   emoji: '🖥️', price: 370,  oldPrice: 400,  badge: '-30%', badgeType: 'red',   stars: 5, reviews: 99,  desc: 'IPS LCD gaming monitor with 144Hz refresh rate, 1ms response time, and Full HD resolution for ultra-smooth gameplay.' },
  { id: 4,  name: 'S-Series Comfort Chair',   emoji: '🪑', price: 375,  oldPrice: 400,  badge: '-25%', badgeType: 'red',   stars: 4, reviews: 99,  desc: 'Ergonomic comfort chair with lumbar support, adjustable armrests, and breathable mesh back for all-day sitting.' },
  { id: 5,  name: 'S-Series Gaming Laptop',   emoji: '💻', price: 699,  oldPrice: 900,  badge: '-20%', badgeType: 'red',   stars: 5, reviews: 77,  desc: 'Powerful gaming laptop with Intel Core i7, 16GB RAM, NVIDIA RTX GPU, and 144Hz display for immersive gaming.' },
  { id: 6,  name: 'The north coat',           emoji: '🧥', price: 23,   oldPrice: 260,  badge: null,   badgeType: '',      stars: 5, reviews: 65,  desc: 'Warm and stylish north coat with waterproof outer shell, perfect for cold weather and outdoor adventures.' },
  { id: 7,  name: 'Gucci duffle bag',         emoji: '👜', price: 960,  oldPrice: 1160, badge: null,   badgeType: '',      stars: 5, reviews: 65,  desc: 'Authentic Gucci duffle bag crafted from premium canvas with leather trim. Spacious interior with multiple compartments.' },
  { id: 8,  name: 'RGB liquid CPU Cooler',    emoji: '🖥️', price: 160,  oldPrice: 170,  badge: null,   badgeType: '',      stars: 5, reviews: 65,  desc: 'High-performance RGB liquid CPU cooler with 240mm radiator, quiet pump, and vibrant addressable RGB lighting.' },
  { id: 9,  name: 'Small BookSelf',           emoji: '📚', price: 360,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 65,  desc: 'Compact bookshelf made from solid wood with 3 tiers, perfect for home office, living room, or bedroom.' },
  { id: 10, name: 'Breed Dry Dog Food',       emoji: '🐶', price: 100,  oldPrice: null, badge: null,   badgeType: '',      stars: 3, reviews: 35,  desc: 'Premium dry dog food with balanced nutrition, high protein content, and natural ingredients for healthy pets.' },
  { id: 11, name: 'CANON EOS DSLR Camera',    emoji: '📷', price: 360,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 95,  desc: 'Canon EOS DSLR camera with 24.1MP sensor, DIGIC 8 processor, and built-in Wi-Fi for professional photography.' },
  { id: 12, name: 'ASUS FHD Gaming Laptop',   emoji: '💻', price: 700,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 325, desc: 'ASUS gaming laptop with Full HD display, AMD Ryzen processor, dedicated GPU, and long battery life.' },
  { id: 13, name: 'Curology Product Set',     emoji: '🧴', price: 500,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 145, desc: 'Complete skincare set with cleanser, moisturizer, and SPF formula. Dermatologist-tested for all skin types.' },
  { id: 14, name: 'Kids Electric Car',        emoji: '🚗', price: 960,  oldPrice: 1160, badge: 'NEW',  badgeType: 'green', stars: 5, reviews: 65,  desc: 'Rechargeable electric ride-on car for kids with realistic sounds, working headlights, and parental remote control.' },
  { id: 15, name: 'Jr. Zoom Soccer Cleats',   emoji: '👟', price: 1160, oldPrice: 1600, badge: 'NEW',  badgeType: 'green', stars: 5, reviews: 35,  desc: 'Junior soccer cleats with lightweight synthetic upper, firm ground studs, and cushioned insole for young players.' },
  { id: 16, name: 'GP11 Shooter USB Gamepad', emoji: '🎮', price: 660,  oldPrice: 1160, badge: 'NEW',  badgeType: 'green', stars: 5, reviews: 55,  desc: 'GP11 USB gamepad with precision analog sticks, programmable buttons, and vibration feedback for competitive gaming.' },
  { id: 17, name: 'Quilted Satin Jacket',     emoji: '🧥', price: 660,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 55,  desc: 'Luxurious quilted satin jacket with smooth lining, front zipper closure, and elegant finish for casual wear.' },
];

// ===========================
// BACA id PRODUK DARI URL PARAM
// Contoh URL: details.php?id=1
// ===========================

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 1; // default id=1 jika tidak ada
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
// RENDER PRODUCT DETAIL
// ===========================

function renderProduct(product) {
  // Breadcrumb
  const bn = document.getElementById('breadcrumbName');
  if (bn) bn.textContent = product.name;

  // Image
  const mainImg = document.getElementById('mainImg');
  if (mainImg) mainImg.textContent = product.emoji;

  // Title
  const title = document.getElementById('productName');
  if (title) title.textContent = product.name;

  // Stars
  const starsEl = document.getElementById('productStars');
  if (starsEl) starsEl.textContent = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);

  // Reviews
  const reviewsEl = document.getElementById('productReviews');
  if (reviewsEl) reviewsEl.textContent = `(${product.reviews} Reviews)`;

  // Price
  const priceEl = document.getElementById('productPrice');
  if (priceEl) {
    priceEl.innerHTML = `$${product.price}`;
    if (product.oldPrice) {
      priceEl.innerHTML += ` <span style="font-size:16px;color:#999;text-decoration:line-through;margin-left:12px;">$${product.oldPrice}</span>`;
    }
  }

  // Desc
  const descEl = document.getElementById('productDesc');
  if (descEl) descEl.textContent = product.desc;

  // Wishlist button state
  const wishBtn = document.getElementById('wishDetailBtn');
  if (wishBtn) {
    const inWish = getWishlist().includes(product.id);
    wishBtn.classList.toggle('active', inWish);
  }
}

// ===========================
// RENDER RELATED ITEMS
// (tampilkan 4 produk selain produk saat ini)
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
          <span class="price-new">$${p.price}</span>
          ${p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : ''}
        </div>
        <div class="stars-small">
          ${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}
          <span class="review-count-small">(${p.reviews})</span>
        </div>
      </div>
    </div>
  `).join('');

  // Wishlist buttons di related
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

document.addEventListener('DOMContentLoaded', () => {
  const productId = getProductIdFromURL();
  const product   = allProducts.find(p => p.id === productId) || allProducts[0];

  renderProduct(product);
  renderRelated(product.id);
  updateCartBadge();

  // QTY buttons
  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    const val = Math.max(1, parseInt(qtyInput.value) - 1);
    qtyInput.value = val;
  });
  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  // Buy Now → Add to cart then go to cart
  document.getElementById('buyNowBtn')?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product, qty);
    setTimeout(() => { window.location.href = 'cart.php'; }, 800);
  });

  // Wishlist detail button
  document.getElementById('wishDetailBtn')?.addEventListener('click', function () {
    const adding = toggleWishlist(product.id);
    this.classList.toggle('active', adding);
    showToast(adding ? `❤️ "${product.name}" ditambahkan ke wishlist!` : `💔 Dihapus dari wishlist`);
  });

  // Color dots
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function () {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Size buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Related wishlist buttons
  document.addEventListener('click', function (e) {
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

  // Search
  const searchBtn   = document.querySelector('.search-btn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => { const q = searchInput.value.trim(); if (q) alert(`Searching: "${q}"`); });
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') searchBtn.click(); });
  }
});

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