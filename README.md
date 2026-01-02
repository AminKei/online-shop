# 🛍️ Online Shop

A full-stack e-commerce application built with Node.js backend and React frontend using Vite.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#-running-the-application)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Features](#-features)

---

## 🎯 Project Overview

This is a complete online shopping platform featuring product browsing, user authentication, shopping cart management, and order processing.

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Ant Design** - UI component library
- **React Query** - Data fetching and caching
- **React Router** - Navigation
- **Axios** - HTTP client

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Git**

---

## 📁 Project Structure

```
Online-Shop/
├── back-end/          # Node.js backend application
│   ├── src/
│   │   ├── api/       # API routes
│   │   └── server.ts  # Express server entry point
│   ├── prisma/        # Prisma schema and migrations
│   └── package.json
│
└── online-shop/       # React frontend application
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── queries/     # API queries
    │   ├── hooks/       # Custom React hooks
    │   └── utils/       # Utility functions
    └── package.json
```

---

## 🚀 Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd back-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the `back-end` directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/online_shop"
   JWT_SECRET="your_super_secret_key_change_it_later"
   PORT=5000
   ```

4. **Set up the database:**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run database migrations
   npm run prisma:migrate
   ```

5. **(Optional) Open Prisma Studio to view your database:**
   ```bash
   npm run prisma:studio
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd online-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API endpoint (if needed):**
   
   Update the API base URL in `src/config/axios/axiosConfig.ts` to match your backend server URL.

---

## ▶️ Running the Application

### Start the Backend Server

1. **Navigate to the backend directory:**
   ```bash
   cd back-end
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd online-shop
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   The frontend application will be available at `http://localhost:5173` (default Vite port)

### Access the Application

- **Frontend:** Open your browser and visit `http://localhost:5173`
- **Backend API:** API endpoints are available at `http://localhost:5000/api`

---

## 📜 Available Scripts

### Backend Scripts

```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

### Frontend Scripts

```bash
# Start development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview

# Run ESLint
npm run lint
# or
yarn lint
```

---

## 🔐 Environment Variables

### Backend (`.env` file in `back-end/` directory)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `JWT_SECRET` | Secret key for JWT token signing | `your_super_secret_key` |
| `PORT` | Server port (optional) | `5000` |

---

## ✨ Features

### User Features
- 🔐 User authentication (Register & Login)
- 👤 User profile management
- 🛒 Shopping cart functionality
- 📦 Order management
- 🔍 Product search and filtering
- 📱 Responsive design

### Admin Features
- Product management
- Order tracking
- User management

---

## 📝 Notes

- Make sure PostgreSQL is running before starting the backend server
- The backend uses in-memory storage for users and carts (development mode)
- For production, ensure proper environment variable configuration
- Update the JWT secret in production for security

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 📄 License

ISC

---

## 👨‍💻 Development

For the best development experience:
1. Run the backend server first
2. Then start the frontend development server
3. Both servers support hot-reload during development

---

**Happy Coding! 🚀**

