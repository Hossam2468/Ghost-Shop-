// =======================
// 🛒 تحميل السلة
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// 🔔 إشعار المستخدم
// =======================
let note = localStorage.getItem("userNotification");
if(note){
    alert(note);
    localStorage.removeItem("userNotification");
}

// =======================
// 🛒 تحديث عدد السلة
// =======================
function updateCartCount(){
    let el = document.getElementById("cart-count");
    if(el){
        el.innerText = cart.length;
    }
}

// =======================
// ➕ إضافة للسلة
// =======================
function addToCart(id, name, price, img){
    cart.push({id, name, price, img});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

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
// 💳 الذهاب للدفع
// =======================
function goToCheckout(){
    let playerId = document.getElementById("playerId").value;

    if(!playerId){
        alert("ادخل ID اللاعب ❗");
        return;
    }

    localStorage.setItem("playerId", playerId);
    window.location.href = "checkout.html";
}

// =======================
// 💳 إرسال الطلب للسيرفر
// =======================
function checkout(){

    let playerId = localStorage.getItem("playerId");

    if(cart.length === 0){
        alert("السلة فاضية ❌");
        return;
    }

    if(!playerId){
        alert("ادخل ID اللاعب ❗");
        return;
    }

    fetch("https://ghost-shop-production.up.railway.app/order", { // ⚠️ لازم https + /order
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerId: playerId,
            items: cart,
            amount: cart.reduce((sum,item)=>sum+item.price,0),
            status: "⏳ قيد المراجعة",
            date: new Date().toLocaleString()
        })
    })
    .then(()=> {
        alert("تم إرسال الطلب ✅");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    })
    .catch(()=> {
        alert("حصل خطأ ❌");
    });
}

// =======================
// 🚀 تشغيل
// =======================
updateCartCount();