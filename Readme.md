# 🐦 Social Media Backend API

A full-featured backend API for a Twitter-like social media platform built with **Node.js**, **Express**, and **MongoDB**. It includes features like tweets, hashtags, likes, retweets, bookmarks, notifications, following, full-text search, and soft deletion.

---

## 🚀 Features

- ✅ JWT Authentication (Register/Login)
- 📝 Tweet with text, hashtags, and media (optional)
- ❤️ Like / Unlike tweets
- 🔁 Retweet existing tweets
- 💬 Reply to tweets (threaded replies)
- 🔖 Bookmark / Unbookmark tweets
- 🔔 Notifications (likes, follows, etc.)
- 🔍 Full-text search (users & tweets)
- 📈 Trending hashtags (last 24h)
- 👤 Follow / Unfollow users
- 🧵 User timeline/feed
- 🗑️ Soft delete for users and tweets
- 🌐 CORS-enabled

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **dotenv** for config
- **CORS** middleware
- **Virtual fields (e.g. bookmark count)**

---

## 📦 API Endpoints

### 🔐 Auth

| Method | Route          | Description        |
|--------|----------------|--------------------|
| POST   | `/api/auth/register` | Register a user |
| POST   | `/api/auth/login`    | Login a user    |

### 🐦 Tweets

| Method | Route             | Description              |
|--------|-------------------|--------------------------|
| POST   | `/api/tweets`     | Create a tweet           |
| GET    | `/api/tweets`     | Get all tweets           |
| GET    | `/api/tweets/:id` | Get single tweet         |
| DELETE | `/api/tweets/:id` | Soft delete a tweet      |

### 🔁 Retweets / ❤️ Likes / 🔖 Bookmarks

| Method | Route                      | Description               |
|--------|----------------------------|---------------------------|
| POST   | `/api/tweets/:id/like`     | Like or unlike a tweet    |
| POST   | `/api/tweets/:id/retweet`  | Retweet or unretweet      |
| POST   | `/api/tweets/:id/bookmark` | Toggle bookmark           |

### 📢 Notifications

| Method | Route             | Description             |
|--------|-------------------|-------------------------|
| GET    | `/api/notifications` | Get all your notifications |

### 🔍 Search & Trends

| Method | Route               | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/search?q=...` | Search tweets & users    |
| GET    | `/api/trending`     | Get trending hashtags    |
| GET    | `/api/hashtag/:tag` | Get tweets for a hashtag |

### 🧑 Users

| Method | Route                  | Description            |
|--------|------------------------|------------------------|
| GET    | `/api/users/:id`       | Get user profile       |
| POST   | `/api/users/:id/follow`| Follow / Unfollow user |

---

## 🧪 Running Locally

```bash
# Clone the repo
git clone https://github.com/yourname/social-backend.git
cd social-backend

# Install dependencies
npm install

# Add environment variables
touch .env
# Then add:
# MONGODB_URI=your-mongodb-connection
# JWT_SECRET=your_jwt_secret
# PORT='your port'

# Run the server
npm run dev
```
---
## License
MIT — feel free to use and modify.
