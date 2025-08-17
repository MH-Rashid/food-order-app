# 🍔 Food Order Web Application

This is a fullstack food ordering web application built as a personal project to explore modern web development workflows and deployment strategies.

## ✨ Features

Users can:

- 📝 Register an account
- 🔐 Log in / log out
- 🛒 Add items to cart and update cart items
- 💳 Checkout the cart and create orders
- 🔁 Re-add items from the orders page
- 🗑️ Delete past orders

## 🧰 Tech Stack

### Frontend
- **React** for UI components
- **Vite** as the build tool and development server
- **CSS3** for styling

### Backend
- **Express.js** for RESTful API routes and server logic
- **MongoDB** for data persistence
- **Mongoose** for object modeling and database interaction

## 🚀 Deployment

- **Frontend** is hosted on [Vercel](https://vercel.com).
- **Backend** is hosted on [Northflank](https://northflank.com), using Docker for containerized deployment.

## 🔗 Architecture Overview

- The frontend communicates with the backend via HTTPS using RESTful API endpoints.
- Authentication and order processing are handled server-side, while cart management is handled on the client using local storage.

## 🛠️ Development Notes

- Vite was used for its fast dev server, hot module replacement, and optimized build output.
- Environment variables are injected at build time for both frontend and backend.
- CORS is configured to allow secure communication between Vercel and Northflank domains.

## 📦 Future Improvements

- Add user profile management
- Integrate payment gateway
- Improve mobile responsiveness
- Add unit and integration tests

Thanks for reading!
