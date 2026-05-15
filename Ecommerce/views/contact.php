<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – Contact</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../assets/css/contact.css"/>
</head>
<body>

  <!-- ========== NAVBAR ========== -->
  <header class="navbar">
    <div class="nav-container">
      <a href="home.php" class="logo">Exclusive</a>
      <nav class="nav-links">
        <a href="home.php">Home</a>
        <a href="contact.php" class="active">Contact</a>
        <a href="about.php">About</a>
        <a href="register.php">Sign Up</a>
      </nav>
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
      <a href="account.php" class="icon-btn" aria-label="Account" title="Account"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- ========== MAIN ========== -->
  <main>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a href="home.php">Home</a>
      <span>/</span>
      <span class="current">Contact</span>
    </div>

    <!-- Contact Section -->
    <section class="contact-section">

      <!-- Left: Info Cards -->
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="info-content">
            <h3>Call To Us</h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +88001611112222</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" stroke="white" fill="none" stroke-width="1"/></svg>
          </div>
          <div class="info-content">
            <h3>Write To US</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>
      </div>

      <!-- Right: Contact Form -->
      <div class="contact-form-wrapper">
        <div class="form-row">
          <div class="input-group">
            <input type="text" id="name" placeholder=" " required />
            <label for="name">Your Name *</label>
          </div>
          <div class="input-group">
            <input type="email" id="email" placeholder=" " required />
            <label for="email">Your Email *</label>
          </div>
          <div class="input-group">
            <input type="tel" id="phone" placeholder=" " />
            <label for="phone">Your Phone *</label>
          </div>
        </div>
        <div class="input-group textarea-group">
          <textarea id="message" placeholder=" " rows="8"></textarea>
          <label for="message">Your Message</label>
        </div>
        <div class="form-footer">
          <button class="btn-send" id="sendBtn">
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <!-- Success message (hidden by default) -->
        <div class="success-msg" id="successMsg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Message sent successfully!
        </div>
      </div>

    </section>
  </main>

  <!-- ========== FOOTER ========== -->
  <footer class="footer">
    <div class="footer-container">

      <!-- Brand -->
      <div class="footer-col brand-col">
        <h2 class="footer-logo">Exclusive</h2>
        <h4>Subscribe</h4>
        <p>Get 10% off your first order</p>
        <div class="subscribe-box">
          <input type="email" placeholder="Enter your email" />
          <button aria-label="Subscribe">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <!-- Support -->
      <div class="footer-col">
        <h4>Support</h4>
        <address>
          111 Bijoy sarani, Dhaka,<br/>DH 1515, Bangladesh.
        </address>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>

      <!-- Account -->
      <div class="footer-col">
        <h4>Account</h4>
        <ul>
          <li><a href="account.php">My Account</a></li>
          <li><a href="login.php">Login / Register</a></li>
          <li><a href="cart.php">Cart</a></li>
          <li><a href="wishlist.php">Wishlist</a></li>
          <li><a href="home.php#section-explore">Shop</a></li>
        </ul>
      </div>

      <!-- Quick Link -->
      <div class="footer-col">
        <h4>Quick Link</h4>
        <ul>
          <li><a href="home.php#section-footer">Privacy Policy</a></li>
          <li><a href="home.php#section-footer">Terms Of Use</a></li>
          <li><a href="home.php#section-features">FAQ</a></li>
          <li><a href="contact.php">Contact</a></li>
        </ul>
      </div>

      <!-- Download App -->
      <div class="footer-col">
        <h4>Download App</h4>
        <p class="app-save">Save $3 with App New User Only</p>
        <div class="app-qr-row">
          <div class="qr-placeholder">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="2" fill="white" opacity=".15"/>
              <rect x="6" y="6" width="16" height="16" rx="1" fill="white" opacity=".25"/>
              <rect x="34" y="2" width="24" height="24" rx="2" fill="white" opacity=".15"/>
              <rect x="38" y="6" width="16" height="16" rx="1" fill="white" opacity=".25"/>
              <rect x="2" y="34" width="24" height="24" rx="2" fill="white" opacity=".15"/>
              <rect x="6" y="38" width="16" height="16" rx="1" fill="white" opacity=".25"/>
              <rect x="34" y="34" width="8" height="8" rx="1" fill="white" opacity=".25"/>
              <rect x="46" y="34" width="8" height="8" rx="1" fill="white" opacity=".25"/>
              <rect x="34" y="46" width="8" height="8" rx="1" fill="white" opacity=".25"/>
              <rect x="46" y="46" width="8" height="8" rx="1" fill="white" opacity=".25"/>
            </svg>
          </div>
          <div class="store-btns">
            <a href="https://play.google.com/store" target="_blank" rel="noopener" class="store-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.5c.36.2.78.2 1.14 0l10.5-6.06-2.62-2.62L3.18 23.5zM20.5 10.56l-2.78-1.6-2.96 2.95 2.96 2.96 2.8-1.62a1.5 1.5 0 0 0 0-2.69zM1.5 1.13A1.5 1.5 0 0 0 1 2.5v19a1.5 1.5 0 0 0 .5 1.13l.09.07 10.63-10.63v-.25L1.59 1.06l-.09.07zM4.32.5L14.82 6.56l-2.62 2.62L4.32.5z"/></svg>
              Google Play
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener" class="store-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
          </div>
        </div>
        <div class="social-links">
          <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>

    </div>
    <div class="footer-bottom">
      <p>© Copyright Exclusive 2022. All rights reserved.</p>
    </div>
  </footer>


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

  <script src="../assets/js/contact.js"></script>
</body>
</html>
