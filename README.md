Chatter
Chatter is a full-stack real-time chat application that enables seamless one-to-one and group messaging. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO, it offers features like typing indicators, message history, and user presence tracking.

🚀 Features
Real-time messaging with Socket.IO

User authentication and authorization

One-to-one and group chat support

Typing indicators and online/offline status

Persistent message history stored in MongoDB

Responsive and intuitive user interface

🛠️ Tech Stack
Frontend: React, Socket.IO Client

Backend: Node.js, Express.js, Socket.IO

Database: MongoDB

📦 Installation
Prerequisites
Node.js (v14 or later)

MongoDB

Backend Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/DarisMavric/Realtime-Chat-App.git
cd Realtime-Chat-App/backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the backend directory and add the following:

env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy
Edit
npm run dev
Frontend Setup
Navigate to the frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend development server:

bash
Copy
Edit
npm start
📄 Usage
Open your browser and navigate to http://localhost:3000.

Register a new account or log in with existing credentials.

Create or join chat rooms to start messaging in real-time.

📁 Project Structure
pgsql
Copy
Edit
Realtime-Chat-App/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    └── package.json
🧪 Testing
To run tests, use the following command in both frontend and backend directories:

bash
Copy
Edit
npm test
