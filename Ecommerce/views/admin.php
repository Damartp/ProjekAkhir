<?php
// views/admin.php
session_start();

// Cek harus admin
if (!isset($_SESSION['user_id']) || ($_SESSION['role'] ?? '') !== 'admin') {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – Admin Panel</title>
    <link rel="stylesheet" href="../assets/css/admin.css"/>

<style>
.btn-edit {
  background: none;
  border: 1.5px solid #1976d2;
  color: #1976d2;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
  margin-right: 6px;
}
.btn-edit:hover { background: #1976d2; color: #fff; }
</style>
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
  <div style="display:flex;align-items:center;">
    <span class="logo">Exclusive</span>
    <span class="admin-badge">ADMIN</span>
  </div>
  <div class="navbar-right">
    <a href="home.php">🏠 Home</a>
    <a href="account.php">👤 <?= htmlspecialchars($_SESSION['user_name'] ?? 'Admin') ?></a>
    <a href="controllers/AuthController.php?action=logout" class="btn-logout-nav">Logout</a>
  </div>
</nav>

<div class="admin-wrap">

  <!-- STATS -->
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-icon">📦</div>
      <div>
        <div class="stat-val" id="statTotal">-</div>
        <div class="stat-label">Total Produk</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⚡</div>
      <div>
        <div class="stat-val" id="statFlash">-</div>
        <div class="stat-label">Flash Sale</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🔍</div>
      <div>
        <div class="stat-val" id="statExplore">-</div>
        <div class="stat-label">Explore</div>
      </div>
    </div>
  </div>

  <!-- FORM TAMBAH PRODUK -->
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">➕ Tambah Produk Baru</span>
    </div>
    <div class="panel-body">
      <div class="form-grid">

        <!-- Nama -->
        <div class="form-group">
          <label>Nama Produk *</label>
          <input type="text" id="fName" placeholder="Contoh: Gaming Headset Pro"/>
        </div>

        <!-- Section -->
        <div class="form-group">
          <label>Section *</label>
          <select id="fSection">
            <option value="flash">⚡ Flash Sale</option>
            <option value="bestsell">🏆 Best Sellers</option>
            <option value="explore" selected>🔍 Explore</option>
          </select>
        </div>

        <!-- Harga -->
        <div class="form-group">
          <label>Harga ($) *</label>
          <input type="number" id="fPrice" placeholder="Contoh: 120" min="0" step="0.01"/>
        </div>

        <!-- Harga Lama -->
        <div class="form-group">
          <label>Harga Lama ($) <span style="color:#aaa;font-weight:400;">(opsional)</span></label>
          <input type="number" id="fOldPrice" placeholder="Contoh: 160" min="0" step="0.01"/>
        </div>

        <!-- Stars -->
        <div class="form-group">
          <label>Rating Bintang</label>
          <select id="fStars">
            <option value="5" selected>⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>

        <!-- Reviews -->
        <div class="form-group">
          <label>Jumlah Review</label>
          <input type="number" id="fReviews" placeholder="Contoh: 88" min="0"/>
        </div>

        <!-- Badge -->
        <div class="form-group">
          <label>Badge <span style="color:#aaa;font-weight:400;">(opsional, mis: -40%, NEW)</span></label>
          <input type="text" id="fBadge" placeholder="Contoh: -40% atau NEW"/>
        </div>

        <!-- Badge Color -->
        <div class="form-group">
          <label>Warna Badge</label>
          <select id="fBadgeColor">
            <option value="">-- Tanpa Badge --</option>
            <option value="red">🔴 Merah (diskon)</option>
            <option value="green">🟢 Hijau (new)</option>
          </select>
        </div>

        <!-- Emoji Picker -->
        <div class="form-group full">
          <label>Icon Produk (Emoji) *</label>
          <div class="emoji-preview" id="emojiPreview">📦</div>
          <input type="hidden" id="fEmoji" value="📦"/>
          <div class="emoji-grid" id="emojiGrid"></div>
        </div>

      </div>

      <div style="margin-top:20px; display:flex; align-items:center; gap:16px;">
        <button class="btn-red" id="btnCreate">Tambah Produk</button>
        <button style="background:none;border:1.5px solid #ddd;padding:9px 20px;border-radius:8px;cursor:pointer;font-size:14px;" id="btnReset">Reset Form</button>
      </div>
      <p class="msg" id="msgCreate"></p>
    </div>
  </div>

  <!-- TABEL PRODUK -->
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">📋 Daftar Produk</span>
      <input type="text" class="table-search" id="tableSearch" placeholder="Cari produk..."/>
    </div>
    <div style="overflow-x:auto;">
      <table class="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Icon</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Harga Lama</th>
            <th>Badge</th>
            <th>Stars</th>
            <th>Section</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody id="productTableBody">
          <tr class="loading-row"><td colspan="9">Memuat produk...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

</div>


<!-- MODAL EDIT -->
<div id="editModal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center;">
  <div style="background:#fff; border-radius:16px; padding:32px; width:min(620px,94vw); max-height:90vh; overflow-y:auto; position:relative;">
    <button onclick="closeEditModal()" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#888;">✕</button>
    <h2 style="margin-bottom:20px;font-size:18px;">✏️ Edit Produk</h2>
    <input type="hidden" id="eId"/>
    <div class="form-grid">
      <div class="form-group">
        <label>Nama Produk *</label>
        <input type="text" id="eName" placeholder="Nama produk"/>
      </div>
      <div class="form-group">
        <label>Section *</label>
        <select id="eSection">
          <option value="flash">⚡ Flash Sale</option>
          <option value="bestsell">🏆 Best Sellers</option>
          <option value="explore">🔍 Explore</option>
        </select>
      </div>
      <div class="form-group">
        <label>Harga ($) *</label>
        <input type="number" id="ePrice" min="0" step="0.01"/>
      </div>
      <div class="form-group">
        <label>Harga Lama ($)</label>
        <input type="number" id="eOldPrice" min="0" step="0.01"/>
      </div>
      <div class="form-group">
        <label>Rating Bintang</label>
        <select id="eStars">
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="1">⭐ (1)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Jumlah Review</label>
        <input type="number" id="eReviews" min="0"/>
      </div>
      <div class="form-group">
        <label>Badge</label>
        <input type="text" id="eBadge" placeholder="Contoh: -40% atau NEW"/>
      </div>
      <div class="form-group">
        <label>Warna Badge</label>
        <select id="eBadgeColor">
          <option value="">-- Tanpa Badge --</option>
          <option value="red">🔴 Merah (diskon)</option>
          <option value="green">🟢 Hijau (new)</option>
        </select>
      </div>
      <div class="form-group full">
        <label>Icon Produk (Emoji)</label>
        <div class="emoji-preview" id="eEmojiPreview">📦</div>
        <input type="hidden" id="eEmoji" value="📦"/>
        <div class="emoji-grid" id="eEmojiGrid"></div>
      </div>
    </div>
    <div style="margin-top:20px; display:flex; gap:12px;">
      <button class="btn-red" id="btnUpdate">Simpan Perubahan</button>
      <button onclick="closeEditModal()" style="background:none;border:1.5px solid #ddd;padding:9px 20px;border-radius:8px;cursor:pointer;font-size:14px;">Batal</button>
    </div>
    <p class="msg" id="msgEdit"></p>
  </div>
</div>

<script src="../assets/js/admin.js"></script>
</body>
</html>