# Online Shop Backend

یک پروژه حرفه‌ای بک‌اند برای فروشگاه آنلاین با استفاده از Express.js و Prisma ORM.

## ویژگی‌ها

- ✅ استفاده از Prisma ORM برای مدیریت دیتابیس
- ✅ احراز هویت با JWT
- ✅ مدیریت محصولات، سبد خرید و سفارشات
- ✅ پشتیبانی از دسته‌بندی محصولات
- ✅ مدیریت موجودی محصولات
- ✅ سیستم تخفیف
- ✅ Error handling حرفه‌ای
- ✅ TypeScript برای type safety

## پیش‌نیازها

- Node.js (v18 یا بالاتر)
- npm یا yarn

## نصب و راه‌اندازی

### 1. نصب وابستگی‌ها

```bash
npm install
```

### 2. تنظیم متغیرهای محیطی

یک فایل `.env` در ریشه پروژه ایجاد کنید:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_super_secret_key_change_it_later"
PORT=5000
NODE_ENV="development"
```

### 3. ایجاد و راه‌اندازی دیتابیس

```bash
# تولید Prisma Client
npm run prisma:generate

# اجرای migration ها
npm run prisma:migrate

# پر کردن دیتابیس با داده‌های اولیه
npm run prisma:seed
```

یا برای reset کامل دیتابیس:

```bash
npm run db:reset
```

### 4. اجرای سرور

```bash
# حالت توسعه
npm run dev

# حالت production
npm run build
npm start
```

## ساختار پروژه

```
back-end/
├── prisma/
│   ├── schema.prisma      # Schema دیتابیس
│   ├── seed.ts            # داده‌های اولیه
│   └── migrations/         # Migration ها
├── src/
│   ├── api/
│   │   └── products.ts    # داده‌های محصولات (برای seed)
│   ├── lib/
│   │   └── prisma.ts      # Prisma Client singleton
│   └── server.ts          # فایل اصلی سرور
├── .env                   # متغیرهای محیطی (ایجاد کنید)
└── package.json
```

## API Endpoints

### محصولات

- `GET /api/products` - لیست تمام محصولات
  - Query params: `gender`, `type`, `category`
- `GET /api/products/:id` - جزئیات یک محصول

### احراز هویت

- `POST /api/auth/register` - ثبت‌نام
  - Body: `{ email, password, name? }`
- `POST /api/auth/login` - ورود
  - Body: `{ email, password }`

### کاربر

- `GET /api/user/profile` - پروفایل کاربر (نیاز به authentication)
- `GET /api/user/orders` - لیست سفارشات کاربر (نیاز به authentication)

### سبد خرید

- `GET /api/cart` - دریافت سبد خرید (نیاز به authentication)
- `POST /api/cart` - افزودن محصول به سبد (نیاز به authentication)
  - Body: `{ productId, quantity? }`
- `DELETE /api/cart/:productId` - حذف محصول از سبد (نیاز به authentication)

### سفارشات

- `POST /api/orders` - ایجاد سفارش از سبد خرید (نیاز به authentication)

## دستورات مفید

```bash
# باز کردن Prisma Studio برای مشاهده دیتابیس
npm run prisma:studio

# ایجاد migration جدید
npm run prisma:migrate

# Reset کامل دیتابیس و seed مجدد
npm run db:reset
```

## مدل‌های دیتابیس

- **User**: کاربران سیستم
- **Category**: دسته‌بندی محصولات
- **Product**: محصولات
- **Cart**: سبد خرید کاربر
- **CartItem**: آیتم‌های سبد خرید
- **Order**: سفارشات
- **OrderItem**: آیتم‌های سفارش

## نکات مهم

1. در production حتماً `JWT_SECRET` را تغییر دهید
2. برای production از PostgreSQL استفاده کنید (در schema.prisma تغییر دهید)
3. فایل `.env` را به `.gitignore` اضافه کنید
4. قبل از commit کردن، migration ها را اجرا کنید

## توسعه

برای توسعه:

1. تغییرات schema را در `prisma/schema.prisma` اعمال کنید
2. Migration ایجاد کنید: `npm run prisma:migrate`
3. Prisma Client را regenerate کنید: `npm run prisma:generate`
4. کد را بنویسید و تست کنید

## License

ISC

