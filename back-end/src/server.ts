import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { products } from "./api/products";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_super_secret_key_change_it_later"; // بعداً عوض کن

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// دیتای فیک محصولات


// کاربران (در مموری – برای تست)
const users: any[] = [];
const carts: any = {}; // { userId: [items] }
const orders: any[] = [];

interface AuthRequest extends express.Request {
  user?: any;
}

// میدلور احراز هویت
const authenticateToken = (
  req: AuthRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "دسترسی رد شد" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "توکن نامعتبر" });
    req.user = user;
    next();
  });
};

// روت‌ها

// لیست محصولات
app.get("/api/products", (req, res) => {
  res.json(products);
});

// جزئیات محصول
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "محصول پیدا نشد" });
  res.json(product);
});

// ثبت‌نام
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "ایمیل و پسورد لازم است" });

  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "کاربر وجود دارد" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashedPassword, name };
  users.push(user);
  carts[user.id] = [];

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, user: { id: user.id, email, name } });
});

// لاگین
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "کاربر پیدا نشد" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "پسورد اشتباه" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// پروفایل کاربر
app.get("/api/user/profile", authenticateToken, (req: AuthRequest, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json({ id: user.id, email: user.email, name: user.name });
});

// سفارشات کاربر
app.get("/api/user/orders", authenticateToken, (req: AuthRequest, res) => {
  const userOrders = orders.filter((o) => o.userId === req.user.id);
  res.json(userOrders);
});

// سبد خرید
app.get("/api/cart", authenticateToken, (req: AuthRequest, res) => {
  const cart = carts[req.user.id] || [];
  res.json(cart);
});

  app.post("/api/cart", authenticateToken, (req: AuthRequest, res) => {
    const { productId, quantity = 1 } = req.body;
    const product = products.find((p) => p.id === productId);
    if (!product) return res.status(404).json({ message: "محصول پیدا نشد" });

    const cart = carts[req.user.id] || [];
    const existing = cart.find((i: any) => i.product.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    carts[req.user.id] = cart;
    res.json(cart);
  });

app.delete(
  "/api/cart/:productId",
  authenticateToken,
  (req: AuthRequest, res) => {
    const cart = carts[req.user.id] || [];
    carts[req.user.id] = cart.filter(
      (i: any) => i.product.id !== parseInt(req.params.productId)
    );
    res.json(carts[req.user.id]);
  }
);

// ایجاد سفارش از سبد خرید
app.post("/api/orders", authenticateToken, (req: AuthRequest, res) => {
  const cart = carts[req.user.id] || [];
  if (cart.length === 0)
    return res.status(400).json({ message: "سبد خرید خالی است" });

  const total = cart.reduce(
    (sum: number, i: any) => sum + i.product.price * i.quantity,
    0
  );
  const order = {
    id: orders.length + 1,
    userId: req.user.id,
    items: cart,
    total,
    status: "PENDING",
    createdAt: new Date(),
  };
  orders.push(order);
  carts[req.user.id] = []; // خالی کردن سبد
  res.json(order);
});

app.get("/", (req, res) => {
  res.json({ message: "بک‌اند فروشگاه آنلاین آماده است! 🚀" });
});

app.listen(PORT, () => {
  console.log(`سرور در پورت ${PORT} اجرا شد`);
});
