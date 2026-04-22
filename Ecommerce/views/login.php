<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – Sign Up</title>
  <link rel="stylesheet" href="/ProjekAkhir/Ecommerce/assets/css/login.css" />
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <span class="logo">Exclusive</span>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">About</a></li>
      <li><a href="register.php" class="active">Register </a></li>
    </ul>
    <div class="search-box">
      <input type="text" placeholder="What are you looking for?" />
      <button class="search-btn" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </div>
  </nav>

  <!-- MAIN SECTION -->
  <main class="main-section">

    <!-- LEFT: Illustration -->
    <div class="illustration-side">
      <svg class="hero-svg" viewBox="0 0 380 360" xmlns="http://www.w3.org/2000/svg">
        <!-- Phone body -->
        <rect x="55" y="50" width="95" height="170" rx="12" fill="#1a1a1a"/>
        <rect x="61" y="65" width="83" height="140" rx="5" fill="#111827"/>
        <rect x="90" y="57" width="22" height="5" rx="2.5" fill="#333"/>
        <circle cx="102" cy="224" r="5" fill="#444"/>
        <rect x="63" y="67" width="79" height="136" rx="4" fill="#1e3a5f"/>

        <!-- Shopping cart -->
        <g transform="translate(108, 145)">
          <rect x="0" y="15" width="105" height="75" rx="5" fill="#b0b0b0"/>
          <rect x="0" y="15" width="105" height="14" rx="5" fill="#959595"/>
          <line x1="0" y1="36" x2="105" y2="36" stroke="#888" stroke-width="1"/>
          <rect x="8" y="40" width="32" height="5" rx="2" fill="#777"/>
          <rect x="8" y="50" width="55" height="5" rx="2" fill="#777"/>
          <rect x="8" y="60" width="44" height="5" rx="2" fill="#777"/>
          <line x1="8" y1="28" x2="20" y2="17" stroke="#ccc" stroke-width="2.5"/>
          <line x1="97" y1="28" x2="85" y2="17" stroke="#ccc" stroke-width="2.5"/>
          <line x1="8" y1="90" x2="20" y2="90" stroke="#ccc" stroke-width="2.5"/>
          <line x1="97" y1="90" x2="85" y2="90" stroke="#ccc" stroke-width="2.5"/>
          <circle cx="22" cy="96" r="7" fill="#999"/>
          <circle cx="83" cy="96" r="7" fill="#999"/>
          <circle cx="22" cy="96" r="3" fill="#777"/>
          <circle cx="83" cy="96" r="3" fill="#777"/>
        </g>

        <!-- Shadow -->
        <ellipse cx="160" cy="258" rx="70" ry="12" fill="#a0a0c0" opacity="0.3"/>

        <!-- Pink bag -->
        <rect x="118" y="208" width="48" height="54" rx="5" fill="#e896c8"/>
        <rect x="130" y="197" width="16" height="14" rx="3" fill="#c060a0"/>
        <line x1="130" y1="197" x2="130" y2="210" stroke="#a04080" stroke-width="1.5"/>
        <line x1="146" y1="197" x2="146" y2="210" stroke="#a04080" stroke-width="1.5"/>

        <!-- Purple bag -->
        <rect x="165" y="215" width="44" height="48" rx="5" fill="#b878d0"/>
        <rect x="178" y="205" width="14" height="12" rx="3" fill="#9050b0"/>
        <line x1="178" y1="205" x2="178" y2="216" stroke="#7030a0" stroke-width="1.5"/>
        <line x1="192" y1="205" x2="192" y2="216" stroke="#7030a0" stroke-width="1.5"/>

        <!-- Heart badge -->
        <circle cx="62" cy="105" r="14" fill="#ff4d4d"/>
        <text x="55" y="111" font-size="13" fill="white">♥</text>

        <!-- Eye badge -->
        <circle cx="62" cy="138" r="14" fill="#f5f5f5"/>
        <text x="55" y="144" font-size="13" fill="#555">👁</text>
      </svg>
    </div>

    <!-- RIGHT: Sign Up Form -->
    <div class="form-side">
      <div class="form-container">
        <h1>Login to your account</h1>
        <p class="subtitle">Enter your details below</p>

        <div class="form-group">
          <input type="text" id="name" placeholder="Name" />
        </div>
        <div class="form-group">
          <input type="email" id="email" placeholder="Email or Phone Number" />
        </div>
        <div class="form-group">
          <input type="password" id="password" placeholder="Password" />
        </div>

        <button class="btn-primary" id="createBtn">Login</button>

       

        <p class="login-link">don't have an account yet? <a href="register.php">Register</a></p>
      </div>
    </div>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-col">
      <h3 class="footer-logo">Exclusive</h3>
      <p class="footer-heading">Subscribe</p>
      <p class="footer-sub">Get 10% off your first order</p>
      <div class="email-subscribe">
        <input type="email" placeholder="Enter your email" />
        <button aria-label="Subscribe">&#10132;</button>
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
        <li><a href="#">My Account</a></li>
        <li><a href="#">Login / Register</a></li>
        <li><a href="#">Cart</a></li>
        <li><a href="#">Wishlist</a></li>
        <li><a href="#">Shop</a></li>
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="#" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
  </footer>

  <script src="/ProjekAkhir/Ecommerce/assets/js/login.js"></script>

</body>
</html>