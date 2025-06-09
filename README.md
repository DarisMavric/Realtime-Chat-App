
# Chatter

**Chatter** is a full-stack real-time chat application that enables seamless one-to-one and group messaging. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO, it offers features like typing indicators, message history, and user presence tracking.

## 🚀 Features

- Real-time messaging with Socket.IO
- User authentication and authorization
- One-to-one and group chat support
- Persistent message history stored in MongoDB
- Responsive and intuitive user interface

## 🛠️ Tech Stack

- **Frontend**: React, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB

## 📦 Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/DarisMavric/Realtime-Chat-App.git
   cd Realtime-Chat-App/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:

   ```env
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

## 📄 Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with existing credentials.
3. Create or join chat rooms to start messaging in real-time.
