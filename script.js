
if (typeof cart === "undefined") {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
}
// تحديث عدد السلة
function updateCartCount(){
    let count = document.getElementById("cart-count");
    if(count){
        count.innerText = cart.length;
    }
}






var note = localStorage.getItem("userNotification");

if(note){
    alert(note);
    localStorage.removeItem("userNotification");
}

// إضافة للسلة
// تحميل السلة
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// إضافة منتج
function addToCart(id, name, price, img){
    cart.push({id, name, price, img});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// عدد السلة
function updateCartCount(){
    let el = document.getElementById("cart-count");
    if(el){
        el.innerText = cart.length;
    }
}

// حذف
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// مسح
function clearCart(){
    localStorage.removeItem("cart");
    cart = [];
    location.reload();
}

// checkout
function goToCheckout(){
    let playerId = document.getElementById("playerId").value;

    if(!playerId){
        alert("ادخل ID");
        return;
    }

    localStorage.setItem("playerId", playerId);
    window.location.href = "checkout.html";
}

updateCartCount();
    // تأثير الزر
    if(btn){
        btn.innerText = "✔ تم";
        setTimeout(()=>{
            btn.innerText = "🛒 شراء";
        },1000);
    }

    showPopup("تمت الإضافة 🛒", name + " اتضاف للسلة");

// =======================
// ❌ حذف منتج
// =======================

function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// =======================
// 🧹 مسح السلة
// =======================

function clearCart(){
    localStorage.removeItem("cart");
    cart = [];
    location.reload();
}

// =======================
// 💳 تنفيذ الطلب
// =======================

function checkout(){

    let playerId = document.getElementById("player-id")?.value;

    if(cart.length === 0){
        showPopup("خطأ ❌", "السلة فاضية");
        return;
    }

    if(!playerId){
        showPopup("خطأ ❌", "ادخل ID اللاعب");
        return;
    }

    // تحميل الطلبات القديمة
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // إنشاء الطلب (نسخة من السلة)
    let order = {
        id: playerId,
        items: [...cart],
        date: new Date().toLocaleString()
    };

    // إضافة الطلب
    orders.push(order);

    // حفظ
fetch("ghost-shop-production.up.railway.app", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        playerId: playerId,
        items: cart,
        amount: amount,
        proof: reader.result,
        status: "⏳ قيد المراجعة",
        date: new Date().toLocaleString()
    })
})
.then(()=> {
    alert("تم إرسال الطلب ✅");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});
}

// =======================
// 🔔 Popup
// =======================

function showPopup(title, message){
    let popup = document.getElementById("popup");

    if(!popup){
        alert(message);
        return;
    }

    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-message").innerText = message;

    popup.style.display = "flex";
}

function closePopup(){
    let popup = document.getElementById("popup");
    if(popup){
        popup.style.display = "none";
    }
}

// =======================
// 🚀 تشغيل تلقائي
// =======================

updateCartCount();

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }
}



let orderId = "ORD" + Date.now();
localStorage.setItem("lastOrderId", orderId);
new Audio("notify.mp3").play();

async function clearOrders(){
    await fetch("ghost-shop-production.up.railway.app", {
        method: "DELETE"
    });

    loadOrders();
}