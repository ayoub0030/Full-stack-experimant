# Full-Stack Learning Journey

![Project Banner](./client/public/og-image.jpg)

This project documents my journey learning full-stack web development. It's built with modern technologies and best practices to create a complete web application.

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building component-based interfaces
- **Context API** - For state management across components
- **CSS3** - With modern features like CSS variables and flexbox
- **Font Awesome** - For beautiful, scalable icons

### Backend
- **Node.js** - JavaScript runtime for server-side code
- **Express** - Web framework for building APIs
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM library for MongoDB and Node.js

## ✨ Features

- **Responsive Design** - Looks great on all devices
- **Dark/Light Mode** - Toggle between themes with state persistence
- **Modern UI Components** - Including a reusable Button component
- **Learning Progress Tracker** - Visual representation of learning journey
- **Resource Library** - Collection of helpful learning resources

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or newer)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ayoub0030/Full-stack-experimant.git
   cd Full-stack-experimant
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Create a .env file in the root directory with the following variables
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

5. Start the development servers
   ```bash
   npm run dev
   ```
   This will concurrently run both the backend server and React frontend.

## 📁 Project Structure

```
full-stack-learn/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable UI components
│       ├── context/        # React Context providers
│       └── App.js          # Main application component
├── models/                 # Mongoose models
├── routes/                 # Express API routes
├── middleware/             # Custom middleware
├── server.js              # Express server setup
└── package.json           # Project dependencies and scripts
```

## 🧠 Learning Journey

This project is part of my journey to become a full-stack developer. I'm documenting my progress and the skills I learn along the way. Feel free to follow along!

## 🚢 Deployment

This application can be deployed to various platforms:
- **Heroku** - Great for full-stack applications
- **Netlify** - Excellent for frontend deployment
- **Vercel** - Good option for Next.js applications
- **Railway** - Simple deployment for full-stack apps
