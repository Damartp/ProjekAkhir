// ===========================
// BACA id PRODUK DARI URL PARAM
// Contoh URL: details.php?id=1
// ===========================

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 1;
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
    priceEl.innerHTML = `$${product.price}`;
    if (product.oldPrice) {
      priceEl.innerHTML += ` <span style="font-size:16px;color:#999;text-decoration:line-through;margin-left:12px;">$${product.oldPrice}</span>`;
    }
  }

  const descEl = document.getElementById('productDesc');
  if (descEl) descEl.textContent = product.desc;

  const wishBtn = document.getElementById('wishDetailBtn');
  if (wishBtn) {
    const inWish = getWishlist().includes(product.id);
    wishBtn.classList.toggle('active', inWish);
  }
}

// ===========================
// RENDER RELATED ITEMS
// ===========================

function renderRelated(currentId) {
  const grid = document.getElementById('relatedGrid');
  if (!grid) return;

  // ✅ FIX: allProducts sudah terisi dari initProducts() di produk.js
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

document.addEventListener('DOMContentLoaded', async () => {  // ✅ FIX: tambah keyword 'async'
  await initProducts();                                       // ✅ FIX: await bisa dipakai karena callback sudah async
  const productId = getProductIdFromURL();
  const product   = allProducts.find(p => p.id === productId) || allProducts[0];

  renderProduct(product);
  renderRelated(product.id);
  updateCartBadge();

  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    const val = Math.max(1, parseInt(qtyInput.value) - 1);
    qtyInput.value = val;
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
    showToast(adding ? `❤️ "${product.name}" ditambahkan ke wishlist!` : `💔 Dihapus dari wishlist`);
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

  document.addEventListener('DOMContentLoaded', async () => {
  await initProducts();

  const productId = getProductIdFromURL();
  const product   = allProducts.find(p => p.id === productId);

  // Kalau produk tidak ketemu, tampilkan pesan
  if (!product) {
    document.getElementById('productName').textContent = 'Produk tidak ditemukan';
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
    const list   = JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
    const idx    = list.indexOf(product.id);
    const adding = idx === -1;
    if (adding) list.push(product.id); else list.splice(idx, 1);
    localStorage.setItem('exclusive_wishlist', JSON.stringify(list));
    this.classList.toggle('active', adding);
    showToast(adding ? `❤️ "${product.name}" ke wishlist!` : `💔 Dihapus dari wishlist`);
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

  // Wishlist di related items
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.wish-btn[data-id]');
    if (!btn) return;
    const id   = parseInt(btn.dataset.id);
    const p    = allProducts.find(x => x.id === id);
    const list = JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
    const idx  = list.indexOf(id);
    const adding = idx === -1;
    if (adding) list.push(id); else list.splice(idx, 1);
    localStorage.setItem('exclusive_wishlist', JSON.stringify(list));
    btn.style.background = adding ? '#db4444' : '';
    btn.style.color      = adding ? '#fff'    : '';
    btn.classList.toggle('active', adding);
    if (p) showToast(adding ? `❤️ "${p.name}" ke wishlist!` : `💔 Dihapus dari wishlist`);
  });

  const searchBtn   = document.querySelector('.search-btn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) alert(`Searching: "${q}"`);
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }
});

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