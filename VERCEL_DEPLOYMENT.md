# Vercel Deployment Guide for Spotify Lite

This guide explains how to deploy both the backend and frontend of the Spotify Lite project to Vercel as separate projects.

## Prerequisites

1. **MongoDB Atlas Setup** (if not already done):

   - Create a MongoDB Atlas account
   - Create a new cluster
   - Create a database user
   - Get your connection string
   - Add your IP to the whitelist

2. **GitHub Repository**: Your code should be pushed to GitHub

## Deployment Strategy

We'll deploy the backend and frontend as **separate Vercel projects** to avoid conflicts.

## Step 1: Deploy Backend

### 1.1 Create Backend Project on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the "Root Directory" to `backend`
5. Click "Deploy"

### 1.2 Configure Backend Environment Variables

In your backend project settings on Vercel:

1. Go to Settings → Environment Variables
2. Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/spotify-lite?retryWrites=true&w=majority
   PORT=5001
   NODE_ENV=production
   ```

### 1.3 Backend Configuration

The backend has its own `vercel.json` file that:

- Uses `@vercel/node` for Node.js deployment
- Routes all API calls to `server.js`
- Sets production environment

## Step 2: Deploy Frontend

### 2.1 Create Frontend Project on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository again (same repo, different project)
4. **Important**: Set the "Root Directory" to `frontend`
5. Click "Deploy"

### 2.2 Configure Frontend Environment Variables

In your frontend project settings on Vercel:

1. Go to Settings → Environment Variables
2. Add the following variable:
   ```
   REACT_APP_API_URL=https://your-backend-project.vercel.app
   ```

### 2.3 Frontend Configuration

The frontend has its own `vercel.json` file that:

- Uses `@vercel/static-build` for React deployment
- Specifies `build` as the output directory
- Handles React Router with proper routing
- Includes `vercel-build` script in package.json

## Step 3: Update API Configuration

### 3.1 Update Frontend API Base URL

Once both deployments are complete:

1. Get your backend URL from Vercel (e.g., `https://spotify-lite-backend.vercel.app`)
2. Update the frontend environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-project.vercel.app
   ```
3. Redeploy the frontend

### 3.2 Update CORS Settings (if needed)

If you encounter CORS issues, update the backend `server.js`:

```javascript
app.use(
  cors({
    origin: [
      "https://your-frontend-project.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
```

## Step 4: Test the Deployment

1. **Test Backend**: Visit `https://your-backend-project.vercel.app/api/health`
2. **Test Frontend**: Visit `https://your-frontend-project.vercel.app`
3. **Test API Calls**: Check if the frontend can communicate with the backend

## Troubleshooting

### Common Issues:

1. **Build Failures**:

   - Check that root directories are set correctly
   - Verify environment variables are properly formatted
   - Check build logs for specific errors

2. **API Connection Issues**:

   - Verify `REACT_APP_API_URL` is correct
   - Check CORS settings
   - Ensure MongoDB connection string is valid

3. **Environment Variables**:
   - Make sure to use the exact variable names
   - Check that values don't have extra spaces
   - Redeploy after adding environment variables

### Environment Variable Format:

**Backend Variables:**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=5001
NODE_ENV=production
```

**Frontend Variables:**

```
REACT_APP_API_URL=https://your-backend-project.vercel.app
```

## Project Structure After Deployment

```
GitHub Repository
├── backend/          → Backend Vercel Project
│   ├── server.js
│   ├── vercel.json
│   └── ...
└── frontend/         → Frontend Vercel Project
    ├── package.json
    ├── vercel.json
    └── ...
```

## Final Notes

- Each project will have its own URL
- Backend: `https://your-backend-project.vercel.app`
- Frontend: `https://your-frontend-project.vercel.app`
- The frontend will make API calls to the backend URL
- Both projects will auto-deploy when you push to GitHub
