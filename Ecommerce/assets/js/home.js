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

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoSlide();
  });
});

startAutoSlide();

// ===========================
// COUNTDOWN TIMER (Flash Sales)
// ===========================

function getEndTime() {
  const stored = localStorage.getItem('flashSaleEnd');
  if (stored) return parseInt(stored);
  const end = Date.now() + (3 * 86400000) + (23 * 3600000) + (19 * 60000) + (56 * 1000);
  localStorage.setItem('flashSaleEnd', end.toString());
  return end;
}

const flashEndTime = getEndTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, flashEndTime - now);

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');

  document.getElementById('days').textContent = pad(d);
  document.getElementById('hours').textContent = pad(h);
  document.getElementById('minutes').textContent = pad(m);
  document.getElementById('seconds').textContent = pad(s);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===========================
// MUSIC BANNER COUNTDOWN
// ===========================

function getMusicEndTime() {
  const stored = localStorage.getItem('musicSaleEnd');
  if (stored) return parseInt(stored);
  const end = Date.now() + (22 * 3600000) + (5 * 86400000) + (59 * 60000) + (35 * 1000);
  localStorage.setItem('musicSaleEnd', end.toString());
  return end;
}

const musicEndTime = getMusicEndTime();

function updateMusicCountdown() {
  const now = Date.now();
  const diff = Math.max(0, musicEndTime - now);

  const h = Math.floor(diff / 3600000);
  const d = Math.floor((diff % 86400000) / 86400000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');

  const elH = document.getElementById('mHours');
  const elD = document.getElementById('mDays');
  const elM = document.getElementById('mMinutes');
  const elS = document.getElementById('mSeconds');

  if (elH) elH.textContent = pad(h % 24);
  if (elD) elD.textContent = pad(Math.floor(diff / 86400000));
  if (elM) elM.textContent = pad(m);
  if (elS) elS.textContent = pad(s);
}

setInterval(updateMusicCountdown, 1000);
updateMusicCountdown();

// ===========================
// CART FUNCTIONALITY
// ===========================

let cartCount = 0;

function addToCart(name, price) {
  cartCount++;
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = cartCount;

  showToast(`✓ "${name}" added to cart — $${price}`);
}

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
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Searching for: "${query}"`);
    }
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
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===========================
// CATEGORY CARDS TOGGLE
// ===========================

const catCards = document.querySelectorAll('.cat-card');

catCards.forEach(card => {
  card.addEventListener('click', () => {
    catCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// ===========================
// FLASH SALES SLIDER ARROWS
// ===========================

const flashSlider = document.getElementById('flashSlider');
const flashPrev = document.getElementById('flashPrev');
const flashNext = document.getElementById('flashNext');

if (flashPrev && flashSlider) {
  flashPrev.addEventListener('click', () => {
    flashSlider.scrollBy({ left: -260, behavior: 'smooth' });
  });
}

if (flashNext && flashSlider) {
  flashNext.addEventListener('click', () => {
    flashSlider.scrollBy({ left: 260, behavior: 'smooth' });
  });
}

// ===========================
// FOOTER EMAIL SUBSCRIBE
// ===========================

function subscribeEmail() {
  const emailInput = document.getElementById('footerEmail');
  if (!emailInput) return;
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    emailInput.style.borderBottom = '2px solid #db4444';
    emailInput.placeholder = 'Enter a valid email!';
    setTimeout(() => {
      emailInput.style.borderBottom = '';
      emailInput.placeholder = 'Enter your email';
    }, 2500);
    return;
  }

  showToast(`🎉 Subscribed! Check ${email} for 10% off!`);
  emailInput.value = '';
}

// ===========================
// WISHLIST BUTTON TOGGLE
// ===========================

document.querySelectorAll('.wish-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const isActive = this.classList.toggle('active');
    this.style.background = isActive ? '#db4444' : '';
    this.style.color = isActive ? '#fff' : '';
    showToast(isActive ? '❤️ Added to wishlist!' : '💔 Removed from wishlist');
  });
});

// ===========================
// NEW ARRIVAL CARD HOVER
// ===========================

document.querySelectorAll('.arrival-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.filter = 'brightness(1.1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.filter = '';
  });
});