let allProducts = [];
let PRODUCTS    = {};

// ===========================
// KONFIGURASI URL
// Pakai BASE_URL dinamis agar berjalan di Laragon, XAMPP, maupun hosting
// Sesuaikan BASE_PATH dengan nama folder project kamu
// ===========================
const BASE_PATH = '/ProjekAkhir/Ecommerce';
const PRODUCT_API = BASE_PATH + '/controllers/ProductController.php';

async function initProducts() {
  // Cache: pakai sessionStorage agar tidak fetch ulang setiap pindah halaman.
  // Cache akan otomatis kosong saat admin melakukan perubahan data.
  const cached = sessionStorage.getItem('exclusive_products');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.length > 0) {
        _mapProducts(parsed);
        return;
      }
    } catch(e) {
      // Cache rusak/invalid, hapus dan fetch ulang
      sessionStorage.removeItem('exclusive_products');
    }
  }

  try {
    const res  = await fetch(PRODUCT_API + '?action=getAll');

    // Cek apakah response OK sebelum parse JSON
    if (!res.ok) {
      console.error('Gagal load produk. HTTP Status:', res.status, res.statusText);
      console.error('Cek apakah URL ini bisa diakses:', window.location.origin + PRODUCT_API + '?action=getAll');
      return;
    }

    const data = await res.json();
    if (!data.success) return;

    _mapProducts(data.data);
    sessionStorage.setItem('exclusive_products', JSON.stringify(data.data));
  } catch(e) {
    console.error('Gagal load produk:', e);
    console.error('Pastikan URL benar:', window.location.origin + PRODUCT_API + '?action=getAll');
  }
}

function _mapProducts(raw) {
  allProducts = raw.map(p => ({
    id:        parseInt(p.id),
    name:      p.name,
    emoji:     p.emoji       || '📦',
    price:     parseFloat(p.price),
    oldPrice:  (p.old_price && parseFloat(p.old_price) > 0) ? parseFloat(p.old_price) : null,
    badge:     p.badge       || null,
    badgeType: p.badge_color || '',
    stars:     parseInt(p.stars)   || 5,
    reviews:   parseInt(p.reviews) || 0,
    desc:      p.description || 'No description available.',
    section:   p.section     || '',
  }));

  // Map by ID untuk akses cepat
  PRODUCTS = {};
  allProducts.forEach(p => {
    PRODUCTS[p.id] = { id: p.id, name: p.name, price: p.price };
  });
}