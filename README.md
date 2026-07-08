# 🩺 Clinik — Doctor Appointment Booking System

> ⚠️ **Status: Beta** — This project is under active development. Features may change, and some functionality may be incomplete or unstable. Not yet recommended for production use.

A full-stack doctor appointment booking platform built with the **MERN stack** (MongoDB, Express, React, Node.js). The system allows patients to browse doctors, book appointments online, and allows doctors/admins to manage schedules, patients, and clinic operations through a dedicated dashboard.

---

## 📦 Project Structure

This repository is a monorepo containing three independent applications:

```
clinik/
├── frontend/     # Patient-facing web app (React + Vite)
├── admin/        # Admin & Doctor dashboard (React + Vite)
└── backend/      # REST API server (Node.js + Express + MongoDB)
```

| Folder     | Description                                              |
|------------|-----------------------------------------------------------|
| `frontend` | Public website where patients register, search doctors, and book appointments |
| `admin`    | Dashboard used by clinic admins (manage doctors, appointments) and doctors (manage their own schedule) |
| `backend`  | API server handling authentication, appointments, doctor/user data, and file uploads |

---

## ✨ Features

- 👤 Patient registration & login
- 🔍 Browse doctors by specialty
- 📅 Book, view, and cancel appointments
- 🩻 Doctor dashboard — manage availability and appointments
- 🛠️ Admin dashboard — manage doctors, view all appointments, earnings overview
- 🖼️ Image uploads via Cloudinary (doctor profile pictures)
- 🔐 Role-based authentication (Patient / Doctor / Admin) with JWT
- 💳 Payment integration (Stripe / Razorpay — *see note below*)

> **Note:** Payment gateway integration currently reflects the original tutorial setup and may need to be replaced with a regionally supported provider depending on your deployment target.

---

## 🛠️ Tech Stack

**Frontend & Admin**
- React (Vite)
- Tailwind CSS
- Context API (state management)
- Axios

**Backend**
- Node.js / Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer + Cloudinary (file uploads)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/clinik.git
cd clinik
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Start the backend server:

```bash
npm run server
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the frontend:

```bash
npm run dev
```

### 4. Set up the admin panel

```bash
cd ../admin
npm install
```

Create a `.env` file in `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the admin dashboard:

```bash
npm run dev
```

---

## 🗺️ Roadmap

- [ ] Add automated tests (unit + integration)
- [ ] Add centralized error handling & request validation
- [ ] API versioning (`/api/v1/...`)
- [ ] Migrate media assets to cloud storage instead of repo
- [ ] Localization support (multi-language)
- [ ] SMS/notification reminders for appointments
- [ ] Production deployment guide

---

## 🤝 Contributing

This project is currently in beta and evolving quickly. Contributions, bug reports, and suggestions are welcome — feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions or feedback, please open an issue on this repository.
