// ===========================
// DATA PRODUK — SAMA PERSIS DENGAN home.js & wishlist.js
// ===========================

const allProducts = [
  { id: 1,  name: 'HAVIT HV-G92 Gamepad',    emoji: '🎮', price: 120  },
  { id: 2,  name: 'AK-900 Wired Keyboard',    emoji: '⌨️', price: 960  },
  { id: 3,  name: 'IPS LCD Gaming Monitor',   emoji: '🖥️', price: 370  },
  { id: 4,  name: 'S-Series Comfort Chair',   emoji: '🪑', price: 375  },
  { id: 5,  name: 'S-Series Gaming Laptop',   emoji: '💻', price: 699  },
  { id: 6,  name: 'The north coat',           emoji: '🧥', price: 23   },
  { id: 7,  name: 'Gucci duffle bag',         emoji: '👜', price: 960  },
  { id: 8,  name: 'RGB liquid CPU Cooler',    emoji: '🖥️', price: 160  },
  { id: 9,  name: 'Small BookSelf',           emoji: '📚', price: 360  },
  { id: 10, name: 'Breed Dry Dog Food',       emoji: '🐶', price: 100  },
  { id: 11, name: 'CANON EOS DSLR Camera',    emoji: '📷', price: 360  },
  { id: 12, name: 'ASUS FHD Gaming Laptop',   emoji: '💻', price: 700  },
  { id: 13, name: 'Curology Product Set',     emoji: '🧴', price: 500  },
  { id: 14, name: 'Kids Electric Car',        emoji: '🚗', price: 960  },
  { id: 15, name: 'Jr. Zoom Soccer Cleats',   emoji: '👟', price: 1160 },
  { id: 16, name: 'GP11 Shooter USB Gamepad', emoji: '🎮', price: 660  },
  { id: 17, name: 'Quilted Satin Jacket',     emoji: '🧥', price: 660  },
];

// ===========================
// CART STATE — localStorage key: 'exclusive_cart'
// Format: [{id, name, price, qty}]
// ===========================

function getCart() {
  return JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('exclusive_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const total = getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
}

// ===========================
// RENDER CART TABLE
// ===========================

function renderCart() {
  const cart          = getCart();
  const tbody         = document.getElementById('cartTableBody');
  const emptyCart     = document.getElementById('emptyCart');
  const cartActions   = document.getElementById('cartActions');
  const cartBottom    = document.getElementById('cartBottom');
  const cartTableWrap = document.querySelector('.cart-table-wrap');

  if (!tbody) return;

  if (cart.length === 0) {
    if (cartTableWrap) cartTableWrap.querySelector('.cart-table').style.display = 'none';
    if (emptyCart)   emptyCart.style.display   = 'block';
    if (cartActions) cartActions.style.display = 'none';
    if (cartBottom)  cartBottom.style.display  = 'none';
    updateSummary([]);
    updateCartBadge();
    return;
  }

  // Show table
  if (cartTableWrap) cartTableWrap.querySelector('.cart-table').style.display = 'table';
  if (emptyCart)   emptyCart.style.display   = 'none';
  if (cartActions) cartActions.style.display = 'flex';
  if (cartBottom)  cartBottom.style.display  = 'flex';

  tbody.innerHTML = cart.map((item, index) => {
    // Cari emoji dari allProducts berdasarkan id
    const productData = allProducts.find(p => p.id === item.id);
    const emoji = productData ? productData.emoji : '📦';
    const subtotal = (item.price || 0) * (item.qty || 1);

    return `
      <tr id="cart-row-${index}">
        <td>
          <div class="product-cell">
            <div class="product-thumb">${emoji}</div>
            <span class="product-cell-name">${item.name}</span>
          </div>
        </td>
        <td class="price-cell">$${item.price}</td>
        <td>
          <div class="qty-wrap">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
            <input class="qty-input" type="number" min="1" value="${item.qty || 1}"
              onchange="setQty(${index}, this.value)" />
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </td>
        <td class="subtotal-cell">$${subtotal}</td>
        <td>
          <button class="delete-row-btn" onclick="deleteItem(${index})" title="Remove">✕</button>
        </td>
      </tr>
    `;
  }).join('');

  updateSummary(cart);
  updateCartBadge();
}

// ===========================
// UPDATE SUMMARY
// ===========================

function updateSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
  const el = document.getElementById('subtotalVal');
  const el2 = document.getElementById('totalVal');
  if (el)  el.textContent  = `$${subtotal}`;
  if (el2) el2.textContent = `$${subtotal}`;
}

// ===========================
// QTY HANDLERS
// ===========================

function changeQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
  saveCart(cart);
  renderCart();
}

function setQty(index, value) {
  const cart = getCart();
  if (!cart[index]) return;
  const qty = Math.max(1, parseInt(value) || 1);
  cart[index].qty = qty;
  saveCart(cart);
  renderCart();
}

// ===========================
// DELETE ITEM
// ===========================

function deleteItem(index) {
  const cart = getCart();
  const name = cart[index]?.name || 'Item';
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  showToast(`❌ "${name}" dihapus dari cart`);
}

// ===========================
// UPDATE CART BUTTON
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Update Cart button
  const updateBtn = document.getElementById('updateCartBtn');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      // Baca semua qty input dan simpan ulang
      const cart  = getCart();
      const inputs = document.querySelectorAll('.qty-input');
      inputs.forEach((input, i) => {
        if (cart[i]) {
          cart[i].qty = Math.max(1, parseInt(input.value) || 1);
        }
      });
      saveCart(cart);
      renderCart();
      showToast('✅ Cart diperbarui!');
    });
  }

  // Apply Coupon button
  const couponBtn = document.getElementById('applyCouponBtn');
  if (couponBtn) {
    couponBtn.addEventListener('click', () => {
      const code = document.getElementById('couponInput')?.value.trim();
      if (!code) {
        showToast('⚠️ Masukkan kode kupon terlebih dahulu!');
        return;
      }
      // Simulasi validasi kupon
      if (code.toUpperCase() === 'EXCLUSIVE10') {
        showToast('🎉 Kupon berhasil! Diskon 10% diterapkan.');
      } else {
        showToast('❌ Kode kupon tidak valid.');
      }
    });
  }

  // Search bar
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