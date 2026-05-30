# API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

### Register User

```
POST /auth/register
```

**Request:**

```json
{
	"email": "user@example.com",
	"username": "username",
	"password": "securepassword"
}
```

**Response (201):**

```json
{
	"user": {
		"id": "user-id",
		"email": "user@example.com",
		"username": "username",
		"createdAt": "2026-05-30T10:00:00Z"
	},
	"accessToken": "token",
	"refreshToken": "token"
}
```

### Login

```
POST /auth/login
```

**Request:**

```json
{
	"email": "user@example.com",
	"password": "securepassword"
}
```

**Response (200):**

```json
{
	"user": {
		"id": "user-id",
		"email": "user@example.com",
		"username": "username"
	},
	"accessToken": "token",
	"refreshToken": "token"
}
```

### Refresh Token

```
POST /auth/refresh
```

**Request:**

```json
{
	"refreshToken": "refresh-token"
}
```

**Response (200):**

```json
{
	"accessToken": "new-token",
	"refreshToken": "new-refresh-token"
}
```

### Get Current User (Protected)

```
GET /auth/me
```

**Response (200):**

```json
{
	"id": "user-id",
	"email": "user@example.com",
	"username": "username",
	"currentLevel": 1,
	"totalXP": 100,
	"currentJLPT": "N5",
	"dailyStreak": 5,
	"createdAt": "2026-05-30T10:00:00Z"
}
```

---

## Cards

### Get Cards by Level

```
GET /cards?level=1
```

**Query Parameters:**

- `level` (required): Card level (1-100+)

**Response (200):**

```json
{
	"level": 1,
	"count": 5,
	"cards": [
		{
			"id": "card-id",
			"character": "あ",
			"romaji": "a",
			"reading": "あ",
			"meaning": "vowel",
			"type": "HIRAGANA",
			"strokeOrder": "image-url",
			"audioUrl": "audio-url"
		}
	]
}
```

### Get Card by ID

```
GET /cards/:id
```

**Response (200):**

```json
{
	"id": "card-id",
	"character": "あ",
	"romaji": "a",
	"reading": "あ",
	"meaning": "vowel",
	"type": "HIRAGANA",
	"level": 1,
	"jlptLevel": null,
	"strokeCount": 1,
	"strokeOrder": "image-url",
	"mnemonics": "memory aid",
	"examples": ["例文1", "例文2"],
	"frequency": "COMMON",
	"tags": ["hiragana", "vowels"],
	"audioUrl": "audio-url",
	"createdAt": "2026-05-30T10:00:00Z",
	"updatedAt": "2026-05-30T10:00:00Z"
}
```

### Get Due Cards (Protected)

```
GET /cards/due/cards?limit=20
```

**Query Parameters:**

- `limit` (optional, default: 20): Number of cards to return

**Response (200):**

```json
{
  "count": 5,
  "cards": [
    {
      "progressId": "progress-id",
      "id": "card-id",
      "character": "あ",
      "masteryLevel": 75.5,
      ...
    }
  ]
}
```

### Get New Cards (Protected)

```
GET /cards/new/cards?level=1&limit=10
```

**Query Parameters:**

- `level` (required): Card level
- `limit` (optional, default: 10): Number of new cards

**Response (200):**

```json
{
  "level": 1,
  "count": 5,
  "cards": [...]
}
```

### Get Level Progress (Protected)

```
GET /cards/progress/:level
```

**Response (200):**

```json
{
	"level": 1,
	"totalCards": 46,
	"studiedCards": 30,
	"masteredCards": 15,
	"progressPercent": 50.0
}
```

---

## Progress & Reviews

### Record Card Review (Protected)

```
POST /progress/review
```

**Request:**

```json
{
	"cardId": "card-id",
	"quality": 4,
	"responseTime": 2500
}
```

**Quality Levels:**

- 0-2: Incorrect / Hard
- 3: OK / Good enough
- 4: Good
- 5: Perfect

**Response (200):**

```json
{
  "success": true,
  "updated": {
    "id": "progress-id",
    "interval": 3,
    "easeFactor": 2.5,
    "repetitions": 1,
    "masteryLevel": 75.5,
    "attempts": 4,
    "correctCount": 3,
    "wrongCount": 1,
    "status": "LEARNING",
    ...
  },
  "xpReward": 10,
  "nextReviewDate": "2026-06-02T10:00:00Z",
  "masteryLevel": 75.5
}
```

### Start Study Session (Protected)

```
POST /progress/session/start
```

**Response (201):**

```json
{
	"id": "session-id",
	"userId": "user-id",
	"startedAt": "2026-05-30T10:00:00Z",
	"endedAt": null,
	"cardsReviewed": 0,
	"correctAnswers": 0,
	"accuracy": null
}
```

### End Study Session (Protected)

```
POST /progress/session/end
```

**Response (200):**

```json
{
	"id": "session-id",
	"userId": "user-id",
	"startedAt": "2026-05-30T10:00:00Z",
	"endedAt": "2026-05-30T10:15:00Z",
	"durationMinutes": 15,
	"cardsReviewed": 20,
	"correctAnswers": 18,
	"accuracy": 90.0
}
```

---

## Error Responses

### 400 - Bad Request

```json
{
	"error": "Validation error message"
}
```

### 401 - Unauthorized

```json
{
	"error": "Invalid or expired token"
}
```

### 404 - Not Found

```json
{
	"error": "Resource not found"
}
```

### 500 - Server Error

```json
{
	"error": "Internal server error"
}
```

---

## SRS Algorithm Details

The system uses the SM2 (Super Memory 2) algorithm:

- **Interval**: Days until next review (starts at 1)
- **Ease Factor**: Difficulty multiplier (starts at 2.5, min 1.3)
- **Repetitions**: Consecutive correct answers

Quality ratings affect progression:

- **0-2**: Wrong - resets to interval 1
- **3-5**: Correct - increases interval and ease factor

Mastery levels determine status:

- **0-50%**: NEW / LEARNING
- **50-80%**: LEARNING / REVIEW
- **80-90%**: REVIEW
- **90%+**: MASTERED

---

## Development Notes

### Testing Auth Flow

```bash
# 1. Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. Get Current User (replace TOKEN)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# 4. Get Cards
curl -X GET "http://localhost:3000/api/cards?level=1"

# 5. Review Card (replace TOKEN and IDs)
curl -X POST http://localhost:3000/api/progress/review \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cardId":"CARD_ID","quality":4,"responseTime":2500}'
```

---

## Rate Limiting

Currently no rate limiting is applied. This should be added before production.

## CORS

Cross-Origin requests are allowed from:

- `http://localhost:3001` (Web)
- `http://localhost:8081` (Mobile)

Update `CORS_ORIGIN` in `.env` for production.
