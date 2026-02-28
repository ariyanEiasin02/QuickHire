# QuickHire — Mini Job Board

A full-stack job board application built with **Next.js 15**, **Node.js / Express**, and **MongoDB**.

---

## Project Structure

```
QuickHire/
├── frontend-hire/      # Next.js 15 — Public job portal (port 3000)
├── backend-hire/       # Node.js + Express REST API (port 5000)
└── admin-hire/         # Next.js 15 — Admin dashboard (port 3001)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend (public) | Next.js 15, TypeScript, SCSS, Bootstrap 5 CDN, Axios |
| Admin panel | Next.js 15, TypeScript, SCSS, Bootstrap 5 CDN, Axios |
| Backend API | Node.js, Express, Mongoose |
| Database | MongoDB |
| Auth | JWT (jsonwebtoken) + bcryptjs |

---

## Prerequisites

- **Node.js** ≥ 18
- **MongoDB** — local (`mongodb://localhost:27017`) or [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Environment Variables

### `backend-hire/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quickhire
JWT_SECRET=your_super_secret_jwt_key
```

### `frontend-hire/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### `admin-hire/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Setup & Run

### 1 — Backend API

```bash
cd backend-hire
npm install
# Copy/create the .env file as shown above
npm run dev        # starts on http://localhost:5000
```

### 2 — Public Frontend

```bash
cd frontend-hire
npm install
npm run dev        # starts on http://localhost:3000
```

### 3 — Admin Panel

```bash
cd admin-hire
npm install
npm run dev        # starts on http://localhost:3001
```

> Run all three in separate terminals simultaneously.

---

## Creating the First Admin User

Use the register endpoint with role = "admin":

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@quickhire.com",
    "password": "Admin1234!",
    "role": "admin"
  }'
```

Then login at **http://localhost:3001/login** with those credentials.

---

## API Reference

### Auth

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Register a user | Public |
| `POST` | `/api/auth/login` | Login — returns JWT | Public |
| `GET`  | `/api/auth/me` | Get current user | Protected |

### Jobs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET`  | `/api/jobs` | List all jobs (supports `?search=`, `?category=`, `?location=`) | Public |
| `GET`  | `/api/jobs/:id` | Get single job | Public |
| `POST` | `/api/jobs` | Create job | Admin only |
| `DELETE` | `/api/jobs/:id` | Delete job | Admin only |

### Applications

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/applications` | Submit application | Public |
| `GET`  | `/api/applications` | List all applications | Admin only |

---

## Features

### Public Frontend (`localhost:3000`)
- Home page with featured & latest jobs fetched live from the API
- Job listing page with **real-time search**, **category filter**, and **location filter**
- Job detail page with full description, company info, posting date
- Apply Now form with full validation — submits directly to the backend API
- Responsive layout down to mobile

### Admin Panel (`localhost:3001`)
- Admin-only login (JWT, role check)
- Dashboard overview: total jobs, applications, companies, categories
- Jobs management: create (modal form) + delete
- Applications viewer: table with cover note modal
- Sidebar navigation with protected route guard

---

## Data Models

### Job
```json
{
  "_id": "ObjectId",
  "title": "string",
  "company": "string",
  "location": "string",
  "category": "string",
  "description": "string",
  "createdAt": "Date"
}
```

### Application
```json
{
  "_id": "ObjectId",
  "job": "ObjectId (ref: Job)",
  "name": "string",
  "email": "string (validated)",
  "resumeLink": "string (URL)",
  "coverNote": "string",
  "createdAt": "Date"
}
```

### User
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (bcrypt hashed)",
  "role": "user | admin",
  "createdAt": "Date"
}
```

---

## Validation

All endpoints validate:
- Required fields must be present
- Email format validated with regex + express-validator
- Resume link must be a valid URL
- Passwords hashed with bcrypt (salt rounds: 12)
- Admin routes protected by JWT middleware + role check

---

## Folder Structure

```
backend-hire/src/
├── config/          # MongoDB connection
├── controllers/     # jobController, applicationController, authController
├── middleware/      # auth (protect, adminOnly), validateApplication
├── models/          # Job, Application, User (Mongoose schemas)
├── routes/          # jobs.js, applications.js, auth.js
└── server.js

frontend-hire/
├── app/
│   ├── page.tsx              # Home
│   ├── jobs/page.tsx         # Job listing with search/filter
│   ├── jobs/[id]/page.tsx    # Job detail + apply form
│   └── login/page.tsx        # User login
├── components/
│   ├── Home/                 # Navbar, Hero, FeaturedJobs, LatestJobs, Footer
│   ├── Jobs/                 # ApplyForm
│   ├── Common/               # SectionTop
│   └── shared/               # ApiJobCard, ApiLatestJobCard, TagBadge, CompanyLogo
├── context/AuthContext.tsx
├── lib/api.ts                # Axios instance + typed API helpers
├── data/jobs.ts              # (legacy static data — kept for reference)
└── styles/                   # SCSS modules per component

admin-hire/src/
├── app/
│   ├── page.tsx              # Redirect to /dashboard or /login
│   ├── login/page.tsx        # Admin login
│   └── dashboard/
│       ├── layout.tsx        # Sidebar shell + route guard
│       ├── page.tsx          # Overview (stats + recent tables)
│       ├── jobs/page.tsx     # CRUD job management
│       └── applications/page.tsx  # Applications viewer
├── context/AuthContext.tsx   # Admin-only auth (qha_token)
├── lib/api.ts                # Admin API helpers
└── styles/                   # Dashboard.scss, Login.scss, etc.
```

---

## Scripts

```bash
# Backend
npm run dev    # nodemon — auto-reload on changes
npm start      # production start

# Frontend / Admin
npm run dev    # Next.js dev server
npm run build  # Production build
npm start      # Production start
npm run lint   # ESLint check
```
