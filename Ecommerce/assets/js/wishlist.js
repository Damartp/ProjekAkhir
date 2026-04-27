// ===========================
// DATA PRODUK — SAMA PERSIS DENGAN home.js & details.js & cart.js
// ===========================

const allProducts = [
  { id: 1,  name: 'HAVIT HV-G92 Gamepad',    emoji: '🎮', price: 120,  oldPrice: 160,  badge: '-40%', badgeType: 'red',   stars: 5, reviews: 88  },
  { id: 2,  name: 'AK-900 Wired Keyboard',    emoji: '⌨️', price: 960,  oldPrice: 1160, badge: '-35%', badgeType: 'red',   stars: 5, reviews: 75  },
  { id: 3,  name: 'IPS LCD Gaming Monitor',   emoji: '🖥️', price: 370,  oldPrice: 400,  badge: '-30%', badgeType: 'red',   stars: 5, reviews: 99  },
  { id: 4,  name: 'S-Series Comfort Chair',   emoji: '🪑', price: 375,  oldPrice: 400,  badge: '-25%', badgeType: 'red',   stars: 4, reviews: 99  },
  { id: 5,  name: 'S-Series Gaming Laptop',   emoji: '💻', price: 699,  oldPrice: 900,  badge: '-20%', badgeType: 'red',   stars: 5, reviews: 77  },
  { id: 6,  name: 'The north coat',           emoji: '🧥', price: 23,   oldPrice: 260,  badge: null,   badgeType: '',      stars: 5, reviews: 65  },
  { id: 7,  name: 'Gucci duffle bag',         emoji: '👜', price: 960,  oldPrice: 1160, badge: null,   badgeType: '',      stars: 5, reviews: 65  },
  { id: 8,  name: 'RGB liquid CPU Cooler',    emoji: '🖥️', price: 160,  oldPrice: 170,  badge: null,   badgeType: '',      stars: 5, reviews: 65  },
  { id: 9,  name: 'Small BookSelf',           emoji: '📚', price: 360,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 65  },
  { id: 10, name: 'Breed Dry Dog Food',       emoji: '🐶', price: 100,  oldPrice: null, badge: null,   badgeType: '',      stars: 3, reviews: 35  },
  { id: 11, name: 'CANON EOS DSLR Camera',    emoji: '📷', price: 360,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 95  },
  { id: 12, name: 'ASUS FHD Gaming Laptop',   emoji: '💻', price: 700,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 325 },
  { id: 13, name: 'Curology Product Set',     emoji: '🧴', price: 500,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 145 },
  { id: 14, name: 'Kids Electric Car',        emoji: '🚗', price: 960,  oldPrice: 1160, badge: 'NEW',  badgeType: 'green', stars: 5, reviews: 65  },
  { id: 15, name: 'Jr. Zoom Soccer Cleats',   emoji: '👟', price: 1160, oldPrice: 1600, badge: 'NEW',  badgeType: 'green', stars: 5, reviews: 35  },
  { id: 16, name: 'GP11 Shooter USB Gamepad', emoji: '🎮', price: 660,  oldPrice: 1160, badge: 'NEW',  badgeType: 'green', stars: 5, reviews: 55  },
  { id: 17, name: 'Quilted Satin Jacket',     emoji: '🧥', price: 660,  oldPrice: null, badge: null,   badgeType: '',      stars: 5, reviews: 55  },
];

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
// Format: [{id, name, price, qty}]
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
  showToast(`🛒 "${product.name}" ditambahkan ke cart!`);
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
        <button class="delete-btn" onclick="handleDelete(${p.id})" title="Hapus">✕</button>
        <a class="view-btn" href="details.php?id=${p.id}" title="Lihat Detail">👁</a>
        <button class="add-cart-btn" onclick="handleAddToCart(${p.id})">🛒 Add To Cart</button>
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
          ${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}
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

  const suggestions = allProducts.filter(p => !wishlistIds.includes(p.id)).slice(0, 4);

  grid.innerHTML = suggestions.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ''}
        <div class="product-img">${p.emoji}</div>
        <a class="view-btn" href="details.php?id=${p.id}" title="Lihat Detail">👁</a>
        <button class="add-cart-btn" onclick="handleJFYWishlist(${p.id}, this)">♡ Add To Wishlist</button>
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
          ${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}
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
  const card = document.getElementById(`wcard-${id}`);
  if (card) {
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity    = '0';
    card.style.transform  = 'scale(0.9)';
    setTimeout(() => { renderWishlist(); renderJFY(); }, 300);
  }
  if (product) showToast(`❌ "${product.name}" dihapus dari wishlist`);
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
    btn.textContent        = '♥ Added!';
    btn.style.background   = '#db4444';
    btn.style.color        = '#fff';
    btn.style.opacity      = '1';
  }
  showToast(`❤️ "${product.name}" ditambahkan ke wishlist!`);
  setTimeout(() => { renderWishlist(); renderJFY(); }, 800);
}

// ===========================
// MOVE ALL TO BAG
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  const moveAllBtn = document.getElementById('moveAllBtn');
  if (moveAllBtn) {
    moveAllBtn.addEventListener('click', () => {
      const ids = getWishlist();
      if (ids.length === 0) { showToast('⚠️ Wishlist kosong!'); return; }
      ids.forEach(id => {
        const p = allProducts.find(x => x.id === id);
        if (p) addToCart(p);
      });
      saveWishlist([]);
      showToast(`🛒 Semua ${ids.length} item dipindah ke cart!`);
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
    if (q) alert(`Searching: "${q}"`);
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchBtn.click();
  });
}