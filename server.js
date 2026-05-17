const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 اتصال بقاعدة البيانات
mongoose.connect("mongodb://127.0.0.1:27017/ghostshop")
.then(()=> console.log("✅ Connected to DB"))
.catch(err => console.log(err));

// 📦 موديل الطلب
const Order = mongoose.model("Order", {
    playerId: String,
    items: Array,
    amount: Number,
    proof: String,
    status: String,
    date: String
});

// 🟢 إضافة طلب
app.post("/order", async (req,res)=>{
    let order = new Order(req.body);
    await order.save();
    res.send("saved");
});

// 🔵 جلب الطلبات
app.get("/orders", async (req,res)=>{
    let orders = await Order.find();
    res.json(orders);
});

// 🟡 تحديث الحالة
app.put("/order/:id", async (req,res)=>{
    await Order.findByIdAndUpdate(req.params.id, {
        status: "✅ تم الشحن"
    });
    res.send("updated");
});

// 🔴 حذف الكل
app.delete("/orders", async (req,res)=>{
    await Order.deleteMany();
    res.send("deleted");
});

app.listen(3000, ()=> console.log("🚀 Server running"));

mongoose.connect("mongodb+srv://Ghost:hossam01129942898$$@cluster0.yeughqs.mongodb.net/?appName=Cluster0")
.then(()=> console.log("✅ Connected to DB"))
.catch(err => console.log(err));