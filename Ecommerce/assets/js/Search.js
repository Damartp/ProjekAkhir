// search.js — Taruh di: assets/js/search.js
// Load SETELAH script lainnya di home.php, cart.php, wishlist.php

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchBtn   = document.querySelector('.search-btn') || document.getElementById('searchBtn');

    if (!searchInput) return;

    // Buat dropdown hasil search
    const dropdown = document.createElement('div');
    dropdown.id = 'searchDropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #fff;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        z-index: 9999;
        max-height: 360px;
        overflow-y: auto;
        display: none;
    `;

    // Bungkus search-box dengan position:relative
    const searchBox = searchInput.closest('.search-box') || searchInput.parentElement;
    searchBox.style.position = 'relative';
    searchBox.appendChild(dropdown);

    let debounceTimer;

    // Ketik di input → cari
    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const q = this.value.trim();
        if (q.length < 2) { dropdown.style.display = 'none'; return; }
        debounceTimer = setTimeout(() => doSearch(q), 300);
    });

    // Tombol search → cari
    if (searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const q = searchInput.value.trim();
            if (q.length >= 2) doSearch(q);
        });
    }

    // Enter → cari
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const q = this.value.trim();
            if (q.length >= 2) doSearch(q);
        }
        if (e.key === 'Escape') dropdown.style.display = 'none';
    });

    // Klik di luar → tutup dropdown
    document.addEventListener('click', function (e) {
        if (!searchBox.contains(e.target)) dropdown.style.display = 'none';
    });

    // Fungsi utama search — fetch ke Search.php
    function doSearch(q) {
        dropdown.innerHTML = '<div style="padding:14px 16px;color:#999;font-size:13px;">Mencari...</div>';
        dropdown.style.display = 'block';

        fetch('/ProjekAkhir/Ecommerce/controllers/Search.php?q=' + encodeURIComponent(q))
            .then(res => res.json())
            .then(products => renderDropdown(products, q))
            .catch(() => {
                // Fallback: cari dari allProducts (data lokal di products.js)
                if (typeof allProducts !== 'undefined') {
                    const local = allProducts.filter(p =>
                        p.name.toLowerCase().includes(q.toLowerCase())
                    );
                    renderDropdown(local, q);
                } else {
                    dropdown.innerHTML = '<div style="padding:14px 16px;color:#999;font-size:13px;">Tidak dapat terhubung ke server.</div>';
                }
            });
    }

    // Tampilkan hasil di dropdown
    function renderDropdown(products, q) {
        if (products.length === 0) {
            dropdown.innerHTML = '<div style="padding:14px 16px;color:#999;font-size:13px;">Produk tidak ditemukan untuk "<b>' + q + '</b>"</div>';
            dropdown.style.display = 'block';
            return;
        }

        dropdown.innerHTML = products.map(p => `
            <a href="details.php?id=${p.id}" style="
                display:flex; align-items:center; gap:12px;
                padding:10px 16px; text-decoration:none; color:#222;
                border-bottom:1px solid #f5f5f5; transition:background 0.15s;
            " onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background=''">
                <span style="font-size:26px;">${p.emoji || '📦'}</span>
                <div style="flex:1; min-width:0;">
                    <div style="font-size:14px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</div>
                    <div style="font-size:13px; color:#db4444; font-weight:600;">$${p.price}</div>
                </div>
            </a>
        `).join('') + `
            <div style="padding:10px 16px; font-size:12px; color:#aaa; text-align:center;">
                ${products.length} produk ditemukan
            </div>
        `;
        dropdown.style.display = 'block';
    }
});