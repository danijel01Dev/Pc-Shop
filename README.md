# 🖥️ PC Shop API

Backend API for a PC shop system built with **NestJS**, **Prisma**, and **PostgreSQL**.
This project focuses on building a clean and scalable backend with authentication, role-based access control, and real-world API structure.

> Live API available via Swagger documentation (link below)

---

## 🚀 Features

* JWT Authentication (Register / Login)
* Role-Based Access Control (USER / ADMIN)
* Product management (CRUD)
* User management
* Global error handling
* Request validation
* Swagger API documentation
* Unit testing with Jest

---

## 🛠️ Tech Stack

* NestJS
* Node.js
* PostgreSQL
* Prisma ORM
* JWT
* Jest
* Swagger
* Railway (deployment)

---

## 📄 API Documentation

👉 https://pc-shop-production-5bcb.up.railway.app/api

---

## 🔐 Test Credentials

Admin account for testing:

* Email: [admin.guest993@gmail.com](mailto:admin.guest993@gmail.com)
* Password: userPassword

---

## 🔄 Authentication Flow

* User registers or logs in
* Server returns JWT token
* Token is used to access protected routes
* Role-based guards restrict admin-only actions

---

## 📦 Installation

```bash
git clone https://github.com/danijel01Dev/Pc-Shop.git
cd Pc-Shop
npm install
```

---

## ▶️ Running the app

```bash
npm run start:dev
```

---

## 🧪 Running tests

```bash
npm run test
```

---

## 📁 Project Structure

```
src/
 ├── auth/
 ├── users/
 ├── products/
 ├── common/
 ├── prisma/
```

---

## 📌 Notes

* Role-based authorization is implemented using guards
* Admin role is required for certain operations
* Prisma is used for database management

---

## 👤 Author

Danijel Gajic
