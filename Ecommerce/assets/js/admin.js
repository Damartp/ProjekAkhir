const CTRL = '/ProjekAkhir/Ecommerce/controllers/ProductController.php';
// ===========================
// EMOJI LIST
// ===========================
const EMOJIS = [
  '📦','🎮','⌨️','🖥️','🪑','💻','🧥','👜','🧊','📚','🐾','📷','🎧','👟','🚗','⚽','🎯',
  '🕹️','🖱️','📱','⌚','🧴','🎒','🛋️','🔧','🎸','🎹','🎻','🎺','🥾','👒','💍','💎','🧸',
  '🪆','🧩','🎲','🃏','🎪','🏋️','🚴','🛸','🚁','⛵','🏕️','🌂','☂️','🕶️','👓','🪥','🧲',
];

function buildEmojiGrid() {
  const grid = document.getElementById('emojiGrid');
  grid.innerHTML = EMOJIS.map(e =>
    `<span class="emoji-opt" onclick="selectEmoji('${e}')">${e}</span>`
  ).join('');
  // default pilih 📦
  selectEmoji('📦');
}

function selectEmoji(e) {
  document.getElementById('fEmoji').value = e;
  document.getElementById('emojiPreview').textContent = e;
  document.querySelectorAll('.emoji-opt').forEach(el => {
    el.classList.toggle('selected', el.textContent === e);
  });
}

// ===========================
// LOAD & RENDER PRODUK
// ===========================
let allProductsAdmin = [];

async function loadProducts() {
  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = '<tr class="loading-row"><td colspan="9">Memuat...</td></tr>';

  const res  = await fetch(CTRL + '?action=getAll');
  const data = await res.json();
  if (!data.success) return;

  allProductsAdmin = data.data;
  renderTable(allProductsAdmin);
  updateStats(allProductsAdmin);
}

function renderTable(products) {
  const tbody = document.getElementById('productTableBody');
  if (!products.length) {
    tbody.innerHTML = '<tr class="loading-row"><td colspan="9">Belum ada produk.</td></tr>';
    return;
  }
  tbody.innerHTML = products.map(p => `
    <tr id="row-${p.id}">
      <td style="color:#aaa;font-size:12px;">#${p.id}</td>
      <td class="emoji-cell">${p.emoji || '📦'}</td>
      <td><strong>${escHtml(p.name)}</strong></td>
      <td style="color:#db4444;font-weight:600;">$${parseFloat(p.price).toFixed(2)}</td>
      <td style="color:#aaa;text-decoration:line-through;">${p.old_price > 0 ? '$'+parseFloat(p.old_price).toFixed(2) : '-'}</td>
      <td>${p.badge ? `<span style="background:${p.badge_color==='green'?'#e8f5e9':'#fff0f0'};color:${p.badge_color==='green'?'#2e7d32':'#db4444'};padding:2px 8px;border-radius:12px;font-size:12px;font-weight:600;">${escHtml(p.badge)}</span>` : '-'}</td>
      <td>${'★'.repeat(parseInt(p.stars)||5)}</td>
      <td><span class="section-tag ${p.section}">${p.section}</span></td>
      <td>
        <button class="btn-edit" onclick="openEditModal(${p.id})">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteProduct(${p.id}, '${escHtml(p.name).replace(/'/g,"\\'")}')">🗑 Hapus</button>
      </td>
    </tr>
  `).join('');
}

function updateStats(products) {
  document.getElementById('statTotal').textContent   = products.length;
  document.getElementById('statFlash').textContent   = products.filter(p => p.section === 'flash').length;
  document.getElementById('statExplore').textContent = products.filter(p => p.section === 'explore').length;
}

// ===========================
// SEARCH TABLE
// ===========================
document.getElementById('tableSearch').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  renderTable(allProductsAdmin.filter(p => p.name.toLowerCase().includes(q)));
});

// ===========================
// CREATE PRODUK
// ===========================
document.getElementById('btnCreate').addEventListener('click', async () => {
  const btn  = document.getElementById('btnCreate');
  const msg  = document.getElementById('msgCreate');
  const name = document.getElementById('fName').value.trim();
  const price = document.getElementById('fPrice').value;

  if (!name || !price) {
    showMsg(msg, 'Nama dan harga wajib diisi!', false); return;
  }

  btn.disabled = true; btn.textContent = 'Menyimpan...';

  const fd = new FormData();
  fd.append('action',      'create');
  fd.append('name',        name);
  fd.append('price',       price);
  fd.append('old_price',   document.getElementById('fOldPrice').value || 0);
  fd.append('emoji',       document.getElementById('fEmoji').value);
  fd.append('badge',       document.getElementById('fBadge').value.trim());
  fd.append('badge_color', document.getElementById('fBadgeColor').value);
  fd.append('stars',       document.getElementById('fStars').value);
  fd.append('reviews',     document.getElementById('fReviews').value || 0);
  fd.append('section',     document.getElementById('fSection').value);

  const res  = await fetch(CTRL, { method: 'POST', body: fd });
  const data = await res.json();

  showMsg(msg, data.message, data.success);
  if (data.success) {
    const newProduct = {
      id:          data.id,
      name:        document.getElementById('fName').value.trim(),
      price:       parseFloat(document.getElementById('fPrice').value),
      old_price:   parseFloat(document.getElementById('fOldPrice').value || 0),
      emoji:       document.getElementById('fEmoji').value,
      badge:       document.getElementById('fBadge').value.trim(),
      badge_color: document.getElementById('fBadgeColor').value,
      stars:       document.getElementById('fStars').value,
      reviews:     parseInt(document.getElementById('fReviews').value || 0),
      section:     document.getElementById('fSection').value,
    };
    allProductsAdmin.unshift(newProduct);
    renderTable(allProductsAdmin);
    updateStats(allProductsAdmin);
    resetForm();
  }

  btn.disabled = false; btn.textContent = 'Tambah Produk';
});

