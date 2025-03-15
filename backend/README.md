# Image Gallery Backend

A backend service for handling authentication, image uploads, and database operations for the Image Gallery Application.

## 🚀 Features

- 🔐 **User Authentication** – Secure authentication using BetterAuth.
- 🖼️ **Image Uploads** – AWS S3 integration for image storage.
- 🗄️ **Database Management** – PostgreSQL with Drizzle ORM.
- 🏗️ **RESTful API** – Built using Hono.js.
- 📦 **Docker Support** – Easily deployable with Docker.
- 📏 **Validation & Type Safety** – Zod for input validation.
- ✨ **Code Quality** – Prettier and ESLint for formatting and linting.

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Hono.js
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: BetterAuth
- **Storage**: AWS S3 for image uploads
- **Validation**: Zod
- **Containerization**: Docker
- **Code Formatting & Linting**: Prettier, ESLint

---

## 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

---

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Basit787/Image-Upload-App.git
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

3. **Install dependencies:**

   ```bash
   npm install  # or yarn install
   ```

4. **Set up environment variables:**
   Create a `.env` file and copy and add the required variables from .env.sample:

5. **Run the below command to create tables:**

   ```bash
   npm run mig:gen
   ```

6. **Run the below command to run the tables:**

   ```bash
   npm run mig:run
   ```

7. **Run the below command to see the tables in studio:**

   ```bash
   npm run studio
   ```

8. **Once all above steps completed, the start the docker-compose-yaml:**

   ```bash
   npm run docker
   ```

9. **To stop the docker:**

   ```bash
   npm run docker:down
   ```

10. **Run the backend server:**

    ```bash
    npm run dev
    ```

11. **Run with Docker:**
    ```bash
    npm run docker:build
    ```

---

## 📂 Project Structure

```
src/
├── controller/
│   ├── image.controller.ts
│   ├── user.controller.ts
├── db/
│   ├── index.ts
│   ├── schema.ts
├── helper/
│   ├── utils.ts
├── lib/
│   ├── s3.ts
│   ├── auth.ts
├── middleware/
│   ├── auth-middleware.ts
│   ├── image-validation.ts
│   ├── validation-midleware.ts
├── routes/
│   ├── image.routes.ts
│   ├── index.ts
│   ├── user.routes.ts
├── zod/
│   ├── image.validation.ts
│   ├── suer.validation.ts
└── ...
```

---

## 🔹 API Endpoints

### **🛠️ Authentication**

- `POST /auth/sign-up/email` – Register a new user
- `POST /auth/sign-in/email` – User login
- `POST /auth/sign-out` – User Logout

### **🖼️ Image Management**

- `POST /image/imageUpload` – Upload an image to AWS S3
- `GET /image/geAllImages` – Retrieve user-uploaded images
- `DELETE /image/deleteImage/:id` – Delete an image

### **👤 User Management**

- `GET /users/getUserDetails` – Get user profile details
- `PUT /auth/update-user` – Update user name though email is disabled in `/lib/auth.ts`
- `PUT /auth/update-user` – Update user password
- `PUT /auth/delete-user` – Delete the user

---
