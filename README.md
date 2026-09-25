# Product Admin Dashboard

A responsive **Product Admin Dashboard** built with **Next.js, React, Tailwind CSS, and Axios**. The application allows authenticated users to manage products using the **DummyJSON API**.

## Tech Stack

* Next.js (App Router)
* React.js
* Tailwind CSS
* Axios
* JavaScript (ES6+)

## Features

### Authentication

* User login using DummyJSON API
* JWT token-based authentication
* Protected routes
* Logout functionality

### Product Management

* View all products
* Responsive product table (Desktop)
* Responsive product cards (Mobile)
* Product details page
* Add new product
* Edit existing product
* Delete product with confirmation

### Search & Filter

* Search products
* Category filter
* Sort by:

  * Price
  * Rating
  * Title

### Pagination

* Previous / Next buttons
* Page numbers
* Page size selection (10, 20, 50)
* Display current result count

### UI Features

* Loading spinner
* Empty state
* Error handling with Retry button
* Responsive design

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── products/
│   │   └── [id]/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── Navbar.jsx
│   ├── ProductTable.jsx
│   ├── ProductCard.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── Loader.jsx
│   └── ProductForm.jsx
│
├── services/
│   ├── axios.js
│   ├── authApi.js
│   └── productApi.js
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│
└── utils/
```

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/AdeshValekar/product-admin-dashboard
```

Go to the project folder

```bash
cd product-admin-dashboard
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open your browser

```text
http://localhost:3000
```

## 🔐 Login Credentials

```text
Username : emilys
Password : emilyspass
```

## 🌐 API

This project uses the DummyJSON API.

Base URL

```text
https://dummyjson.com
```

## 📋 Assignment Requirements Covered

* User Authentication
* Protected Routes
* Shared Axios Instance
* Product Listing
* Product Details
* Search
* Pagination
* Category Filter
* Sorting
* Add Product
* Edit Product
* Delete Product
* Responsive UI
* Loading State
* Error State
* Empty State

## 📈 Future Improvements

* Dark Mode
* Better Form Validation
* Toast Notifications
* Unit Testing
* Performance Optimization

## 👨‍💻 Author

**Adesh Valekar**

GitHub: https://github.com/AdeshValekar

LinkedIn: https://linkedin.com/in/adesh-valekar-2964a6255/

---

**Note:** This project is developed as a frontend assignment using the DummyJSON API. Some operations such as Add, Edit, and Delete are simulated by the API and are reflected only within the application state.
