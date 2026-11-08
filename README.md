
# 🪔 Diwali Magic 2026 – Spread Happiness ✨

A magical and personalized Diwali greeting web application that allows users to create beautiful wishes, upload photos, add custom messages and share unique greeting links with friends and family.

## 🌟 About the Project

Diwali Magic 2026 makes festival greetings more personal and memorable. Instead of sending ordinary text messages, users can create customized digital greeting cards and share them through a unique link.

## ✨ Features

- 🎆 Premium Diwali-themed landing page
- 👤 Personalized sender and recipient names
- 📝 Custom Diwali greeting messages
- 📸 Photo upload with preview
- 🎨 Three greeting templates:
  - Royal Gold
  - Traditional
  - Midnight Magic
- ✨ Animated user interface
- 🔗 Unique greeting sharing links
- 📱 Responsive design
- ☁️ Cloudinary image storage
- 🗄️ MongoDB database integration

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS3
- Framer Motion
- React Router DOM
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- Multer

## 📁 Project Structure

```text
diwali-magic-2026/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/diwali-magic-2026.git
cd diwali-magic-2026
```

### 2. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file inside the client folder:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

### 3. Setup Backend

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

## 🔐 Environment Variables

You need:
- MongoDB connection string
- Cloudinary cloud name
- Cloudinary API key
- Cloudinary API secret

Never upload your actual `.env` files or secret credentials to GitHub.

## 🚀 Future Improvements

- Download greeting cards as images
- WhatsApp sharing integration
- Magical greeting reveal animations
- Social media link previews
- Greeting open counter
- Background festive music

## 👨‍💻 Developer

**Lokesh Singh Bagadwal**

- GitHub: [@lokeshsinghbagadwal713](https://github.com/lokeshsinghbagadwal713)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/lokesh-singh-bagadwal-059421263/)

## ❤️ Made with Love

Built to spread happiness, light and festive joy.

**Happy Diwali 2026! 🪔✨**
