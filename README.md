# Ali Raza - MERN & ERP Full Stack Portfolio (Single-Repo Vercel Architecture)

A production-ready, highly animated, dark-first personal portfolio website built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS**. 

Designed specifically as a unified single repository ready for **one-click deployment to Vercel** (with serverless Express backend API and Vite React SPA frontend) without requiring separate platforms like Railway or Render.

---

## 🌟 Key Highlights & Engineering Features

- **Single Repository Vercel Architecture**: React frontend and Express serverless backend live in one repository (`portfolio/`).
- **Real MERN Backend**: Node.js & Express API with MongoDB Atlas integration and Mongoose schemas.
- **Serverless Cached DB Connection**: Avoids cold-start overhead and multiple MongoDB sockets across warm invocations.
- **Interactive Projects Showcase**: Features UrbanBite (restaurant management system with live customer demo & admin portal), Pesticides ERP, Pharmacy ERP, RazaWears, Plantaria, Wavestream, Campus Event Finder, and AcademiX.
- **Case Study Detail Pages**: Dynamic client-side routing (`/projects/:slug`) rendering technical architecture, features, and source repositories.
- **Experience Timeline**: Highlights Ali Raza's 1-year SPS Web Development Internship (81.6% qualifying assessment score), Hat Tech Media, and ARCH Technologies.
- **Interactive Skills Matrix**: Real categorized technology badges with filters (Frontend, Backend, Database, Programming, DevOps, Tools, Design) with zero fake metrics.
- **Protected Admin Console**: Authenticated dashboard (`/admin`) with JWT & bcrypt password hashing for real-time CRUD management over projects, timeline, skills, education, certifications, messages, and site configuration.
- **Message Inquiries & Email**: Contact submissions are validated, rate-limited, stored in MongoDB, and dispatched via optional SMTP notifications.
- **Resilient Fallback Mode**: Client frontend effortlessly falls back to built-in datasets if MongoDB is offline or in cold start.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons, React Router DOM |
| **Backend** | Node.js, Express.js, Serverless Handler (`api/index.js`) |
| **Database** | MongoDB Atlas, Mongoose ODM with cached connection pooling |
| **Security** | JWT, bcryptjs, Helmet, CORS, express-rate-limit, Input Sanitization |
| **Email** | Nodemailer (Optional SMTP notifications with graceful fallback) |
| **Hosting & Deployment** | Vercel (Frontend SPA + Serverless Express `/api/*`) |

---

## 📁 Repository Directory Structure

```text
portfolio/
├── client/                     # React + Vite Frontend
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── animations/         # Framer Motion animation variants
│   │   ├── assets/             # Project badges and logos
│   │   ├── components/         # Reusable UI (Navbar, Footer, ProjectCard, TerminalVisual, etc.)
│   │   ├── data/               # Resilient fallback portfolio data
│   │   ├── hooks/              # Custom useFetch hook with fallback handling
│   │   ├── layouts/            # MainLayout & protected AdminLayout
│   │   ├── pages/              # HomePage, ProjectDetailsPage, NotFoundPage
│   │   │   └── admin/          # AdminLoginPage, AdminDashboardPage, AdminProjectsPage, etc.
│   │   ├── sections/           # Hero, About, Skills, Experience, Projects, Education, Contact
│   │   ├── services/           # Unified API and authService client
│   │   ├── utils/              # Client-side helper functions
│   │   ├── App.jsx             # React Router routing definition
│   │   ├── index.css           # Tailwind CSS v4 and glassmorphism utilities
│   │   └── main.jsx            # React root DOM bootstrap
│   ├── index.html              # HTML entry point with metadata and SEO
│   ├── package.json            # Client dependencies
│   └── vite.config.js          # Vite config with /api local proxy to Express
│
├── server/                     # Express.js Backend
│   └── src/
│       ├── config/             # Cached MongoDB connection (db.js)
│       ├── controllers/        # Project, Experience, Skill, Auth, Message, Site controllers
│       ├── middleware/         # authMiddleware, rateLimitMiddleware, errorMiddleware
│       ├── models/             # Mongoose schemas: Admin, Project, Experience, Skill, etc.
│       ├── routes/             # REST routes mounted under /api/*
│       ├── seed/               # Idempotent DB seeder (seed.js & seedData.js)
│       ├── services/           # Email service with SMTP & fallback logging
│       ├── utils/              # Token generator and standardized apiResponse
│       ├── validators/         # Request validation middleware
│       └── app.js              # Express application definition & local listener
│
├── api/
│   └── index.js                # Vercel serverless function entry point
├── .env.example                # Sample environment variables
├── .gitignore                  # Git exclusions (node_modules, .env, dist)
├── package.json                # Root monorepo scripts
├── vercel.json                 # Vercel unified build, functions, and rewrites
└── README.md                   # Complete architectural and setup guide
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project (or add these to your **Vercel Project Settings > Environment Variables**):

```env
# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aliraza_portfolio?retryWrites=true&w=majority

