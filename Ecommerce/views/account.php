<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Pastikan role tersedia di session
if (!isset($_SESSION['role'])) {
    require_once '../config/database.php';
    require_once '../models/User.php';
    $db = (new Database())->connect();
    $user = new User($db);
    $userData = $user->getById($_SESSION['user_id']);
    $_SESSION['role'] = $userData['role'] ?? 'user';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – My Account</title>
  <link rel="stylesheet" href="../assets/css/account.css"/>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <span class="logo">Exclusive</span>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="contact.php">Contact</a></li>
      <li><a href="about.php">About</a></li>
      <li><a href="account.php" class="active">Account</a></li>
    </ul>
    <div class="nav-icons">
      <!-- Chatbot toggle (sama seperti home.php, posisi paling kiri nav-icons) -->
      <button class="chatbot-toggle-btn" id="chatbotToggle" aria-label="Chatbot Assistant" title="Tanya Asisten">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="13" rx="3"/>
          <path d="M8 16v3l4-3h5"/>
          <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </button>
      <!-- Wishlist dengan badge -->
      <a href="wishlist.php" class="nav-icon-wrap" title="Wishlist">
        ♡
        <span class="nav-badge wish-badge" id="wishCount" style="display:none;">0</span>
      </a>
      <!-- Cart dengan badge -->
      <a href="cart.php" class="nav-icon-wrap" title="Cart">
        🛒
        <span class="nav-badge cart-badge" id="cartCount">0</span>
      </a>
      <a href="account.php" title="Account">👤</a>
    </div>
  </nav>

  <!-- BREADCRUMB -->
  <div class="breadcrumb">
    <span>Home</span> / <span class="active">My Account</span>
    <span class="welcome">Welcome! <strong id="welcomeName"></strong></span>
  </div>

  <!-- MAIN -->
  <main class="account-main">

    <!-- KIRI: Info Akun -->
    <div class="account-left">
      <div class="account-avatar">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <circle cx="50" cy="50" r="50" fill="#f5f5f5"/>
          <circle cx="50" cy="38" r="18" fill="#db4444"/>
          <ellipse cx="50" cy="82" rx="28" ry="20" fill="#db4444"/>
        </svg>
      </div>
      <div class="account-info">
        <p class="info-label">ID</p>
        <p class="info-value" id="userId">-</p>

        <p class="info-label">Nama</p>
        <p class="info-value" id="userName">-</p>

        <p class="info-label">Email</p>
        <p class="info-value" id="userEmail">-</p>

        <p class="info-label">Password</p>
        <p class="info-value">••••••••</p>
      </div>

      <!-- MENU NAVIGASI TAB -->
      <nav class="side-menu">
        <button class="side-menu-item active" data-tab="profile">👤 Profil Saya</button>
        <button class="side-menu-item" data-tab="history">🧾 History Order</button>
      </nav>

      <a href="#" class="btn-logout" id="btnLogout">Logout</a>
    </div>

    <!-- KANAN: Konten Tab -->
    <div class="account-right">

      <!-- TAB: PROFIL -->
      <div class="tab-content active" id="tab-profile">

        <div class="form-card">
          <h2>Ubah Nama</h2>
          <div class="form-group">
            <input type="text" id="newName" placeholder="Nama baru"/>
          </div>
          <button class="btn-save" id="btnSaveName">Simpan Nama</button>
          <p class="msg" id="msgName"></p>
        </div>

        <div class="form-card">
          <h2>Ubah Password</h2>
          <div class="form-group">
            <input type="password" id="currentPassword" placeholder="Password saat ini"/>
          </div>
          <div class="form-group">
            <input type="password" id="newPassword" placeholder="Password baru"/>
          </div>
          <div class="form-group">
            <input type="password" id="confirmPassword" placeholder="Konfirmasi password baru"/>
          </div>
          <button class="btn-save" id="btnSavePassword">Simpan Password</button>
          <p class="msg" id="msgPassword"></p>
        </div>

      </div>

      <!-- TAB: HISTORY ORDER -->
      <div class="tab-content" id="tab-history">
        <div class="form-card">
          <h2>🧾 History Order</h2>
          <div id="historyList">
            <div class="history-loading">Memuat riwayat pesanan...</div>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- ===================== CHATBOT WIDGET ===================== -->
  <div class="chatbot-widget" id="chatbotWidget">
    <div class="chatbot-header">
      <div class="chatbot-header-left">
        <div class="chatbot-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="13" rx="3"/>
            <path d="M8 16v3l4-3h5"/>
            <circle cx="9" cy="9" r="1" fill="white" stroke="none"/>
            <circle cx="12" cy="9" r="1" fill="white" stroke="none"/>
            <circle cx="15" cy="9" r="1" fill="white" stroke="none"/>
          </svg>
        </div>
        <div>
          <div class="chatbot-name">Exclusive Assistant</div>
          <div class="chatbot-status">● Online</div>
        </div>
      </div>
      <button class="chatbot-close" id="chatbotClose">✕</button>
    </div>

    <div class="chatbot-messages" id="chatbotMessages">
      <div class="chat-msg bot">
        <div class="chat-bubble">
          Halo! 👋 Saya asisten <strong>Exclusive</strong>. Ada yang bisa saya bantu?<br><br>
          Tanya saya tentang:<br>
          🧾 History · ❌ Batal Order · 🛒 Belanja · 🎧 Customer Service
        </div>
      </div>
    </div>

    <div class="chatbot-suggestions" id="chatbotSuggestions">
      <button onclick="chatSend('cara beli produk')">🛒 Cara Beli</button>
      <button onclick="chatSend('history order saya')">🧾 History</button>
      <button onclick="chatSend('cara batalkan order')">❌ Batal Order</button>
      <button onclick="chatSend('flash sale')">🔥 Flash Sale</button>
    </div>

    <div class="chatbot-input-area">
      <input type="text" id="chatbotInput" placeholder="Ketik pertanyaan..." autocomplete="off"/>
      <button id="chatbotSend">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Admin FAB Button (hanya untuk admin) -->
  <?php if (isset($_SESSION['role']) && $_SESSION['role'] == 'admin'): ?>
  <div class="admin-fab">
    <a href="admin.php" class="admin-toggle" title="Admin Panel">+</a>
  </div>
  <?php endif; ?>

  <script src="../assets/js/products.js"></script>
  <script src="../assets/js/account.js"></script>

</body>
</html>