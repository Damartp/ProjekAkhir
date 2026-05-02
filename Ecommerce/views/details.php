<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – Product Detail</title>
  <link rel="stylesheet" href="/ProjekAkhir/Ecommerce/assets/css/details.css" />
</head>
<body>

  <!-- ===================== TOP BAR ===================== -->
  <div class="topbar">
    <p>Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%! <a href="home.php">Shop Now</a></p>
    <select><option>English</option><option>Bahasa</option></select>
  </div>

  <!-- ===================== NAVBAR ===================== -->
  <nav class="navbar">
    <span class="logo">Exclusive</span>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">About</a></li>
      <li><a href="register.php">Sign Up</a></li>
    </ul>
    <div class="nav-actions">
      <div class="search-box">
        <input type="text" placeholder="What are you looking for?" id="searchInput" />
        <button class="search-btn" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
      <a href="wishlist.php" class="icon-btn" aria-label="Wishlist">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </a>
      <a href="cart.php" class="icon-btn" aria-label="Cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-count" id="cartCount">0</span>
      </a>
      <button class="icon-btn" aria-label="Account">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
    </div>
  </nav>

  <!-- ===================== BREADCRUMB ===================== -->
  <div class="breadcrumb">
    <a href="home.php">Account</a>
    <span>/</span>
    <a href="#">Gaming</a>
    <span>/</span>
    <span class="current" id="breadcrumbName">Product</span>
  </div>

  <!-- ===================== PRODUCT DETAIL ===================== -->
  <main class="main-content">
    <div class="product-detail-wrap">

      <!-- LEFT: Single Product Image -->
      <div class="product-gallery">
        <div class="main-img-wrap">
          <div class="main-img" id="mainImg">📦</div>
        </div>
      </div>

      <!-- RIGHT: Product Info -->
      <div class="product-info">
        <h1 class="product-title" id="productName">Product Name</h1>

        <div class="product-rating">
          <span class="stars" id="productStars">★★★★★</span>
          <span class="review-count" id="productReviews">(150 Reviews)</span>
          <span class="in-stock">| In Stock</span>
        </div>

        <div class="product-price-detail" id="productPrice">$192.00</div>

        <p class="product-desc" id="productDesc">
          PlayStation 5 Controller Skin – High quality vinyl with air channel adhesive for easy bubble free install &amp; mess free removal. Pressure sensitive.
        </p>

        <hr class="divider" />

        <!-- Colours -->
        <div class="option-row">
          <span class="option-label">Colours:</span>
          <div class="color-options">
            <button class="color-dot red active" data-color="red" title="Red"></button>
            <button class="color-dot black" data-color="black" title="Black"></button>
          </div>
        </div>

        <!-- Size -->
        <div class="option-row">
          <span class="option-label">Size:</span>
          <div class="size-options">
            <button class="size-btn" data-size="XS">XS</button>
            <button class="size-btn" data-size="S">S</button>
            <button class="size-btn active" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
            <button class="size-btn" data-size="XL">XL</button>
          </div>
        </div>

        <!-- Qty + Buy Now + Wishlist -->
        <div class="action-row">
          <div class="qty-wrap">
            <button class="qty-btn" id="qtyMinus">−</button>
            <input class="qty-input" type="number" id="qtyInput" value="1" min="1" />
            <button class="qty-btn" id="qtyPlus">+</button>
          </div>
          <button class="btn-red" id="buyNowBtn">Buy Now</button>
          <button class="wish-detail-btn" id="wishDetailBtn" title="Add to Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <!-- Delivery Info -->
        <div class="delivery-box">
          <div class="delivery-item">
            <div class="delivery-icon">🚚</div>
            <div class="delivery-text">
              <strong>Free Delivery</strong>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <hr />
          <div class="delivery-item">
            <div class="delivery-icon">🔄</div>
            <div class="delivery-text">
              <strong>Return Delivery</strong>
              <p>Free 30 Days Delivery Returns. <a href="#">Details</a></p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ===================== RELATED ITEMS ===================== -->
    <div class="section-label" style="margin-top:60px;">
      <span class="label-bar"></span>
      <span class="label-text">Related Item</span>
    </div>

    <div class="related-grid" id="relatedGrid">
      <!-- Populated by JS -->
    </div>

  </main>

  <!-- ===================== FOOTER ===================== -->
  <footer class="footer">
    <div class="footer-col">
      <h3 class="footer-logo">Exclusive</h3>
      <p class="footer-heading">Subscribe</p>
      <p class="footer-sub">Get 10% off your first order</p>
      <div class="email-subscribe">
        <input type="email" placeholder="Enter your email" />
        <button>&#10132;</button>
      </div>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Support</p>
      <p>111 Bijoy sarani, Dhaka,<br>DH 1515, Bangladesh.</p>
      <p>exclusive@gmail.com</p>
      <p>+88015-88888-9999</p>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Account</p>
      <ul>
        <li><a href="account.php">My Account</a></li>
        <li><a href="login.php">Login / Register</a></li>
        <li><a href="cart.php">Cart</a></li>
        <li><a href="wishlist.php">Wishlist</a></li>
        <li><a href="home.php">Shop</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Quick Link</p>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms Of Use</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Download App</p>
      <p class="footer-sub">Save $3 with App New User Only</p>
      <div class="app-badges">
        <div class="qr-placeholder">▦</div>
        <div class="store-buttons">
          <a href="#" class="store-btn">Google Play</a>
          <a href="#" class="store-btn">App Store</a>
        </div>
      </div>
      <div class="social-icons">
        <a href="#" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="#" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <div class="footer-bottom">© Copyright Rimel 2022. All rights reserved</div>

  <!-- Toast -->
  <div class="toast" id="toast"></div>

  <script src="/ProjekAkhir/Ecommerce/assets/js/products.js"></script>
  <script src="/ProjekAkhir/Ecommerce/assets/js/details.js"></script>
</body>
</html>