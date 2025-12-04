# Live Scoreboard API Module Specification

## System Flow Diagram

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │
       │
       │ User login
       │ ┌───────────────────────────────────────────────────────────────┐
       ├─┤  get JWT token and attach to all request to server later on   │
       │ └───────────────────────────────────────────────────────────────┘
       │
       │ WebSocket Connection (Real-time Updates)
       │ ┌─────────────────────────────────┐
       ├─┤  Subscribe to scoreboard events │
       │ └─────────────────────────────────┘
       │
       |
       │    HTTP Request (Init a game action)
       │ ┌──────────────────────────────┐
       └─┤ POST /api/actions   |
         │ Headers: Authorization Token │
         └──────────┬───────────────────┘
                    |
                    |
            HTTP Request (Score Update after player done above action)
         ┌──────────────────────────────┐
         | POST /api/scores             │
         │ Headers: Authorization Token │
         └──────────┬───────────────────┘
                    │
                    │
         ┌─────────────────────────────┐
         │  Authentication Middleware  │
         │  - Validate JWT Token       │
         │  - Extract User ID          │
         └──────────┬──────────────────┘
                    │
         ┌─────────────────────────────┐
         │  Authorization Middleware   │
         │  - Check Rate Limits        │
         └──────────┬──────────────────┘
                    │
         ┌──────────▼──────────────┐
         │  Score Controller       │
         │  - Process Request      │
         │  - Call Service Layer   │
         └──────────┬──────────────┘
                    │
         ┌────────────────────────────┐
         │  Score Service             │
         │  - Business Logic          │
         │  - Validation(action token)│
         │  - Score Calculation       │
         └──────────┬─────────────────┘
                    │
         ┌──────────────────────────┐
         │  Database Layer          │
         │  - Update Score          │
         │  - Query Top 10          │
         └──────────┬───────────────┘
                    │
                    │
         ┌─────────────────────────┐
         │  WebSocket Server       │
         │  - Broadcast to Clients │
         └─────────────────────────┘
```

## Technology Stacks

**Runtime**: Node.js with TypeScript </br>
**Framework**: Express.js</br>
**Database**: PostgreSQL</br>
**WebSocket**: Socket.io</br>
**ORM**: TypeORM</br>
**Authentication**: Jsonwebtoken</br>
**Validation**: Class-validator</br>
**Ratelimit**: Helmet

## Data Models

### User Entity

```typescript
interface User {
  userId: string;
  username: string;
  score: number;
  updateAt: Date;
  createdAt: Date;
}
```

### ActionToken Entity

```typescript
interface ActionToken {
  tokenId: string;
  userId: string;
  actionType: string;
  points: number;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
}
```

### ScoreUpdateEvent Entity

```typescript
interface ScoreUpdateEvent {
  eventId: string;
  userId: string;
  previousScore: number;
  newScore: number;
  pointsAdded: number;
  previousRank: number;
  newRank: number;
  createdAt: Date;
}
```

## API Endpoints

### 1. POST `/api/auth/login`

user login into the game get their's jwt.

**Request Body**:

```json
{
  "userName": "user1",
  "password": "123456"
}
```

**Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "score": 0,
    "rank": 1000,
    "jwtToken": "eyhffdfd"
  }
}
```

### 2. POST `/api/scores`

Increment user's score upon action completion.

**Request Headers**:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body**:

```json
{
  "actionToken": "eyJhb",
  "actionId": "kill_dragon"
}
```

**Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "newScore": 1050,
    "rank": 7,
    "pointsAdded": 10
  }
}
```

### 3. GET `/api/scoreboard`

Retrieve top 10 users and their scores.

**Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "scoreboard": [
      {
        "rank": 1,
        "userId": "user_789",
        "username": "PlayerOne",
        "score": 5000,
        "lastUpdated": "2025-12-04T10:30:00Z"
      },
      {
        "rank": 2,
        "userId": "user_456",
        "username": "TopGamer",
        "score": 4800,
        "lastUpdated": "2025-12-04T10:28:00Z"
      }
      // ...
    ]
  }
}
```

### 4. POST `/api/actions`

Generate a one-time action token when user initiates an action.

**Request Headers**:

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body**:

```json
{
  "actionType": "complete_task",
  "actionId": "action_123456"
}
```

**Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "actionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "actionId": "action_123456",
    "expiresAt": "2025-12-04T10:35:00Z",
    "expectedPoints": 10
  }
}
```

## Real-time Communication

1. Client establishes WebSocket connection to `/ws/scoreboard`
2. Server authenticates connection with JWT
3. Server adds client to broadcast pool
4. On score update → Server broadcasts to all connected clients
5. Clients receive update and refresh scoreboard UI

**Server → Client: Scoreboard Update**

- When a score update affects the top 10, Server broadcasts the new top 10 list to all connected clients.

```json
{
  "type": "SCOREBOARD_UPDATE",
  "timestamp": "2025-12-04T10:30:00Z",
  "data": {
    "scoreboard": [
      {
        "rank": 1,
        "userId": "user_789",
        "username": "PlayerOne",
        "score": 5000,
        "lastUpdated": "2025-12-04T10:30:00Z"
      },
      {
        "rank": 2,
        "userId": "user_456",
        "username": "TopGamer",
        "score": 4800,
        "lastUpdated": "2025-12-04T10:28:00Z"
      }
      // ...
    ]
  }
}
```

## Comments for Improvement

1.  **Server-Side Action Validation:** we should check if the action complete or not then add score for user directly. user should not send the request increase score by them self.
2.  **Cache:** Using Redis for cache rank updates and retrieval.
3.  **Broadcasting Strategy:** use throttle strategy so we just need to broadcast scoreboard update every 1s
4.  **Add unit test and e2e test**
