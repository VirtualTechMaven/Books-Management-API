# **Secure Books Management API**

### *A Fully Authenticated, Production-Ready REST API Built with Node.js, Express, MongoDB & JWT*

---

## **Overview**

The **Secure Books Management API** is a fully authentication-protected backend system built with **Node.js**, **Express**, and **MongoDB**, designed to demonstrate real-world backend engineering skills.

It includes:

* **User Authentication** (Register/Login/Logout/Refresh Token)
* **Full CRUD for Books**
* **Search & Filtering** (by title/author/genre)
* **Pagination**
* **Error Handling Middleware**
* **Request Logging Middleware**
* **Live Deployment on Render**
* **Complete Postman Documentation**
* **Developer-friendly structure for testing**

This project was built following industry best practices and is extendable up to Week 6 (RBAC, advanced testing, and more).

---

# **Project Architecture**

Books-Management-API
│
├── controllers
│     ├── auth.js
│     └── books.js
│
├── middleware
│     ├── authMiddleware.js
│     └── errorHandler.js
│
├── models
│     ├── User.js
│     └── Book.js
│
├── routes
│     ├── auth.js
│     └── books.js
│
├── screenshots
│     ├── AUTH REQUESTS
│     └── BOOKS REQUEST
├── .env
├── server.js
├── package.json
└── README.md

---

# **Tech Stack & Tools Used**

This documentation covers every tool used throughout development, testing, debugging, and deployment.

### **Backend & Language**

* Node.js
* Express.js
* JavaScript (ES6+)

### **Database & ORM**

* MongoDB
* MongoDB Compass
* Mongoose ODM

### **Authentication & Security**

* bcryptjs (password hashing)
* jsonwebtoken (JWT access + refresh tokens)
* dotenv (environment configuration)

### **Debugging & Workflow Tools**

* Nodemon
* Postman
* VS Code
* Render logs
* Terminal/Command Line

### **Deployment**

* Render Web Service
* GitHub Repository
* Environment Variables (.env)
* Build logs tracking
* Webhook-based auto deployments

---

# **Installation & Local Setup**

Follow these steps exactly to run the project locally.

---

## 1️⃣ **Clone the Repository**
git clone https://github.com/VirtualTechMaven/Books-Management-API.git
cd Books-Management-API

---

## 2️⃣ **Install Dependencies**
```
npm install
```
---

## 3️⃣ **Setup .env File**

Create a `.env` file in the root folder with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
PORT=8000

> Ensure **MONGO_URI is your local or Atlas DB**. I used **MongoDB Compass** during development.

---

## 4️⃣ **Start Local MongoDB**

If using MongoDB locally:

### **Windows / Mac / Linux**

Open a separate terminal:
```
mongod

```
Or using brew (Mac):
```
brew services start mongodb-community
```
---

## 5️⃣ **Run the Server**
```
npm run dev
```

If successful:

MongoDB connected...
Server running on PORT 8000

---

# **Testing the API Endpoints (Postman)**

All endpoints are organized into **two Postman Collection folders**:

1. **Auth Requests**
2. **Book Requests**

Each request below includes:

* Method
* URL
* Headers
* Body
* Response example

---

# **AUTH REQUESTS (REGISTER → LOGIN → REFRESH → LOGOUT)**

---

## 1. **Register User**

**POST** `/api/auth/register`

### **Headers**

None required.

### **Body (JSON)**

```json
{
  "name": "Princess Chioma",
  "email": "chioma@example.com",
  "password": "123456"
}

```

## 2. **Login User**

**POST** `/api/auth/login`

### **Body**

```json
{
  "email": "chioma@example.com",
  "password": "123456"
}
```

### Response includes:

* accessToken
* refreshToken

---

## 3. **Refresh Access Token**

**POST** `/api/auth/refresh-token`

### **Body**

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

## 4. **Logout User**

**POST** `/api/auth/logout`

### **Body**

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

# **BOOK REQUESTS (PROTECTED ROUTES)**

All book-related endpoints **require authentication**.

### **Required Header**

```
Key: Authorization  
Value: Bearer <accessToken>
```

---

## 1. **Create Book**

**POST** `/api/books`

### **Headers**

```
Authorization: Bearer <token>
```

### **Body**

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "year": 2019,
  "genre": "Self Help"
}
```

## 2. **Get All Books (Paginated)**

**GET** `/api/books?page=1&limit=10`

---

## 3. **Search Books**

**GET** `/api/books/search?author=James`

---

## 4. **Get Single Book by ID**

**GET** `/api/books/:id`

---

## 5. **Update Book by ID**

**PUT** `/api/books/:id`

---

## 6. **Delete Book**

**DELETE** `/api/books/:id`

### **Screenshots**

* ![Delete](./screenshots/delete-book-request.png)
* ![Delete](./screenshots/delete-book-response.png)

---

# **Deployment Guide (Render)**

### 1️⃣ Push code to GitHub

### 2️⃣ Create a new Render Web Service

### 3️⃣ Add environment variables (same as local)

### 4️⃣ Set build command:

```
npm install
```

### 5️⃣ Set start command:

```
node server.js
```

### 6️⃣ Deploy

---

#  Troubleshooting & Common Errors

### **“Cannot find module… models/Book”**

Fix by ensuring case-sensitivity in:

```
const Book = require('../models/Book');
```

### **“No token provided”**

Ensure your header format:

```
Authorization: Bearer <accessToken>
```

### **“Invalid or expired token”**

Generate a fresh login access token.

### **MongoDB connection error**

Check:

* Correct MongoDB URI
* Local MongoDB running
* Internet connection (for Atlas)

---

#  **Contributing**

PRs are welcome.
Fork → Branch → Commit → PR.

---

# Made by 
**Chioma Princess Ohwo**
**thevirtualtechmaven** — Backend Developer
