# Flashcard Platform - Japanese Learning App

A comprehensive Japanese language learning platform with adaptive spaced repetition, JLPT proficiency tracking, and support for Hiragana, Katakana, Kanji, vocabulary, and phrases.

## Stack

- **Backend**: Node.js + Express 5 + TypeScript + Prisma + PostgreSQL + Redis
- **Web**: Next.js 15 + React 19 + TanStack Query + Zustand
- **Mobile**: React Native 0.84 + Expo 55 + Redux Toolkit

## Project Structure

```bash
flashcard-platform/
├── backend/          # Express API server
├── web/              # Next.js web application
├── mobile/           # React Native mobile app
├── package.json      # Monorepo configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Redis 7+

### Installation

```bash
npm install
```

### Development

```bash
# All services
npm run dev

# Individual services
npm run dev:backend
npm run dev:web
npm run dev:mobile
```

## Architecture

See `./docs/ARCHITECTURE.md` for detailed system design.

## License

MIT
