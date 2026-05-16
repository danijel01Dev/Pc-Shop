# PC Shop API

Backend API for a simple e-commerce system built with NestJS.

The goal of this project was to simulate backend patterns commonly used in production applications, including authentication, authorization, file uploads, Docker containerization, and database transactions.

Swagger documentation:  
https://pc-shop-fmqa.onrender.com/api

---

## -- Features --

- JWT Authentication
- Refresh Token Rotation
- Role-Based Authorization
- Product CRUD
- Order Management
- AWS S3 Image Upload
- Swagger Documentation
- Prisma Transactions
- Global Exception Filter
- Global Response Interceptor
- Docker & Docker Compose Support

---

## -- Overview --

This project simulates a basic PC shop backend. It includes user authentication, product management, image uploads, and order handling.

The focus was on writing clean, structured code and solving common backend problems such as secure authentication, validation, containerized development environments, and concurrent requests.

---

## -- Authentication & Authorization --

Authentication is implemented using JWT with access and refresh tokens. Refresh tokens are stored hashed in the database and removed on logout.

Authorization is role-based, with USER and ADMIN roles. Guards are used to protect routes, and a custom decorator is used to simplify role checks.

---

## -- Products & Orders --

Products support standard CRUD operations with request validation through DTOs.

Product images are uploaded using Multer and stored in AWS S3. Uploaded files are validated by type and size before being stored.

Order creation is handled using Prisma transactions to avoid inconsistent state. Before creating an order, the system checks product availability. This helps prevent issues when multiple users try to buy the same product at the same time.

---

## -- Structure & Design --

The application is organized into modules such as auth, users, products, and orders. Shared logic like exception handling and response formatting is handled through a global filter and interceptor.

The goal was to keep the codebase readable, scalable, and easy to extend.

---

## -- Tech Stack --

Main technologies used:

- NestJS
- Prisma
- PostgreSQL
- Docker
- Docker Compose
- JWT Authentication
- AWS S3
- Multer
- Swagger
- Jest

The application is deployed on Render.

---

## -- Running the project locally --

### Standard setup

```bash
git clone https://github.com/danijel01Dev/Pc-Shop.git

cd Pc-Shop

npm install

npm run start:dev
```

---

## -- Docker Setup --

The project can also be started using Docker Compose.

### Requirements

- Docker Desktop

### Run with Docker

```bash
docker compose up --build
```

API will run on:

```txt
http://localhost:3002
```

PostgreSQL runs inside a Docker container and is automatically connected to the API container through Docker Compose networking.

---

## -- Environment Variables --

Create a `.env` file based on `.env.example`.

Example:

```env
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

DATABASE_URL=postgresql://postgres:1234@postgres:5432/pcshop

POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=pcshop

DOCKER_PORT=3002
POSTGRES_PORT=5432
```
