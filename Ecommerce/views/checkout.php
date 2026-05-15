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
  <title>Exclusive – Checkout</title>
  <link rel="stylesheet" href="../assets/css/checkout.css"/>
</head>
<body>

  <!-- ===================== NAVBAR ===================== -->
  <nav class="navbar">
    <span class="logo">Exclusive</span>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="cart.php">Cart</a></li>
      <li><a href="account.php">Account</a></li>
    </ul>
    <!-- Chatbot toggle di navbar (sama seperti home.php) -->
    <div class="nav-actions" style="display:flex;align-items:center;gap:10px;">
      <button class="chatbot-toggle-btn" id="chatbotToggle" aria-label="Chatbot Assistant" title="Tanya Asisten">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="13" rx="3"/>
          <path d="M8 16v3l4-3h5"/>
          <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </button>
    </div>
  </nav>

  <div class="breadcrumb">
    <span>Account</span> / <span>Cart</span> / <span class="active">CheckOut</span>
  </div>

  <main class="checkout-main">

    <!-- KIRI: Form Billing -->
    <div class="billing-section">
      <h2>Billing Details</h2>

      <div class="form-group">
        <label>Nama Lengkap</label>
        <input type="text" id="nama" placeholder="Nama lengkap" readonly/>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="email" placeholder="Email" readonly/>
      </div>
      <div class="form-group">
        <label>Kota *</label>
        <input type="text" id="kota" placeholder="Kota kamu"/>
      </div>
      <div class="form-group">
        <label>Alamat Lengkap *</label>
        <textarea id="alamat" placeholder="Jalan, nomor rumah, RT/RW..." rows="3"></textarea>
      </div>
    </div>

    <!-- KANAN: Order Summary + Payment -->
    <div class="order-section">
      <h2>Order Summary</h2>

      <div class="order-items" id="orderItems">
        <!-- diisi JS dari localStorage cart -->
      </div>

      <div class="order-totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span id="subtotal">$0</span>
        </div>
        <div class="total-row">
          <span>Shipping</span>
          <span class="free">Free</span>
        </div>
        <div class="total-row total-final">
          <span>Total</span>
          <span id="totalFinal">$0</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="payment-section">
        <h3>Metode Pembayaran</h3>

        <label class="pay-option">
          <input type="radio" name="payment" value="Bank Transfer"/>
          <span>🏦 Bank Transfer</span>
        </label>
        <label class="pay-option">
          <input type="radio" name="payment" value="GoPay"/>
          <span>💚 GoPay</span>
        </label>
        <label class="pay-option">
          <input type="radio" name="payment" value="OVO"/>
          <span>💜 OVO</span>
        </label>
        <label class="pay-option">
          <input type="radio" name="payment" value="Dana"/>
          <span>💙 DANA</span>
        </label>
        <label class="pay-option">
          <input type="radio" name="payment" value="ShopeePay"/>
          <span>🧡 ShopeePay</span>
        </label>
        <label class="pay-option">
          <input type="radio" name="payment" value="Cash on Delivery" checked/>
          <span>🚚 Cash on Delivery</span>
        </label>
      </div>

      <div id="paymentInfo" style="display:flex;align-items:center;margin:8px 0 14px;min-height:28px;"></div>

      <button class="btn-order" id="btnPlaceOrder">Place Order</button>
      <p class="msg" id="msgOrder"></p>
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
          Halo! 👋 Saya asisten <strong>Exclusive</strong>. Ada yang bisa saya bantu di halaman checkout?<br><br>
          Tanya saya tentang:<br>
          💳 Pembayaran · 📦 Order · 🚚 Pengiriman · 🏷️ Diskon
        </div>
      </div>
    </div>

    <div class="chatbot-suggestions" id="chatbotSuggestions">
      <button onclick="chatSend('metode pembayaran apa saja?')">💳 Pembayaran</button>
      <button onclick="chatSend('cara order')">📦 Cara Order</button>
      <button onclick="chatSend('info pengiriman')">🚚 Pengiriman</button>
      <button onclick="chatSend('ada diskon voucher?')">🏷️ Diskon</button>
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

  <script src="../assets/js/products.js"></script>
  <script src="../assets/js/checkout.js"></script>
  <script src="../assets/js/chatbot.js"></script>
</body>
</html>