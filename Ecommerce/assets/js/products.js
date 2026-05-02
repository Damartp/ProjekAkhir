let allProducts = [];
let PRODUCTS    = {};

async function initProducts() {
    try {
        const res  = await fetch('/ProjekAkhir/Ecommerce/controllers/ProductController.php?action=getAll');
        const data = await res.json();
        if (!data.success) return;

        allProducts = data.data.map(p => ({
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

        allProducts.forEach(p => {
            PRODUCTS[p.id] = { id: p.id, name: p.name, price: p.price };
        });

    } catch(e) {
        console.error('Gagal load produk:', e);
    }
}