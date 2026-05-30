# Project Structure & Setup Guide

## 📁 Directory Structure

```bash
flashcard-platform/
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── index.ts         # Entry point
│   │   ├── middleware/      # Auth, CORS, logging
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── controllers/     # Request handlers
│   │   └── utils/
│   │       ├── srs.ts       # Spaced Repetition System (SM2)
│   │       ├── redis.ts     # Redis client & utilities
│   │       └── jwt.ts       # Token generation/verification
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── web/                      # Next.js 15 + React 19
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── (auth)/          # Auth routes
│   │   ├── (dashboard)/     # Protected routes
│   │   └── api/             # Next.js API routes
│   ├── components/          # Reusable components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & helpers
│   ├── store/               # Zustand store
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── .env.example
│
├── mobile/                   # React Native + Expo
│   ├── app/
│   │   ├── _layout.tsx      # Root navigation
│   │   ├── index.tsx        # Home screen
│   │   └── learn/           # Learning screens
│   ├── store/               # Redux store & slices
│   ├── api/                 # API client
│   ├── hooks/               # Custom hooks
│   ├── components/          # React Native components
│   ├── package.json
│   ├── tsconfig.json
│   ├── app.json             # Expo config
│   └── .env.example
│
├── package.json             # Monorepo root
├── README.md
├── .gitignore
└── SETUP_GUIDE.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20+ (<https://nodejs.org/>)
- **PostgreSQL**: 14+ (<https://www.postgresql.org/>)
- **Redis**: 7+ (<https://redis.io/>)
- **Git**: (<https://git-scm.com/>)

### Initial Setup

```bash
# 1. Install dependencies (from root)
npm install

# 2. Setup PostgreSQL
createdb flashcard_db

# 3. Setup environment variables
# Backend
cp backend/.env.example backend/.env
# Web
cp web/.env.example web/.env
# Mobile
cp mobile/.env.example mobile/.env

# Edit .env files with your values
```

## 📦 Backend Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npm run prisma:seed

# Start development server
npm run dev
```

The API will run on `http://localhost:3000`

### Backend Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/flashcard_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-here (generate with `openssl rand -base64 32`)
JWT_REFRESH_SECRET=another-secret
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3001,http://localhost:8081
```

## 🌐 Web Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

The web app will run on `http://localhost:3001`

### Web Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-here
NODE_ENV=development
```

## 📱 Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on different platforms
npm run ios      # iOS (macOS only)
npm run android  # Android
npm run web      # Web preview
```

### Mobile Environment Variables

```env
API_URL=http://localhost:3000
ENV=development
```

## 🛠️ Development Commands

### Root (Monorepo)

```bash
npm run dev              # Start all services
npm run build            # Build all services
npm run lint             # Lint all services
npm run type-check       # Type check all services
npm run dev:backend      # Start only backend
npm run dev:web          # Start only web
npm run dev:mobile       # Start only mobile
```

### Backend

```bash
npm run dev              # Start with watch mode
npm run build            # Build to dist/
npm run start            # Run built version
npm run prisma:migrate   # Run Prisma migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Sync schema with DB
npm run prisma:seed      # Seed database
```

### Web

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Type check with TypeScript
```

### Mobile

```bash
npm start                # Start Expo server
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator
npm run web              # Run web version
```

## 🗄️ Database Schema

The database includes:

- **Users**: Authentication, profile, learning progress
- **Cards**: Content (hiragana, katakana, kanji, vocabulary, phrases)
- **CardProgress**: SRS metrics, mastery level, review history
- **StudySessions**: Study session tracking
- **Decks**: User-created card collections
- **Achievements**: Gamification badges
- **UserStats**: Aggregated statistics

See `backend/prisma/schema.prisma` for full schema.

## 🔐 Security Notes

1. **Never commit `.env` files** - use `.env.example` as template
2. **Generate JWT secrets**: `openssl rand -base64 32`
3. **Use strong database passwords**
4. **Enable HTTPS in production**
5. **Set proper CORS origins**
6. **Use environment-specific configurations**

## 🧪 Testing

```bash
# Backend
cd backend && npm run test

# Web
cd web && npm run test

# Mobile
cd mobile && npm run test
```

## 📚 Technology Stack Reminder

| Layer              | Technology               | Version     |
| ------------------ | ------------------------ | ----------- |
| **Backend API**    | Express + TypeScript     | 5.2.1 / 6.0 |
| **Database**       | PostgreSQL               | 14+         |
| **Cache/Queue**    | Redis + BullMQ           | 4.6 / 5.7   |
| **ORM**            | Prisma                   | 5.14        |
| **Validation**     | Zod                      | 3.23        |
| **Web Frontend**   | Next.js 15 + React 19    | 15.3 / 19.0 |
| **State (Web)**    | Zustand + TanStack Query | 4.5 / 5.40  |
| **Mobile**         | React Native + Expo      | 0.84 / 55   |
| **State (Mobile)** | Redux Toolkit            | 2.2         |

## 📖 API Documentation

API endpoints (WIP):

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/cards/:id` - Get card details
- `GET /api/progress` - Get user progress
- `POST /api/progress/review` - Record review
- `GET /api/users/me` - Get current user

See backend routes for full list (coming soon).

## 🐛 Common Issues

### Redis Connection Refused

```bash
# Start Redis if not running
redis-server

# Or via Docker
docker run -d -p 6379:6379 redis:latest
```

### PostgreSQL Connection Error

```bash
# Create database
createdb flashcard_db

# Or via Docker
docker run -d -p 5432:5432 \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=flashcard_db \
  postgres:14
```

### Port Already in Use

```bash
# Backend (port 3000)
sudo lsof -i :3000
kill -9 <PID>

# Web (port 3001)
sudo lsof -i :3001
kill -9 <PID>
```

## 📞 Next Steps

1. ✅ Project scaffolded
2. ⬜ Implement authentication (backend → web → mobile)
3. ⬜ Create card management endpoints
4. ⬜ Implement SRS review system
5. ⬜ Build UI components
6. ⬜ Add offline sync for mobile
7. ⬜ Deploy to production

## 📄 License

MIT