# JWT Authentication Configuration
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d

# Initial Admin Credentials (used during DB seeding or setup)
ADMIN_EMAIL=aliraza777212@gmail.com
ADMIN_PASSWORD=your_secure_admin_password

# Port for local standalone Express server (default 5000)
PORT=5000

# Optional SMTP Email Configuration (If omitted, contact messages are stored in MongoDB)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
CONTACT_EMAIL=aliraza777212@gmail.com
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ali1414-developer/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm run install:all
```
*(This installs root, client, and server dependencies in one command).*

### 3. Configure `.env`
```bash
cp .env.example .env
# Edit .env with your MongoDB Atlas URI and JWT Secret
```

### 4. (Optional) Seed Initial Portfolio Data
Populate MongoDB Atlas with Ali Raza's authentic projects and timeline:
```bash
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```
- Client runs on: `http://localhost:3000`
- Express API runs on: `http://localhost:5000`
- The Vite dev server proxies all `/api/*` requests to port `5000` seamlessly.

---

## ☁️ Vercel One-Click Deployment

Deploying the entire full-stack project from **one single GitHub repository**:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Vercel-ready MERN portfolio"
   git branch -M main
   git remote add origin https://github.com/Ali1414-developer/portfolio.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository.
   - Leave the root directory as `./`.

3. **Configure Environment Variables in Vercel**:
   Add the following in **Settings > Environment Variables**:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - *(Optional)* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

4. **Deploy**:
   Click **Deploy**.
   Vercel will:
   - Build the React Vite client into `client/dist`.
   - Package `api/index.js` as a Serverless Function handling all `/api/*` requests.
   - Serve client routes (`/`, `/projects/:slug`, `/admin`, etc.) without 404 errors.

---

## 📡 API Endpoints Reference

### Public Endpoints
- `GET /api/health` - Service health status
- `GET /api/projects` - List all projects
- `GET /api/projects/:slug` - Get project case study by slug
- `GET /api/experience` - Work and internship timeline
- `GET /api/skills` - Categorized technical skills
- `GET /api/education` - Academic degrees
- `GET /api/certifications` - Verified certifications
- `GET /api/site` - Global site profile & bio
- `POST /api/messages` - Submit contact inquiry (Rate-limited, stored in DB)

### Admin Endpoints (Requires `Authorization: Bearer <token>`)
- `POST /api/auth/login` - Admin authentication
- `GET /api/auth/me` - Verify current session
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/experience` - Create experience entry
- `PUT /api/experience/:id` - Update experience entry
- `DELETE /api/experience/:id` - Delete experience entry
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/messages` - View all client inquiries
- `PATCH /api/messages/:id/status` - Update inquiry status (`new`, `read`, `replied`, `archived`)
- `DELETE /api/messages/:id` - Remove inquiry
- `PUT /api/site` - Update global bio and socials

---

## 👤 Author & Contact

**Ali Raza**  
- **Email:** [aliraza777212@gmail.com](mailto:aliraza777212@gmail.com)  
- **LinkedIn:** [https://www.linkedin.com/in/ali-raza-baloch/](https://www.linkedin.com/in/ali-raza-baloch/)  
- **GitHub:** [https://github.com/Ali1414-developer](https://github.com/Ali1414-developer)  
- **Education:** Software Engineering, Air University, Multan Campus  
- **Location:** Layyah, Punjab, Pakistan  
