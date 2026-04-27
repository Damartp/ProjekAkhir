// ===========================
// SHARED PRODUCT DATA
// ID harus sama persis dengan data-id di HTML dan wishlist.js
// ===========================

const PRODUCTS = {
  1:  { id: 1,  name: 'HAVIT HV-G92 Gamepad',    price: 120  },
  2:  { id: 2,  name: 'AK-900 Wired Keyboard',    price: 960  },
  3:  { id: 3,  name: 'IPS LCD Gaming Monitor',   price: 370  },
  4:  { id: 4,  name: 'S-Series Comfort Chair',   price: 375  },
  5:  { id: 5,  name: 'S-Series Gaming Laptop',   price: 699  },
  6:  { id: 6,  name: 'The north coat',           price: 23   },
  7:  { id: 7,  name: 'Gucci duffle bag',         price: 960  },
  8:  { id: 8,  name: 'RGB liquid CPU Cooler',    price: 160  },
  9:  { id: 9,  name: 'Small BookSelf',           price: 360  },
  10: { id: 10, name: 'Breed Dry Dog Food',       price: 100  },
  11: { id: 11, name: 'CANON EOS DSLR Camera',    price: 360  },
  12: { id: 12, name: 'ASUS FHD Gaming Laptop',   price: 700  },
  13: { id: 13, name: 'Curology Product Set',     price: 500  },
  14: { id: 14, name: 'Kids Electric Car',        price: 960  },
  15: { id: 15, name: 'Jr. Zoom Soccer Cleats',   price: 1160 },
  16: { id: 16, name: 'GP11 Shooter USB Gamepad', price: 660  },
  17: { id: 17, name: 'Quilted Satin Jacket',     price: 660  },
};

// ===========================
// HERO BANNER SLIDER
// ===========================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function goToSlide(index) {
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

startAutoSlide();

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
  document.getElementById('days').textContent    = pad(Math.floor(diff / 86400000));
  document.getElementById('hours').textContent   = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('minutes').textContent = pad(Math.floor((diff % 3600000) / 60000));
  document.getElementById('seconds').textContent = pad(Math.floor((diff % 60000) / 1000));
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===========================
// MUSIC BANNER COUNTDOWN
// ===========================

function getMusicEndTime() {
  const stored = localStorage.getItem('musicSaleEnd');
  if (stored) return parseInt(stored);
  const end = Date.now() + (5 * 86400000) + (22 * 3600000) + (59 * 60000) + (35 * 1000);
  localStorage.setItem('musicSaleEnd', end.toString());
  return end;
}

const musicEndTime = getMusicEndTime();

function updateMusicCountdown() {
  const diff = Math.max(0, musicEndTime - Date.now());
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
function addToCart(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart(cart);

  // Update badge
  const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
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
    if (e.key === 'Enter') searchBtn.click();
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
// WISHLIST — simpan id ke localStorage
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
    const id = parseInt(btn.dataset.id);
    const active = list.includes(id);
    btn.classList.toggle('active', active);
    btn.style.background = active ? '#db4444' : '';
    btn.style.color      = active ? '#fff'    : '';
  });
}

document.querySelectorAll('.wish-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const id   = parseInt(this.dataset.id);
    const list = getWishlist();
    const idx  = list.indexOf(id);
    const adding = idx === -1;

    if (adding) {
      list.push(id);
    } else {
      list.splice(idx, 1);
    }

    saveWishlist(list);
    this.classList.toggle('active', adding);
    this.style.background = adding ? '#db4444' : '';
    this.style.color      = adding ? '#fff'    : '';
    showToast(adding ? '❤️ Added to wishlist!' : '💔 Removed from wishlist');
  });
});

// ===========================
// NEW ARRIVAL CARD HOVER
// ===========================

document.querySelectorAll('.arrival-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.filter = 'brightness(1.1)'; });
  card.addEventListener('mouseleave', () => { card.style.filter = ''; });
});

// ===========================
// INIT
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  syncWishlistButtons();

  // Sync cart count
  const total = getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = total;
});