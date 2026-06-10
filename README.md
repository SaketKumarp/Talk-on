# 🤖 Talk-On AI Chat App

Talk-On is a modern AI-powered mobile chat application built with React Native, Expo, and Socket.IO. The app enables real-time conversations with an AI assistant through a clean and intuitive interface.

<img src="https://github.com/user-attachments/assets/934c4472-2c88-4abe-97b3-ec6189575e54"
     alt="Talk-On App"
     width="300" />

## ✨ Features
lests see

* 💬 Real-time messaging using Socket.IO
* 🤖 AI-powered responses
* 📱 Cross-platform mobile application
* ⚡ Fast and responsive UI
* 🕒 Conversation history
* 👤 User profile management
* 🎨 Modern dark-themed interface
* 🔄 Live message updates
* 📡 WebSocket-based communication
* 🚀 Built with Expo Router

## 🛠️ Tech Stack

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript
* NativeWind (Tailwind CSS for React Native)
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* AI Model Integration (OpenAI/Groq/Gemini)

## 📂 Project Structure

```bash
app/
├── (tabs)/
│   ├── index.tsx        # Home/Chat Screen
│   ├── history.tsx      # Chat History
│   ├── profile.tsx      # User Profile
│   └── _layout.tsx      # Tab Navigation
│
├── _layout.tsx          # Root Layout
│
components/
├── ChatBubble.tsx
├── MessageInput.tsx
├── Header.tsx
└── LoadingIndicator.tsx

hooks/
├── useSocket.ts
└── useChat.ts

constants/
└── theme.ts
```

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/talk-on.git
cd talk-on
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npx expo start
```

### Run on iOS

```bash
npx expo run:ios
```

### Run on Android

```bash
npx expo run:android
```

## 🔌 Socket.IO Flow

```text
User Message
      ↓
Socket.IO Client
      ↓
Backend Server
      ↓
AI Model
      ↓
Backend Server
      ↓
Socket.IO
      ↓
Mobile App
```

## 📱 Screens

### Home

* Start AI conversations
* Send and receive messages in real time
* Display typing indicators

### History

* View previous conversations
* Search past chats
* Resume conversations

### Profile

* Manage account information
* Customize preferences
* View usage statistics

## 🔮 Future Improvements

* Voice-to-text support
* Text-to-speech responses
* AI image generation
* Group chat functionality
* Push notifications
* Authentication & Authorization
* Cloud chat synchronization
* Offline message caching

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React Native, Expo, Socket.IO, and AI.
<img width="1170" height="2532" alt="Simulator Screenshot - iPhone 16e - 2026-06-08 at 23 15 57" src="https://github.com/user-attachments/assets/d6196b2a-ce5a-4568-b7d5-73f32802dcb6" />
