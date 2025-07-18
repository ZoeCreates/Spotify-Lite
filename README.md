# Spotify Lite Backend & Frontend

A full-stack music application with a Node.js/Express backend and React frontend, featuring song search, user profiles, and music library management.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)

- **Song Management**: Search songs by title, artist, genre, and language
- **User System**: Dynamic user management with profile updates
- **Like System**: Like/unlike songs functionality
- **Artist Following**: Follow/unfollow artists
- **RESTful API**: Clean API endpoints for all operations
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest + Supertest for API testing

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

### Songs

- `GET /songs/search` - Search songs with filters
- `PUT /songs` - Like/unlike a song

### Artists

- `PUT /artists` - Follow/unfollow an artist

### Users

- `GET /user/songs` - Get user's liked songs
- `PUT /user/info` - Update user profile

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

### Dynamic User Management

- No hardcoded user IDs
- Automatic user detection
- Support for multiple users

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

- This is a demo application
- No authentication implemented
- Uses dynamic user selection for demo purposes
- In production, implement proper authentication

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
