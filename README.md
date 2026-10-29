# Spotify Lite Backend & Frontend

A full-stack music application with a Node.js/Express backend and React frontend, featuring song search, user profiles, and music library management.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)

- **Song Management**: Search songs by title, artist, genre, and language
- **Authentication**: JWT login and sign-up with bcrypt-hashed passwords
- **User System**: Profile updates scoped to the logged-in user
- **Like System**: Like/unlike songs functionality
- **Artist Following**: Follow/unfollow artists
- **RESTful API**: Clean API endpoints for all operations
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest + Supertest API tests on an in-memory MongoDB

### Frontend (React + Material-UI)

- **Modern UI**: Spotify-inspired dark theme with Material-UI
- **Search Interface**: Advanced search with filters
- **Song Cards**: Beautiful song display with like/follow buttons
- **User Profile**: Profile management interface
- **Liked Songs**: Personal music library
- **Responsive Design**: Works on desktop and mobile

## 📁 Project Structure

```
spotify-lite-backend/
├── backend/
│   ├── controllers/     # API controllers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Express middleware
│   ├── config/         # Database configuration
│   └── test/           # API tests
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   └── services/   # API service layer
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

### Backend Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start MongoDB:**
   Make sure MongoDB is running on `localhost:27017`

3. **Seed the database:**

   ```bash
   npm run seed:data
   ```

4. **Start the backend server:**

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3000`

5. **Run tests (optional):**
   ```bash
   npm test
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3001`

## 🎯 API Endpoints

Routes marked 🔒 need an `Authorization: Bearer <token>` header.

### Auth

- `POST /auth/register` - Create an account, returns a JWT
- `POST /auth/login` - Log in with username or email, returns a JWT
- `GET /auth/me` 🔒 - Current user

### Songs

- `GET /songs/search` - Search songs with filters
- `PUT /songs` 🔒 - Like a song

### Artists

- `GET /artists/followed` 🔒 - Followed artists
- `PUT /artists` 🔒 - Follow an artist

### Users

- `GET /user/songs` 🔒 - Get user's liked songs
- `GET /user/info` 🔒 - Get user profile
- `PUT /user/info` 🔒 - Update user profile

## 🎨 Frontend Pages

1. **Home** (`/`) - Welcome page with feature overview
2. **Search** (`/search`) - Search songs with filters
3. **Liked Songs** (`/liked-songs`) - User's music library
4. **Profile** (`/profile`) - User profile management

## 🧪 Testing

### Backend Tests

```bash
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🔧 Development Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run API tests
- `npm run seed:data` - Seed database with sample data
- `npm run view:data` - View database contents

### Frontend

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🎵 Sample Data

The application comes with pre-seeded data including:

- **Artists**: Taylor Swift, Drake, Ed Sheeran, BTS
- **Songs**: Popular tracks from each artist
- **Users**: Sample user accounts with preferences

## 🌟 Key Features

### Accounts

- Sign up and log in from the `/login` page
- Liked songs, followed artists, and profile belong to the logged-in user
- Private pages redirect to login and return afterwards

### Real-time Search

- Instant search results
- Multiple filter options
- Responsive search interface

### Modern UI/UX

- Spotify-inspired design
- Dark theme
- Smooth animations
- Mobile-responsive

## 🔒 Security Notes

- Passwords are hashed with bcrypt (cost 12) and never returned by the API
- Access tokens are HS256 JWTs signed with `JWT_SECRET`, expiring after `JWT_EXPIRES_IN` (default 1h); verification pins the algorithm, so unsigned (`alg: none`) tokens are rejected
- Every user route reads the user from the token, so one account cannot read or change another's data
- Login returns the same error for an unknown user and a wrong password, and rejects non-string input to block NoSQL operator injection
- `/auth` routes are rate limited to 10 attempts per IP every 15 minutes
- The server refuses to start without `JWT_SECRET`, and hashes any plaintext passwords left from older versions on startup
- The frontend keeps the token in `localStorage`; a production app might prefer an httpOnly cookie to limit exposure to XSS

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or similar
2. Update database connection string
3. Deploy to Heroku, Vercel, or similar

### Frontend Deployment

1. Update API base URL in `src/services/api.js`
2. Build the application: `npm run build`
3. Deploy to Netlify, Vercel, or similar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is for educational purposes.

---

**Happy coding! 🎵**
# Trigger redeployment
