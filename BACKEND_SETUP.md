# BACKEND SETUP

```bash
cd backend
npm install
```

## Environment

Create `.env`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/flashcard_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-generate-with-openssl
NODE_ENV=development
PORT=3000
```

## Database Setup

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

## Start

```bash
npm run dev
```

API runs on `http://localhost:3000`
