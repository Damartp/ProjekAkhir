<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – My Account</title>
  <link rel="stylesheet" href="/ProjekAkhir/Ecommerce/assets/css/account.css"/>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <span class="logo">Exclusive</span>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">About</a></li>
      <li><a href="account.php" class="active">Account</a></li>
    </ul>
    <div class="nav-icons">
      <a href="wishlist.php">♡</a>
      <a href="cart.php">🛒</a>
      <a href="account.php">👤</a>
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
      <a href="controllers/AuthController.php?action=logout" class="btn-logout">Logout</a>
    </div>

    <!-- KANAN: Form Edit -->
    <div class="account-right">

      <!-- Edit Nama -->
      <div class="form-card">
        <h2>Ubah Nama</h2>
        <div class="form-group">
          <input type="text" id="newName" placeholder="Nama baru"/>
        </div>
        <button class="btn-save" id="btnSaveName">Simpan Nama</button>
        <p class="msg" id="msgName"></p>
      </div>

      <!-- Edit Password -->
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
  </main>

  <script src="/ProjekAkhir/Ecommerce/assets/js/account.js"></script>
  
</body>
</html>