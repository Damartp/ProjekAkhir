// ===========================
// DATA PRODUK
// ===========================

// ✅ FIX: DIHAPUS 'let allProducts = []' → sudah ada di produk.js (global)
// ✅ FIX: DIHAPUS 'async function loadProductData()' → redundan, pakai initProducts() dari produk.js

// ===========================
// VALID COUPONS
// ===========================

const VALID_COUPONS = {
  'RPL': { discount: 0.10, label: '10%' },
};

// ===========================
// COUPON STATE — hanya di memori, TIDAK disimpan ke localStorage
// Reset otomatis setiap refresh
// ===========================

let activeCoupon = null; // { code, discount, label } | null

// ===========================
// CART STATE — localStorage key: 'exclusive_cart'
// ===========================

function getCart() {
  return JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('exclusive_cart',  JSON.stringify(cart));
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

  if (cartTableWrap) cartTableWrap.querySelector('.cart-table').style.display = 'table';
  if (emptyCart)   emptyCart.style.display   = 'none';
  if (cartActions) cartActions.style.display = 'flex';
  if (cartBottom)  cartBottom.style.display  = 'flex';

  tbody.innerHTML = cart.map((item, index) => {
    // ✅ FIX: allProducts terisi dari initProducts() di produk.js
    const productData = allProducts.find(p => p.id === item.id);
    const emoji    = productData ? productData.emoji : '📦';
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
          <button class="delete-row-btn" onclick="deleteItem(${index})" title="Remove">x</button>
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
  const subtotal       = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
  const discountAmount = activeCoupon ? Math.round(subtotal * activeCoupon.discount) : 0;
  const total          = subtotal - discountAmount;

  const elSubtotal = document.getElementById('subtotalVal');
  if (elSubtotal) elSubtotal.textContent = '$' + subtotal;

  const discountRow = document.getElementById('discountRow');
  const elDiscount  = document.getElementById('discountVal');
  if (discountRow) discountRow.style.display = activeCoupon ? 'flex' : 'none';
  if (elDiscount)  elDiscount.textContent    = activeCoupon
    ? '-$' + discountAmount + ' (' + activeCoupon.label + ' off - kode: ' + activeCoupon.code + ')'
    : '';

  const elTotal = document.getElementById('totalVal');
  if (elTotal) elTotal.textContent = '$' + total;
}

// ===========================
// APPLY COUPON
// ===========================

function applyCoupon(code) {
  if (!code) {
    showToast('Masukkan kode kupon terlebih dahulu!');
    return;
  }

  const upperCode  = code.trim().toUpperCase();
  const couponData = VALID_COUPONS[upperCode];

  if (!couponData) {
    showToast('Kode kupon tidak valid.');
    return;
  }

  activeCoupon = { code: upperCode, discount: couponData.discount, label: couponData.label };

  const cart           = getCart();
  const subtotal       = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
  const discountAmount = Math.round(subtotal * activeCoupon.discount);
  localStorage.setItem('exclusive_discount', discountAmount);

  updateSummary(cart);
  updateCouponUI();
  showToast('Kupon "' + upperCode + '" berhasil! Diskon ' + couponData.label + ' diterapkan.');
}

// ===========================
// REMOVE COUPON
// ===========================

function removeCoupon() {
  activeCoupon = null;
  updateSummary(getCart());
  updateCouponUI();
  showToast('Kupon dihapus.');
}

// ===========================
// UPDATE TAMPILAN INPUT & NOTE KUPON
// ===========================

function updateCouponUI() {
  const inputEl    = document.getElementById('couponInput');
  const couponNote = document.getElementById('couponNote');
  const applyBtn   = document.getElementById('applyCouponBtn');
  const removeBtn  = document.getElementById('removeCouponBtn');

  if (inputEl) {
    inputEl.value    = activeCoupon ? activeCoupon.code : '';
    inputEl.disabled = !!activeCoupon;
  }

  if (couponNote) {
    couponNote.textContent = activeCoupon
      ? 'Kupon "' + activeCoupon.code + '" aktif - diskon ' + activeCoupon.label
      : '';
  }

  if (applyBtn)  applyBtn.style.display  = activeCoupon ? 'none'         : 'inline-block';
  if (removeBtn) removeBtn.style.display = activeCoupon ? 'inline-block' : 'none';
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
  cart[index].qty = Math.max(1, parseInt(value) || 1);
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
  showToast('"' + name + '" dihapus dari cart');
}

// ===========================
// WISHLIST BADGE
// ===========================
function getWishlist() {
  return JSON.parse(localStorage.getItem('exclusive_wishlist') || '[]');
}

function updateWishlistBadge() {
  const count = getWishlist().length;
  const el    = document.getElementById('wishCount');
  if (!el) return;
  el.textContent   = count;
  el.style.display = count > 0 ? 'flex' : 'none';
}
// ===========================
// DOM READY
// ===========================

document.addEventListener('DOMContentLoaded', async () => {  // ✅ FIX: tambah keyword 'async'
  await initProducts();                                       // ✅ FIX: hanya initProducts(), hapus loadProductData()
  renderCart();
  updateCouponUI();
  updateWishlistBadge();

  const updateBtn = document.getElementById('updateCartBtn');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      const cart   = getCart();
      const inputs = document.querySelectorAll('.qty-input');
      inputs.forEach((input, i) => {
        if (cart[i]) cart[i].qty = Math.max(1, parseInt(input.value) || 1);
      });
      saveCart(cart);
      renderCart();
      showToast('Cart diperbarui!');
    });
  }

  const couponBtn = document.getElementById('applyCouponBtn');
  if (couponBtn) {
    couponBtn.addEventListener('click', () => {
      const code = document.getElementById('couponInput')?.value.trim();
      applyCoupon(code);
    });
  }

  const removeCouponBtn = document.getElementById('removeCouponBtn');
  if (removeCouponBtn) {
    removeCouponBtn.addEventListener('click', removeCoupon);
  }

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