# Image Gallery Application

A full-stack web application for uploading and managing images with authentication, a sleek user interface, and a robust backend.

## 🚀 Features

- 🖼️ **Image Upload & Management** – Securely upload and manage images.
- 👤 **User Authentication** – Login and profile management.
- 📱 **Responsive UI** – Built with modern UI components.
- 🔄 **Real-time Updates** – Efficient state management and caching.
- 🚀 **Optimized Performance** – Fast API responses and lazy loading.

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management & Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM v6
- **UI Components**: Lucide Icons, Custom Components

### **Backend**

- **Framework**: Node.js + Hono.js
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: BetterAuth
- **Storage**: AWS S3 for image uploads
- **Validation**: Zod
- **Containerization**: Docker
- **Code Quality**: Prettier, ESLint

---

## 📂 Folder Structure

```
image-gallery-app/
├── backend/          # Backend service
│   ├── src/
│   ├── .env.example  # Environment variables template
│   ├── Dockerfile
│   ├── package.json
│   ├── README.md
│   └── ...
│
├── frontend/         # Frontend application
│   ├── src/
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── package.json
│   ├── README.md
│   └── ...
│
├── .gitignore        # Git ignore rules
├── docker-compose.yml # Docker setup for the project
├── LICENSE           # MIT License
├── README.md         # Root documentation
└── ...
```

---

## 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

---

## 🚀 Installation

### **1. Clone the Repository**

```bash
git clone https://github.com/Basit787/Image-Upload-App.git
cd Image-Upload-App
```

### **2. Setup Backend**

```bash
cd backend
cp .env.example .env
npm install  # or yarn install
npm run dev  # or yarn dev
```

### **3. Setup Frontend**

```bash
cd ../frontend
npm install  # or yarn install
npm run dev  # or yarn dev
```

### **4. Run with Docker**

```bash
docker-compose up --build
```

---

## 🔥 Future plans

Their are some high-temperature ideas which will implement in future:

- **`Testing`** → Testing the frontend and backend application using jest
- **`Swagger Api`** → Creating the api documentation for backend

---
