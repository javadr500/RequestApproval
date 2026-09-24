# سیستم مدیریت درخواست و تأیید

یک سیستم ساده برای ثبت، مسیردهی و تأیید درخواست‌ها که با استفاده از ASP.NET Core، Entity Framework Core، PostgreSQL و Angular پیاده‌سازی شده است.

---

## 1. ساختار پروژه

```text
RequestApproval/
├── backend/
│   └── RequestApproval.Api/
├── frontend/
│   └── request-approval-ui/
└── README.md
```

---

## 2. تکنولوژی‌های استفاده‌شده

### Backend

- ASP.NET Core 9
- Entity Framework Core
- PostgreSQL
- ASP.NET Core Identity
- JWT Authentication
- Generic Repository
- Unit of Work
- Swagger / OpenAPI

### Frontend

- Angular
- TypeScript
- Reactive Forms
- Angular Signals
- HTTP Interceptor
- Route Guards
- Dynamic Form

---

## 3. پیش‌نیازهای Backend

- .NET 9 SDK
- PostgreSQL
- Entity Framework Core CLI

نصب EF Core CLI:

```bash
dotnet tool install --global dotnet-ef
```

بررسی نصب:

```bash
dotnet --version
dotnet ef --version
```

---

## 4. ایجاد دیتابیس

وارد پوشه Backend شوید:

```bash
cd backend/RequestApproval.Api
```

ایجاد Migration:

```bash
dotnet ef migrations add InitialCreate
```

اعمال Migration:

```bash
dotnet ef database update
```

پوشه `Migrations` باید داخل Repository قرار بگیرد.

---

## 5. اجرای Backend

```bash
cd backend/RequestApproval.Api
dotnet run
```

پس از اجرا، Swagger در آدرس نمایش‌داده‌شده توسط ASP.NET Core در دسترس خواهد بود.

برای مثال:

```text
http://localhost:5027/swagger
```

پورت واقعی ممکن است بر اساس `launchSettings.json` متفاوت باشد.

---

## 6. پیش‌نیازهای Frontend

- Node.js
- npm

بررسی نسخه:

```bash
node --version
npm --version
```

---

## 7. نصب Frontend

```bash
cd frontend/request-approval-ui
npm install
```

---

## 8. تنظیم آدرس Backend

آدرس API را در سرویس‌های Angular با آدرس واقعی Backend هماهنگ کنید.

فایل‌های مرتبط:

```text
src/app/core/auth/auth.service.ts
src/app/features/requests/request.service.ts
```

برای مثال:

```ts
private apiUrl = 'http://localhost:5027/api';
```

---

## 9. اجرای Frontend

```bash
npm start
```

برنامه Angular معمولاً در آدرس زیر اجرا می‌شود:

```text
http://localhost:4200
```


---

## 10. اجرای کامل پروژه

### PostgreSQL

ابتدا PostgreSQL را اجرا کنید.

### Backend

```bash
cd backend/RequestApproval.Api

dotnet ef database update

dotnet run
```

### Frontend

در Terminal دیگری:

```bash
cd frontend/request-approval-ui

npm install

npm start
```

سپس:

```text
http://localhost:4200
```

را در مرورگر باز کنید.

---


## 11. لینک Repository

لینک Repository پروژه:

```text
https://github.com/javadr500/RequestApproval
```

