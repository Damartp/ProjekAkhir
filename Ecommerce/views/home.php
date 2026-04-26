<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exclusive – E-Commerce Homepage</title>
  <link rel="stylesheet" href="/ProjekAkhir/Ecommerce/assets/css/home.css" />
</head>
<body>

  <!-- ===================== TOP BAR ===================== -->
  <div class="topbar">
    <p>Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%! <a href="#">Shop Now</a></p>
    <select>
      <option>English</option>
      <option>Bahasa</option>
    </select>
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
        <button class="search-btn" id="searchBtn" aria-label="Search">
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
      <a class="icon-btn cart-btn" aria-label="Cart" id="cartBtn" href="cart.php">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-count" id="cartCount">0</span>
      </a>
    </div>
  </nav>

  <!-- ===================== HERO SECTION ===================== -->
  <section class="hero-section">

    <!-- Sidebar Categories -->
    <aside class="sidebar">
      <ul>
        <li><a href="#">Woman's Fashion <span>›</span></a></li>
        <li><a href="#">Men's Fashion <span>›</span></a></li>
        <li><a href="#">Electronics</a></li>
        <li><a href="#">Home &amp; Lifestyle</a></li>
        <li><a href="#">Medicine</a></li>
        <li><a href="#">Sports &amp; Outdoor</a></li>
        <li><a href="#">Baby's &amp; Toys</a></li>
        <li><a href="#">Groceries &amp; Pets</a></li>
        <li><a href="#">Health &amp; Beauty</a></li>
      </ul>
    </aside>

    <!-- Hero Banner Slider -->
    <div class="hero-banner">
      <div class="slide active" id="slide-0">
        <div class="slide-content">
          <div class="slide-text">
            <div class="slide-brand">
              <svg width="18" height="18" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-36.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 69.7 0 127.9 45.5 171.5 45.5 42.1 0 108.2-48 186.8-48 30.2-.2 112.9 2.6 174.8 71.2zm-247.1-160.4c31.5-37.5 54.3-89.7 54.3-141.9 0-7.1-.6-14.3-1.9-20.1-51.5 2-112.4 34.3-149.2 75.8-28.5 32.4-55.1 84.7-55.1 137.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.5 0 102.8-29.9 136.4-70.7z"/></svg>
              iPhone 14 Series
            </div>
            <h2>Up to 10%<br>off Voucher</h2>
            <a href="#section" class="slide-link">Shop Now →</a>
          </div>
          <div class="slide-image">
            <div class="phone-mockup">
              <div class="phone-body">
                <div class="phone-screen"></div>
                <div class="phone-notch"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="slide" id="slide-1">
        <div class="slide-content">
          <div class="slide-text">
            <div class="slide-brand">🎮 Gaming</div>
            <h2>Best Gaming<br>Gear 2024</h2>
            <a href="#" class="slide-link">Shop Now →</a>
          </div>
          <div class="slide-image">
            <div class="gamepad-mockup">🎮</div>
          </div>
        </div>
      </div>

      <div class="slide" id="slide-2">
        <div class="slide-content">
          <div class="slide-text">
            <div class="slide-brand">🎵 Audio</div>
            <h2>Premium Sound<br>Experience</h2>
            <a href="#" class="slide-link">Shop Now →</a>
          </div>
          <div class="slide-image">
            <div class="speaker-mockup">🔊</div>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="slider-dots">
        <button class="dot active" data-slide="0"></button>
        <button class="dot" data-slide="1"></button>
        <button class="dot" data-slide="2"></button>
        <button class="dot" data-slide="3"></button>
        <button class="dot" data-slide="4"></button>
      </div>
    </div>

  </section>

  <!-- ===================== FLASH SALES ===================== -->
  <!-- id 1–5 sesuai PRODUCTS di home.js -->
  <section class="section flash-sales">
    <div class="section-label">
      <span class="label-bar"></span>
      <span class="label-text">Today's</span>
    </div>
    <div class="section-header">
      <h2 class="section-title">Flash Sales</h2>
      <div class="countdown" id="countdown">
        <div class="time-block"><span class="time-label">Days</span><span class="time-val" id="days">03</span></div>
        <span class="colon">:</span>
        <div class="time-block"><span class="time-label">Hours</span><span class="time-val" id="hours">23</span></div>
        <span class="colon">:</span>
        <div class="time-block"><span class="time-label">Minutes</span><span class="time-val" id="minutes">19</span></div>
        <span class="colon">:</span>
        <div class="time-block"><span class="time-label">Seconds</span><span class="time-val" id="seconds">56</span></div>
      </div>
      <div class="slider-arrows">
        <button class="arrow-btn" id="flashPrev">&#8592;</button>
        <button class="arrow-btn" id="flashNext">&#8594;</button>
      </div>
    </div>

    <div class="products-slider" id="flashSlider">

      <!-- id=1 → HAVIT HV-G92 Gamepad -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-red">-40%</span>
          <div class="product-img gamepad-img">🎮</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="1" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=1">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(1)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">HAVIT HV-G92 Gamepad</p>
          <div class="product-price">
            <span class="price-new">$120</span>
            <span class="price-old">$160</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(88)</span></div>
        </div>
      </div>

      <!-- id=2 → AK-900 Wired Keyboard -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-red">-35%</span>
          <div class="product-img keyboard-img">⌨️</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="2" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=2">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(2)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">AK-900 Wired Keyboard</p>
          <div class="product-price">
            <span class="price-new">$960</span>
            <span class="price-old">$1160</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(75)</span></div>
        </div>
      </div>

      <!-- id=3 → IPS LCD Gaming Monitor -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-red">-30%</span>
          <div class="product-img monitor-img">🖥️</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="3" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=3">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(3)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">IPS LCD Gaming Monitor</p>
          <div class="product-price">
            <span class="price-new">$370</span>
            <span class="price-old">$400</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(99)</span></div>
        </div>
      </div>

      <!-- id=4 → S-Series Comfort Chair -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-red">-25%</span>
          <div class="product-img chair-img">🪑</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="4" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=4">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(4)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">S-Series Comfort Chair</p>
          <div class="product-price">
            <span class="price-new">$375</span>
            <span class="price-old">$400</span>
          </div>
          <div class="stars">★★★★☆ <span class="review-count">(99)</span></div>
        </div>
      </div>

      <!-- id=5 → S-Series Gaming Laptop -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-red">-20%</span>
          <div class="product-img cpu-img">💻</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="5" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=5">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(5)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">S-Series Gaming Laptop</p>
          <div class="product-price">
            <span class="price-new">$699</span>
            <span class="price-old">$900</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(77)</span></div>
        </div>
      </div>

    </div>

    <div class="center-btn">
      <a href="#" class="btn-red">View All Products</a>
    </div>
    <hr class="divider" />
  </section>

  <!-- ===================== BROWSE BY CATEGORY ===================== -->
  <section class="section">
    <div class="section-label">
      <span class="label-bar"></span>
      <span class="label-text">Categories</span>
    </div>
    <div class="section-header">
      <h2 class="section-title">Browse By Category</h2>
      <div class="slider-arrows">
        <button class="arrow-btn" id="catPrev">&#8592;</button>
        <button class="arrow-btn" id="catNext">&#8594;</button>
      </div>
    </div>
    <div class="categories-grid" id="catSlider">
      <div class="cat-card"><div class="cat-icon">📱</div><p>Phones</p></div>
      <div class="cat-card"><div class="cat-icon">🖥️</div><p>Computers</p></div>
      <div class="cat-card"><div class="cat-icon">⌚</div><p>SmartWatch</p></div>
      <div class="cat-card active"><div class="cat-icon">📷</div><p>Camera</p></div>
      <div class="cat-card"><div class="cat-icon">🎧</div><p>HeadPhones</p></div>
      <div class="cat-card"><div class="cat-icon">🎮</div><p>Gaming</p></div>
    </div>
    <hr class="divider" />
  </section>

  <!-- ===================== BEST SELLING ===================== -->
  <!-- id 6–9 sesuai PRODUCTS di home.js -->
  <section class="section">
    <div class="section-label">
      <span class="label-bar"></span>
      <span class="label-text">This Month</span>
    </div>
    <div class="section-header">
      <h2 class="section-title">Best Selling Products</h2>
      <a href="#" class="btn-red">View All</a>
    </div>

    <div class="products-grid">

      <!-- id=6 → The north coat -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img jacket-img">🧥</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="6" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=6">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(6)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">The north coat</p>
          <div class="product-price">
            <span class="price-new">$23</span>
            <span class="price-old">$260</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(65)</span></div>
        </div>
      </div>

      <!-- id=7 → Gucci duffle bag -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img bag-img">👜</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="7" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=7">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(7)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Gucci duffle bag</p>
          <div class="product-price">
            <span class="price-new">$960</span>
            <span class="price-old">$1160</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(65)</span></div>
        </div>
      </div>

      <!-- id=8 → RGB liquid CPU Cooler -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img cpu2-img">🖥️</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="8" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=8">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(8)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">RGB liquid CPU Cooler</p>
          <div class="product-price">
            <span class="price-new">$160</span>
            <span class="price-old">$170</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(65)</span></div>
        </div>
      </div>

      <!-- id=9 → Small BookSelf -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img bookshelf-img">📚</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="9" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=9">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(9)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Small BookSelf</p>
          <div class="product-price">
            <span class="price-new">$360</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(65)</span></div>
        </div>
      </div>

    </div>
  </section>

  <!-- ===================== MUSIC BANNER ===================== -->
  <section class="music-banner">
    <div class="music-banner-content">
      <div class="music-text">
        <div class="section-label">
          <span class="label-bar"></span>
          <span class="label-text" style="color:#fff;">Categories</span>
        </div>
        <h2>Enhance Your<br>Music Experience</h2>
        <div class="music-countdown">
          <div class="music-time"><span class="mt-val" id="mHours">22</span><span class="mt-label">Hours</span></div>
          <div class="music-time"><span class="mt-val" id="mDays">05</span><span class="mt-label">Days</span></div>
          <div class="music-time"><span class="mt-val" id="mMinutes">59</span><span class="mt-label">Minutes</span></div>
          <div class="music-time"><span class="mt-val" id="mSeconds">35</span><span class="mt-label">Seconds</span></div>
        </div>
        <a href="#" class="btn-green">Buy Now!</a>
      </div>
      <div class="music-img">
        <div class="speaker-art">🔊</div>
      </div>
    </div>
  </section>

  <!-- ===================== EXPLORE PRODUCTS ===================== -->
  <!-- id 10–17 sesuai PRODUCTS di home.js -->
  <section class="section" id="section">
    <div class="section-label">
      <span class="label-bar"></span>
      <span class="label-text">Our Products</span>
    </div>
    <div class="section-header">
      <h2 class="section-title">Explore Our Products</h2>
      <div class="slider-arrows">
        <button class="arrow-btn">&#8592;</button>
        <button class="arrow-btn">&#8594;</button>
      </div>
    </div>

    <div class="products-grid">

      <!-- id=10 → Breed Dry Dog Food -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img dogfood-img">🐶</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="10" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=10">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(10)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Breed Dry Dog Food</p>
          <div class="product-price"><span class="price-new">$100</span></div>
          <div class="stars">★★★☆☆ <span class="review-count">(35)</span></div>
        </div>
      </div>

      <!-- id=11 → CANON EOS DSLR Camera -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img camera-img">📷</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="11" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=11">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(11)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">CANON EOS DSLR Camera</p>
          <div class="product-price"><span class="price-new">$360</span></div>
          <div class="stars">★★★★★ <span class="review-count">(95)</span></div>
        </div>
      </div>

      <!-- id=12 → ASUS FHD Gaming Laptop -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img laptop-img">💻</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="12" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=12">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(12)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">ASUS FHD Gaming Laptop</p>
          <div class="product-price"><span class="price-new">$700</span></div>
          <div class="stars">★★★★★ <span class="review-count">(325)</span></div>
        </div>
      </div>

      <!-- id=13 → Curology Product Set -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img skincare-img">🧴</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="13" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=13">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(13)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Curology Product Set</p>
          <div class="product-price"><span class="price-new">$500</span></div>
          <div class="stars">★★★★★ <span class="review-count">(145)</span></div>
        </div>
      </div>

      <!-- id=14 → Kids Electric Car -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-green">NEW</span>
          <div class="product-img car-img">🚗</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="14" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=14">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(14)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Kids Electric Car</p>
          <div class="product-price">
            <span class="price-new">$960</span>
            <span class="price-old">$1160</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(65)</span></div>
          <div class="color-dots"><span class="dot-red"></span><span class="dot-dark"></span></div>
        </div>
      </div>

      <!-- id=15 → Jr. Zoom Soccer Cleats -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-green">NEW</span>
          <div class="product-img shoes-img">👟</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="15" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=15">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(15)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Jr. Zoom Soccer Cleats</p>
          <div class="product-price">
            <span class="price-new">$1160</span>
            <span class="price-old">$1600</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(35)</span></div>
          <div class="color-dots"><span class="dot-red"></span><span class="dot-gold"></span></div>
        </div>
      </div>

      <!-- id=16 → GP11 Shooter USB Gamepad -->
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="badge badge-green">NEW</span>
          <div class="product-img gamepad2-img">🎮</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="16" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=16">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(16)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">GP11 Shooter USB Gamepad</p>
          <div class="product-price">
            <span class="price-new">$660</span>
            <span class="price-old">$1160</span>
          </div>
          <div class="stars">★★★★★ <span class="review-count">(55)</span></div>
          <div class="color-dots"><span class="dot-red"></span><span class="dot-dark"></span></div>
        </div>
      </div>

      <!-- id=17 → Quilted Satin Jacket -->
      <div class="product-card">
        <div class="product-img-wrap">
          <div class="product-img jacket2-img">🧥</div>
          <div class="product-actions">
            <button class="wish-btn" data-id="17" aria-label="Wishlist">♥</button>
            <a class="view-btn" aria-label="View" href="details.php?id=17">👁</a>
          </div>
          <button class="add-cart-btn" onclick="addToCart(17)">Add To Cart</button>
        </div>
        <div class="product-info">
          <p class="product-name">Quilted Satin Jacket</p>
          <div class="product-price"><span class="price-new">$660</span></div>
          <div class="stars">★★★★★ <span class="review-count">(55)</span></div>
          <div class="color-dots"><span class="dot-green"></span><span class="dot-dark"></span></div>
        </div>
      </div>

    </div>

    <div class="center-btn">
      <a href="#" class="btn-red">View All Products</a>
    </div>
  </section>

  <!-- ===================== NEW ARRIVAL ===================== -->
  <section class="section new-arrival">
    <div class="section-label">
      <span class="label-bar"></span>
      <span class="label-text">Featured</span>
    </div>
    <h2 class="section-title" style="margin-bottom:24px;">New Arrival</h2>

    <div class="arrival-grid">
      <div class="arrival-card arrival-big">
        <div class="arrival-bg ps5-bg">
          <div class="ps5-art">🎮</div>
        </div>
        <div class="arrival-info">
          <h3>PlayStation 5</h3>
          <p>Black and White version of the PS5<br>coming out on sale.</p>
          <a href="#">Shop Now</a>
        </div>
      </div>

      <div class="arrival-right">
        <div class="arrival-card arrival-top-right">
          <div class="arrival-bg women-bg">
            <div class="women-art">👗</div>
          </div>
          <div class="arrival-info">
            <h3>Women's Collections</h3>
            <p>Featured woman collections that give you another vibe.</p>
            <a href="#">Shop Now</a>
          </div>
        </div>

        <div class="arrival-bottom">
          <div class="arrival-card arrival-small">
            <div class="arrival-bg speaker-bg">
              <div class="speaker-art2">🔊</div>
            </div>
            <div class="arrival-info">
              <h3>Speakers</h3>
              <p>Amazon wireless speakers</p>
              <a href="#">Shop Now</a>
            </div>
          </div>
          <div class="arrival-card arrival-small">
            <div class="arrival-bg perfume-bg">
              <div class="perfume-art">🧴</div>
            </div>
            <div class="arrival-info">
              <h3>Perfume</h3>
              <p>GUCCI INTENSE OUD EDP</p>
              <a href="#">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== SERVICE FEATURES ===================== -->
  <section class="features-section">
    <div class="feature-item">
      <div class="feature-icon">🚚</div>
      <h4>FREE AND FAST DELIVERY</h4>
      <p>Free delivery for all orders over $140</p>
    </div>
    <div class="feature-item">
      <div class="feature-icon">🎧</div>
      <h4>24/7 CUSTOMER SERVICE</h4>
      <p>Friendly 24/7 customer support</p>
    </div>
    <div class="feature-item">
      <div class="feature-icon">✅</div>
      <h4>MONEY BACK GUARANTEE</h4>
      <p>We return money within 30 days</p>
    </div>
  </section>

  <!-- ===================== FOOTER ===================== -->
  <footer class="footer">
    <div class="footer-col">
      <h3 class="footer-logo">Exclusive</h3>
      <p class="footer-heading">Subscribe</p>
      <p class="footer-sub">Get 10% off your first order</p>
      <div class="email-subscribe">
        <input type="email" placeholder="Enter your email" id="footerEmail" />
        <button aria-label="Subscribe" onclick="subscribeEmail()">&#10132;</button>
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
        <li><a href="wishlist.php">Wishlist</a></li>
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

  <div class="footer-bottom">
    <p>© Copyright Rimel 2022. All rights reserved</p>
  </div>

  <!-- Scroll to Top -->
  <button class="scroll-top" id="scrollTop" aria-label="Scroll to top">↑</button>

  <!-- Cart Toast -->
  <div class="cart-toast" id="cartToast"></div>

  <script src="/ProjekAkhir/Ecommerce/assets/js/home.js"></script>
</body>
</html>