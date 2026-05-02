// ===========================
// ✅ File ini TIDAK PERLU DIUBAH — tidak pakai allProducts
// ===========================

const CONTROLLER = '/ProjekAkhir/Ecommerce/controllers/CheckoutController.php';

// ===========================
// AMBIL DATA USER DARI DB
// ===========================
async function loadUserData() {
    const fd = new FormData();
    fd.append('action', 'getUserData');
    const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success) {
        document.getElementById('nama').value  = data.user.name;
        document.getElementById('email').value = data.user.email;
    } else {
        window.location.href = 'login.php';
    }
}

// ===========================
// LOAD CART DARI LOCALSTORAGE
// ===========================
function loadCart() {
    const cart     = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
    const discount = parseFloat(localStorage.getItem('exclusive_discount') || '0');
    const items    = document.getElementById('orderItems');

    if (cart.length === 0) {
        items.innerHTML = '<p style="color:#888;font-size:13px;">Cart kosong</p>';
        document.getElementById('subtotal').textContent   = '$0';
        document.getElementById('totalFinal').textContent = '$0';
        return;
    }

    let subtotal = 0;
    items.innerHTML = cart.map(item => {
        const itemTotal = item.price * (item.qty || 1);
        subtotal += itemTotal;
        return `
            <div class="order-item">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">x${item.qty || 1}</span>
                <span class="item-price">$${itemTotal}</span>
            </div>
        `;
    }).join('');

    const total = subtotal - discount;

    document.getElementById('subtotal').textContent   = `$${subtotal}`;
    document.getElementById('totalFinal').textContent = `$${total}`;

    if (discount > 0) {
        document.getElementById('orderItems').insertAdjacentHTML('afterend', `
            <div class="total-row" id="discountRow">
                <span>Diskon Kupon</span>
                <span style="color:green">-$${discount}</span>
            </div>
        `);
    }
}

// ===========================
// PLACE ORDER
// ===========================
document.getElementById('btnPlaceOrder').addEventListener('click', async () => {
    const kota    = document.getElementById('kota').value.trim();
    const alamat  = document.getElementById('alamat').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    const total   = document.getElementById('totalFinal').textContent.replace('$', '');
    const cart    = JSON.parse(localStorage.getItem('exclusive_cart') || '[]');
    const msg     = document.getElementById('msgOrder');

    if (!kota || !alamat) {
        showMsg(msg, 'Kota dan alamat wajib diisi!', false);
        return;
    }
    if (cart.length === 0) {
        showMsg(msg, 'Cart kamu kosong!', false);
        return;
    }

    const fd = new FormData();
    fd.append('action',  'placeOrder');
    fd.append('kota',    kota);
    fd.append('alamat',  alamat);
    fd.append('payment', payment);
    fd.append('total',   total);
    fd.append('items',   JSON.stringify(cart));

    const res  = await fetch(CONTROLLER, { method: 'POST', body: fd });
    const data = await res.json();

    if (data.success) {
        localStorage.removeItem('exclusive_cart');
        localStorage.removeItem('exclusive_discount');
        showMsg(msg, `✅ Order #${data.order_id} berhasil! Terima kasih.`, true);
        setTimeout(() => window.location.href = 'home.php', 2500);
    } else {
        showMsg(msg, data.message, false);
    }
});

// ===========================
// HELPER
// ===========================
function showMsg(el, text, success) {
    el.textContent = text;
    el.className   = 'msg ' + (success ? 'success' : 'error');
}

// ===========================
// INIT
// ===========================
loadUserData();
loadCart();