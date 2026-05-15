<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About – Exclusive</title>
  <link rel="stylesheet" href="../assets/css/about.css" />
  <link rel="stylesheet" href="../assets/css/chatbot.css" />
</head>
<body>

  
  

  <!-- NAVBAR -->
  <nav class="navbar">
    <a class="logo" href="home.php">Exclusive</a>
    <ul class="nav-links">
      <li><a href="home.php">Home</a></li>
      <li><a href="contact.php">Contact</a></li>
      <li><a href="about.php" class="active">About</a></li>
      <li><a href="register.php">Sign Up</a></li>
    </ul>
    <div class="nav-actions">
      <!-- CHATBOT BUTTON -->
      <button class="icon-btn chatbot-toggle-btn" id="chatbotToggle" aria-label="Chatbot Assistant" title="Ask Assistant">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="13" rx="3"/>
          <path d="M8 16v3l4-3h5"/>
          <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </button>
      <a href="wishlist.php" class="icon-btn" aria-label="Wishlist" title="Wishlist"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></a>
      <a href="cart.php" class="icon-btn" aria-label="Cart" title="Cart"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></a>
      <a href="account.php" class="icon-btn" aria-label="Account" title="Account"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>
    </div>
  </nav>

  <!-- BREADCRUMB -->
  <div class="breadcrumb">
    <a href="home.php">Home</a>
    <span>/</span>
    <span>About</span>
  </div>

  <!-- MAIN -->
  <main class="main-content">

    <!-- OUR STORY -->
    <section class="story-section">
      <div class="story-text">
        <h1 class="story-title">Our Story</h1>
        <p>Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.</p>
        <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.</p>
      </div>
      <div class="story-image">
        <img src="../image/about-hero.jpg" alt="Our Story"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"/>
        <div class="story-img-placeholder">
          <span>🛍️</span>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">🏪</div>
        <div class="stat-number">10.5k</div>
        <div class="stat-label">Sellers active on our site</div>
      </div>
      <div class="stat-card active">
        <div class="stat-icon">💰</div>
        <div class="stat-number">33k</div>
        <div class="stat-label">Monthly Product Sale</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🛒</div>
        <div class="stat-number">45.5k</div>
        <div class="stat-label">Customer active on our site</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💸</div>
        <div class="stat-number">25k</div>
        <div class="stat-label">Annual gross sale on our site</div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features-section">
      <div class="feature-item">
        <div class="feature-icon">🚚</div>
        <h3>FREE AND FAST DELIVERY</h3>
        <p>Free delivery for all orders over $140</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🎧</div>
        <h3>24/7 CUSTOMER SERVICE</h3>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">✅</div>
        <h3>MONEY BACK GUARANTEE</h3>
        <p>We return money within 30 days</p>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-col">
      <div class="footer-logo">Exclusive</div>
      <p class="footer-heading">Subscribe</p>
      <p class="footer-sub">Get 10% off your first order</p>
      <div class="email-subscribe">
        <input type="email" placeholder="Enter your email" />
        <button>➤</button>
      </div>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Support</p>
      <ul>
        <li><a href="https://maps.google.com?q=111+Bijoy+sarani+Dhaka" target="_blank" rel="noopener">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</a></li>
        <li><a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a></li>
        <li><a href="tel:+88015888889999">+88015-88888-9999</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Account</p>
      <ul>
        <li><a href="account.php">My Account</a></li>
        <li><a href="login.php">Login / Register</a></li>
        <li><a href="cart.php">Cart</a></li>
        <li><a href="wishlist.php">Wishlist</a></li>
        <li><a href="home.php#section-explore">Shop</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Quick Link</p>
      <ul>
        <li><a href="home.php#section-footer">Privacy Policy</a></li>
        <li><a href="home.php#section-footer">Terms Of Use</a></li>
        <li><a href="home.php#section-features">FAQ</a></li>
        <li><a href="contact.php">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-heading">Download App</p>
      <p class="footer-sub">Save $3 with App New User Only</p>
      <div class="app-badges">
        <div class="qr-placeholder">▣</div>
        <div class="store-buttons">
          <a class="store-btn" href="https://play.google.com/store" target="_blank" rel="noopener">Google Play</a>
          <a class="store-btn" href="https://www.apple.com/app-store/" target="_blank" rel="noopener">App Store</a>
        </div>
      </div>
      <div class="social-icons">
        <a href="https://facebook.com/" target="_blank" rel="noopener">𝕏</a>
        <a href="https://twitter.com/" target="_blank" rel="noopener">𝕗</a>
        <a href="https://instagram.com/" target="_blank" rel="noopener">📷</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener">in</a>
      </div>
    </div>
  </footer>
  <div class="footer-bottom">© Copyright Rimel 2022. All right reserved</div>


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
        <div class="chat-bubble">Halo! 👋 Saya asisten <strong>Exclusive</strong>. Ada yang bisa saya bantu?<br><br>
        Tanya saya tentang:<br>
        🔥 Flash Sales · ❤️ Wishlist · 🛒 Cart · 🚚 Pengiriman · 🏷️ Promo
        </div>
      </div>
    </div>
    <div class="chatbot-suggestions" id="chatbotSuggestions">
      <button onclick="chatSend('Apa itu Flash Sales?')">🔥 Flash Sales</button>
      <button onclick="chatSend('Cara pakai wishlist?')">❤️ Wishlist</button>
      <button onclick="chatSend('Cara beli produk?')">🛒 Cara Beli</button>
      <button onclick="chatSend('Promo apa yang ada?')">🏷️ Promo</button>
    </div>
    <div class="chatbot-input-area">
      <input type="text" id="chatbotInput" placeholder="Ketik pertanyaan..." autocomplete="off"/>
      <button id="chatbotSend">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>

  <script src="../assets/js/about.js"></script>
</body>
</html>
