// ===========================
// DATA PRODUK
// ✅ FIX: DIHAPUS seluruh array allProducts hardcode (17 item)
//         allProducts sudah tersedia global dari produk.js via initProducts()
//         Pastikan produk.js di-load SEBELUM wishlist.js di HTML
// ===========================

// ===========================
// WISHLIST (localStorage key: 'exclusive_wishlist')
// ===========================

function getWishlist() {
  return JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
}

function saveWishlist(ids) {
  localStorage.setItem('exclusive_wishlist', JSON.stringify(ids));
}

function removeFromWishlist(id) {
  saveWishlist(getWishlist().filter(i => i !== id));
}

function addToWishlist(id) {
  const list = getWishlist();
  if (!list.includes(id)) { list.push(id); saveWishlist(list); }
}

// ===========================
// CART (localStorage key: 'exclusive_cart')
// ===========================

function getCart() {
  return JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('exclusive_cart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast('"' + product.name + '" ditambahkan ke cart!');
}

function updateCartCount() {
  const total = getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

// ===========================
// RENDER WISHLIST GRID
// ===========================

function renderWishlist() {
  const wishlistIds = getWishlist();
  const grid        = document.getElementById('wishlistGrid');
  const emptyState  = document.getElementById('emptyState');
  const countEl     = document.getElementById('wishlistCount');
  const wishCountEl = document.getElementById('wishCount');

  if (!grid) return;

  // ✅ FIX: allProducts dari produk.js (sudah diisi initProducts())
  const items = allProducts.filter(p => wishlistIds.includes(p.id));

  if (countEl)     countEl.textContent     = items.length;
  if (wishCountEl) wishCountEl.textContent = items.length;

  if (items.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = items.map(p => `
    <div class="product-card" id="wcard-${p.id}">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ''}
        <div class="product-img">${p.emoji}</div>
        <button class="wishlist-btn wishlist-btn--active"
                onclick="handleDelete(${p.id})"
                title="Hapus dari Wishlist"
                style="position:absolute;top:8px;right:8px;background:#fff;border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:18px;line-height:32px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.15);">
          &#9829;
        </button>
        <a class="view-btn" href="details.php?id=${p.id}" title="Lihat Detail">&#128065;</a>
        <button class="add-cart-btn" onclick="handleAddToCart(${p.id})">Add To Cart</button>
      </div>
      <div class="product-info">
        <a href="details.php?id=${p.id}">
          <p class="product-name">${p.name}</p>
        </a>
        <div class="product-price">
          <span class="price-new">$${p.price}</span>
          ${p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : ''}
        </div>
        <div class="stars">
          ${'&#9733;'.repeat(p.stars)}${'&#9734;'.repeat(5 - p.stars)}
          <span class="review-count">(${p.reviews})</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===========================
// RENDER JUST FOR YOU
// ===========================

function renderJFY() {
  const wishlistIds = getWishlist();
  const grid = document.getElementById('jfyGrid');
  if (!grid) return;

  // ✅ FIX: allProducts dari produk.js
  const suggestions = allProducts.filter(p => !wishlistIds.includes(p.id)).slice(0, 4);

  grid.innerHTML = suggestions.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ''}
        <div class="product-img">${p.emoji}</div>
        <a class="view-btn" href="details.php?id=${p.id}" title="Lihat Detail">&#128065;</a>
        <button class="wishlist-btn"
                onclick="handleJFYWishlist(${p.id}, this)"
                style="position:absolute;bottom:8px;left:0;right:0;width:100%;background:#fff;border:none;border-top:1px solid #f0f0f0;padding:8px 0;cursor:pointer;font-size:14px;">
          &#9825; Add To Wishlist
        </button>
      </div>
      <div class="product-info">
        <a href="details.php?id=${p.id}">
          <p class="product-name">${p.name}</p>
        </a>
        <div class="product-price">
          <span class="price-new">$${p.price}</span>
          ${p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : ''}
        </div>
        <div class="stars">
          ${'&#9733;'.repeat(p.stars)}${'&#9734;'.repeat(5 - p.stars)}
          <span class="review-count">(${p.reviews})</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===========================
// HANDLERS
// ===========================

function handleDelete(id) {
  const product = allProducts.find(p => p.id === id);
  removeFromWishlist(id);
  const card = document.getElementById('wcard-' + id);
  if (card) {
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity    = '0';
    card.style.transform  = 'scale(0.9)';
    setTimeout(() => { renderWishlist(); renderJFY(); }, 300);
  }
  if (product) showToast('"' + product.name + '" dihapus dari wishlist');
}

function handleAddToCart(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  addToCart(product);
  removeFromWishlist(id);
  setTimeout(() => { renderWishlist(); renderJFY(); }, 300);
}

function handleJFYWishlist(id, btn) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  addToWishlist(id);
  if (btn) {
    btn.innerHTML        = '&#9829; Added!';
    btn.style.background = '#db4444';
    btn.style.color      = '#fff';
    btn.style.opacity    = '1';
  }
  showToast('"' + product.name + '" ditambahkan ke wishlist!');
  setTimeout(() => { renderWishlist(); renderJFY(); }, 800);
}

// ===========================
// MOVE ALL TO BAG
// ===========================

document.addEventListener('DOMContentLoaded', async () => {
  await initProducts();

  const moveAllBtn = document.getElementById('moveAllBtn');
  if (moveAllBtn) {
    moveAllBtn.addEventListener('click', () => {
      const ids = getWishlist();
      if (ids.length === 0) { showToast('Wishlist kosong!'); return; }
      ids.forEach(id => {
        const p = allProducts.find(x => x.id === id);
        if (p) addToCart(p);
      });
      saveWishlist([]);
      showToast('Semua ' + ids.length + ' item dipindah ke cart!');
      setTimeout(() => { renderWishlist(); renderJFY(); }, 400);
    });
  }

  renderWishlist();
  renderJFY();
  updateCartCount();
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

// ===========================
// SEARCH BAR
// ===========================

const searchBtn   = document.querySelector('.search-btn');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (q) alert('Searching: "' + q + '"');
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchBtn.click();
  });
}