// ===========================
// CHATBOT — chatbot.js
// Load SETELAH semua JS lain
// ===========================

document.addEventListener('DOMContentLoaded', function () {

  const chatbotWidget  = document.getElementById('chatbotWidget');
  const chatbotToggle  = document.getElementById('chatbotToggle');
  const chatbotClose   = document.getElementById('chatbotClose');
  const chatbotInput   = document.getElementById('chatbotInput');
  const chatbotSendBtn = document.getElementById('chatbotSend');
  const chatbotMsgs    = document.getElementById('chatbotMessages');

  if (!chatbotWidget || !chatbotToggle) return;

  // ===========================
  // TOGGLE BUKA / TUTUP
  // ===========================
  chatbotToggle.addEventListener('click', function () {
    chatbotWidget.classList.toggle('open');
    if (chatbotWidget.classList.contains('open') && chatbotInput) {
      chatbotInput.focus();
    }
  });

  if (chatbotClose) {
    chatbotClose.addEventListener('click', function () {
      chatbotWidget.classList.remove('open');
    });
  }

  // ===========================
  // KIRIM PESAN
  // ===========================
  if (chatbotSendBtn) {
    chatbotSendBtn.addEventListener('click', function () { chatSend(); });
  }
  if (chatbotInput) {
    chatbotInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') chatSend();
    });
  }

  window.chatSend = function (text) {
    const msg = text || (chatbotInput ? chatbotInput.value.trim() : '');
    if (!msg) return;
    if (chatbotInput) chatbotInput.value = '';

    appendMsg(msg, 'user');

    const sugg = document.getElementById('chatbotSuggestions');
    if (sugg) sugg.style.display = 'none';

    showTyping();
    setTimeout(function () {
      removeTyping();
      appendMsg(chatbotReply(msg), 'bot');
    }, 500);
  };

  // ===========================
  // APPEND PESAN
  // ===========================
  function appendMsg(text, sender) {
    if (!chatbotMsgs) return;
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg ' + sender;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text;
    wrap.appendChild(bubble);
    chatbotMsgs.appendChild(wrap);
    chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
  }

  // ===========================
  // TYPING INDICATOR
  // ===========================
  function showTyping() {
    if (!chatbotMsgs) return;
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg bot typing-wrap';
    wrap.id = 'typingIndicator';
    wrap.innerHTML = '<div class="chat-bubble typing-bubble">' +
      '<span class="typing-dot"></span>' +
      '<span class="typing-dot"></span>' +
      '<span class="typing-dot"></span>' +
      '</div>';
    chatbotMsgs.appendChild(wrap);
    chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  // ===========================
  // LOGIKA BALASAN
  // ===========================
  function chatbotReply(input) {
    const q          = input.toLowerCase();
    const path       = window.location.pathname;
    const isCheckout = path.includes('checkout');
    const isAccount  = path.includes('account');
    const isCart     = path.includes('cart');
    const isWishlist = path.includes('wishlist');

    if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return 'Halo! 👋 Selamat datang di <strong>Exclusive</strong>! Ada yang bisa saya bantu?';
    }
    if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks') || q.includes('thank')) {
      return 'Sama-sama! 😊 Ada lagi yang ingin ditanyakan?';
    }

    // Checkout
    if (isCheckout) {
      if (q.includes('bayar') || q.includes('payment') || q.includes('metode') || q.includes('transfer') || q.includes('gopay') || q.includes('ovo') || q.includes('dana') || q.includes('cod')) {
        return '💳 <strong>Metode pembayaran:</strong><br>• 🏦 Bank Transfer<br>• 💚 GoPay<br>• 💜 OVO<br>• 💙 DANA<br>• 🚚 Cash on Delivery';
      }
      if (q.includes('order') || q.includes('pesan') || q.includes('place')) {
        return '📦 <strong>Cara order:</strong><br>1. Isi <strong>Kota</strong> & <strong>Alamat</strong><br>2. Pilih <strong>metode pembayaran</strong><br>3. Klik <strong>"Place Order"</strong>';
      }
      if (q.includes('alamat') || q.includes('kota') || q.includes('billing')) {
        return '📍 Isi <strong>Kota</strong> dan <strong>Alamat lengkap</strong>. Nama & email terisi otomatis dari akun kamu.';
      }
    }

    // Account
    if (isAccount) {
      if (q.includes('batal') || q.includes('cancel')) {
        return '❌ Buka tab <strong>🧾 History Order</strong> → cari order → klik <strong>"Batalkan Order"</strong>.';
      }
      if (q.includes('history') || q.includes('riwayat') || q.includes('pesanan')) {
        return '🧾 Klik tab <strong>"🧾 History Order"</strong> untuk melihat semua riwayat belanja.';
      }
      if (q.includes('password') || q.includes('ganti pass')) {
        return '🔐 Klik <strong>"👤 Profil Saya"</strong> → isi password lama & baru → klik <strong>"Simpan Password"</strong>.';
      }
      if (q.includes('logout') || q.includes('keluar')) {
        return '🚪 Klik tombol <strong>"Logout"</strong> di bagian bawah menu kiri.';
      }
    }

    // Cart
    if (isCart) {
      if (q.includes('kupon') || q.includes('voucher') || q.includes('kode') || q.includes('diskon')) {
        return '🏷️ Masukkan kode kupon di kolom <strong>"Coupon Code"</strong> lalu klik <strong>"Apply Coupon"</strong>.<br>Kode aktif: <strong>RPL</strong> (diskon 10%)';
      }
      if (q.includes('checkout') || q.includes('bayar') || q.includes('pesan')) {
        return '✅ Klik tombol <strong>"Proceed to Checkout"</strong> di bagian Cart Total untuk melanjutkan pembayaran.';
      }
      if (q.includes('hapus') || q.includes('remove') || q.includes('delete')) {
        return '🗑️ Klik tombol <strong>✕</strong> di sebelah kanan produk untuk menghapus dari cart.';
      }
    }

    // Wishlist
    if (isWishlist) {
      if (q.includes('pindah') || q.includes('bag') || q.includes('cart') || q.includes('keranjang')) {
        return '🛒 Klik <strong>"Move All To Bag"</strong> untuk memindahkan semua wishlist ke cart, atau klik <strong>"Add To Cart"</strong> pada produk tertentu.';
      }
      if (q.includes('hapus') || q.includes('remove') || q.includes('delete')) {
        return '🗑️ Klik ikon ❤️ pada produk untuk menghapus dari wishlist.';
      }
    }

    // Shared
    if (q.includes('flash') || q.includes('sale')) {
      return '🔥 <strong>Flash Sales</strong> – promo diskon hingga <strong>40%</strong> waktu terbatas!<br><a href="home.php" style="color:#db4444;">→ Lihat di Home</a>';
    }
    if (q.includes('wishlist') || q.includes('favorit')) {
      return '❤️ Klik ikon ♥ di setiap produk untuk menyimpan ke <a href="wishlist.php" style="color:#db4444;">Wishlist</a>.';
    }
    if (q.includes('cart') || q.includes('keranjang') || q.includes('beli')) {
      return '🛒 Klik <strong>"Add To Cart"</strong> lalu buka <a href="cart.php" style="color:#db4444;">Cart</a> untuk checkout.';
    }
    if (q.includes('kirim') || q.includes('ongkir') || q.includes('pengiriman') || q.includes('delivery')) {
      return '🚚 <strong>Gratis pengiriman</strong> untuk semua order! Summer Sale: free express delivery untuk swim suits.';
    }
    if (q.includes('promo') || q.includes('voucher') || q.includes('diskon') || q.includes('hemat')) {
      return '🏷️ <strong>Promo aktif:</strong><br>• Summer Sale – diskon 50% swim suits<br>• Flash Sales – diskon hingga 40%<br>• Newsletter – diskon <strong>10%</strong> pertama!';
    }
    if (q.includes('garansi') || q.includes('return') || q.includes('refund')) {
      return '✅ <strong>Money Back Guarantee</strong> – pengembalian uang dalam <strong>30 hari</strong>.';
    }
    if (q.includes('cs') || q.includes('customer') || q.includes('bantuan') || q.includes('kontak')) {
      return '🎧 <strong>Customer Service 24/7</strong><br>📧 exclusive@gmail.com<br>📞 +88015-88888-9999';
    }
    if (q.includes('daftar') || q.includes('register') || q.includes('login') || q.includes('akun')) {
      return '👤 Belum punya akun? <a href="register.php" style="color:#db4444;">Daftar</a> | Sudah punya? <a href="login.php" style="color:#db4444;">Login</a>';
    }
    if (q.includes('kategori') || q.includes('produk apa') || q.includes('jual apa')) {
      return '🛍️ <strong>Kategori:</strong> 👗 Fashion · 💻 Elektronik · 🏠 Home · 💊 Obat · ⚽ Sports · 🧸 Bayi · 🛒 Grocery · 💄 Beauty';
    }

    return 'Hmm, belum paham 🤔 Coba tanya:<br>• 🔥 Flash Sales<br>• 🛒 Cara beli<br>• 🚚 Pengiriman<br>• 🎧 Customer Service';
  }

}); // end DOMContentLoaded