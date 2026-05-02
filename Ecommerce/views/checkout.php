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
  <link rel="stylesheet" href="/ProjekAkhir/Ecommerce/assets/css/checkout.css"/>
</head>
<body>

  <nav class="navbar">
    <span class="logo">Exclusive</span>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="cart.php">Cart</a></li>
      <li><a href="account.php">Account</a></li>
    </ul>
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
          <span>💵 Cash on Delivery</span>
        </label>
      </div>

      <button class="btn-order" id="btnPlaceOrder">Place Order</button>
      <p class="msg" id="msgOrder"></p>
    </div>

  </main>
  <script src="/ProjekAkhir/Ecommerce/assets/js/products.js"></script>
  <script src="/ProjekAkhir/Ecommerce/assets/js/checkout.js"></script>
</body>
</html>