// ===========================
// DELETE PRODUK
// ===========================
async function deleteProduct(id, name) {
  if (!confirm(`Hapus produk "${name}"?\nTindakan ini tidak bisa dibatalkan.`)) return;

  const row = document.getElementById('row-' + id);
  if (row) { row.style.opacity = '0.4'; }

  const fd = new FormData();
  fd.append('action', 'delete');
  fd.append('id', id);

  const res  = await fetch(CTRL, { method: 'POST', body: fd });
  const data = await res.json();

  if (data.success) {
    if (row) { row.remove(); }
    allProductsAdmin = allProductsAdmin.filter(p => p.id != id);
    updateStats(allProductsAdmin);
  } else {
    if (row) row.style.opacity = '1';
    alert(data.message);
  }
}

// ===========================
// RESET FORM
// ===========================
document.getElementById('btnReset').addEventListener('click', resetForm);

function resetForm() {
  ['fName','fPrice','fOldPrice','fBadge','fReviews'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('fSection').value    = 'explore';
  document.getElementById('fBadgeColor').value = '';
  document.getElementById('fStars').value      = '5';
  selectEmoji('📦');
  const msg = document.getElementById('msgCreate');
  msg.className = 'msg'; msg.textContent = '';
}

// ===========================
// HELPERS
// ===========================
function showMsg(el, text, success) {
  el.textContent = text;
  el.className   = 'msg ' + (success ? 'success' : 'error');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}


// ===========================
// EDIT PRODUK
// ===========================

function buildEditEmojiGrid() {
  const grid = document.getElementById('eEmojiGrid');
  if (!grid || grid.children.length) return; // sudah dibangun
  grid.innerHTML = EMOJIS.map(e =>
    `<span class="emoji-opt" onclick="selectEditEmoji('${e}')">${e}</span>`
  ).join('');
}

function selectEditEmoji(e) {
  document.getElementById('eEmoji').value = e;
  document.getElementById('eEmojiPreview').textContent = e;
  document.querySelectorAll('#eEmojiGrid .emoji-opt').forEach(el => {
    el.classList.toggle('selected', el.textContent === e);
  });
}

function openEditModal(id) {
  const p = allProductsAdmin.find(x => x.id == id);
  if (!p) return;

  buildEditEmojiGrid();

  document.getElementById('eId').value              = p.id;
  document.getElementById('eName').value            = p.name;
  document.getElementById('ePrice').value           = p.price;
  document.getElementById('eOldPrice').value        = p.old_price || '';
  document.getElementById('eStars').value           = p.stars || 5;
  document.getElementById('eReviews').value         = p.reviews || 0;
  document.getElementById('eBadge').value           = p.badge || '';
  document.getElementById('eBadgeColor').value      = p.badge_color || '';
  document.getElementById('eSection').value         = p.section || 'explore';

  selectEditEmoji(p.emoji || '📦');

  const msg = document.getElementById('msgEdit');
  msg.className = 'msg'; msg.textContent = '';

  const modal = document.getElementById('editModal');
  modal.style.display = 'flex';
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

// Tutup modal kalau klik overlay
document.getElementById('editModal').addEventListener('click', function(e) {
  if (e.target === this) closeEditModal();
});

document.getElementById('btnUpdate').addEventListener('click', async () => {
  const btn  = document.getElementById('btnUpdate');
  const msg  = document.getElementById('msgEdit');
  const name  = document.getElementById('eName').value.trim();
  const price = document.getElementById('ePrice').value;
  const id    = document.getElementById('eId').value;

  if (!name || !price) { showMsg(msg, 'Nama dan harga wajib diisi!', false); return; }

  btn.disabled = true; btn.textContent = 'Menyimpan...';

  const fd = new FormData();
  fd.append('action',      'update');
  fd.append('id',          id);
  fd.append('name',        name);
  fd.append('price',       price);
  fd.append('old_price',   document.getElementById('eOldPrice').value || 0);
  fd.append('emoji',       document.getElementById('eEmoji').value);
  fd.append('badge',       document.getElementById('eBadge').value.trim());
  fd.append('badge_color', document.getElementById('eBadgeColor').value);
  fd.append('stars',       document.getElementById('eStars').value);
  fd.append('reviews',     document.getElementById('eReviews').value || 0);
  fd.append('section',     document.getElementById('eSection').value);

  const res  = await fetch(CTRL, { method: 'POST', body: fd });
  const data = await res.json();

  showMsg(msg, data.message, data.success);
  if (data.success) {
    await loadProducts();
    setTimeout(closeEditModal, 800);
  }

  btn.disabled = false; btn.textContent = 'Simpan Perubahan';
});

// ===========================
// INIT
// ===========================
buildEmojiGrid();
loadProducts();