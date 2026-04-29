# PC Shop API

Backend API for a simple e-commerce system built with NestJS.
The goal of this project was to practice core backend concepts used in real-world applications, including authentication, authorization, and database interaction.

Swagger documentation:
https://pc-shop-fmqa.onrender.com/api

---

## -- Overview --

This project simulates a basic PC shop backend. It includes user authentication, product management, and order handling. The focus was on writing clean, structured code and handling common backend problems like secure authentication and concurrent requests.

---

## -- Authentication & Authorization --

Authentication is implemented using JWT with access and refresh tokens. Refresh tokens are stored hashed in the database and removed on logout.

Authorization is role-based, with USER and ADMIN roles. Guards are used to protect routes, and a custom decorator is used to simplify role checks.

---

## -- Products & Orders --

Products support standard CRUD operations with request validation through DTOs.

Order creation is handled using Prisma transactions to avoid inconsistent state. Before creating an order, the system checks product availability. This helps prevent issues when multiple users try to buy the same product at the same time.

---

## -- Structure & Design --

The application is organized into modules such as auth, users, products, and orders. Shared logic like exception handling and response formatting is handled through a global filter and interceptor.

The goal was to keep the codebase readable and easy to extend.

---

## -- Tech Stack --

NestJS is used as the main framework, with Prisma as the ORM and PostgreSQL as the database. Authentication is handled with JWT, testing with Jest, and the app is deployed on Railway. Swagger is used for API documentation.

---

## -- Running the project --

```bash id="run22"
git clone https://github.com/danijel01Dev/Pc-Shop.git
cd Pc-Shop
npm install
npm run start:dev
```

---

## -- Testing --

```bash id="test22"
npm run test
```

---

## -- Notes --

The project includes basic protection against race conditions during order creation by using database transactions.
Guards for authentication and roles are separated to keep responsibilities clear.
All responses are formatted through a global interceptor.

---

## -- Test Account --

Admin account:
email: [admin.guest993@gmail.com](mailto:admin.guest993@gmail.com)
password: userPassword

---

## -- Author --

Danijel Gajic
