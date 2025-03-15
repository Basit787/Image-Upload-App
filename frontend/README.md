# Image Gallery Application

A modern web application for uploading and managing images with a sleek user interface and real-time updates.

## Features

- 🖼️ Image upload and management
- 👤 User authentication and profiles
- 📱 Responsive design (mobile & desktop support)
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🔄 Real-time updates with TanStack Query
- 🎯 Hover cards and mobile-friendly sheets
- 🏃‍♂️ Fast and efficient image loading
- 🛣️ Protected route navigation

## Tech Stack

- **Frontend Framework**: React/TypeScript
- **Routing**:
  - React Router DOM v6
  - Protected Routes
  - Dynamic route handling
- **Styling**:
  - Tailwind CSS
  - shadcn/ui components
- **State Management & Data Fetching**:
  - TanStack Query (React Query)
- **UI Components**:
  - Lucide Icons
  - Custom Avatar components
  - Hover Cards
  - Sheet components

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Basit787/Image-Upload-App.git
```

2. Navigate to the project directory:

```bash
cd frontend
```

3. Navigate to the project directory:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

---

## Project Structure

src/
├── components/
│ ├── header.tsx
│ ├── image/
│ │ └── delete-image.tsx
│ │ └── image-preview.tsx
│ │ └── image-upload.tsx
│ └── ui/
│ ├── avatar.tsx
│ ├── card.tsx
│ ├── hover-card.tsx
│ └── sheet.tsx
├── context/
│ └── login/
│ └── useAuth.tsx
├── hooks/
│ └── use-mobile.tsx
├── routes/
│ ├── protected-route.tsx
│ ├── public-route.tsx
│ └── routes.tsx
├── pages/
│ ├── home/
│ ├── gallery/
│ ├── profile/
│ └── auth/
├── services/
│ ├── auth.api.ts/
│ ├── client.ts/
│ ├── config.ts/
│ ├── image.api.ts/
│ ├── profile.api.ts/
│ └── user.api.ts/
└── ...

---

## Features in Detail

- Routing & Navigation
- Protected route implementation

- Public routes for authentication

- Dynamic route parameters

- Nested routes for complex layouts

- Route-based code splitting

## Authentication

- User login/logout functionality

- Protected routes with authentication guards

- Profile management

- Session handling

## Image Management

- Upload new images

- View uploaded images

- Responsive image gallery

- Image preview

- Lazy loading images

## User Interface

- Responsive header with navigation

- Profile dropdown/sheet

- Mobile-friendly design

- Dark/Light mode support

- Loading states and transitions

## Performance

- Optimized image loading

- Cached queries with TanStack Query

- Efficient state management

- Route-based code splitting
