TinySigns - MERN Stack Learning Platform

TinySigns is a full-stack MERN (MongoDB, Express, React, Node.js) based learning management system that supports multiple stakeholders:
Students – track learning progress, view exams, and get scores
Teachers – create lesson plans, schedule exams, and manage progress
Parents – monitor student performance and attendance
Admins – manage users, permissions, and content

Deployed seamlessly using Render Cloud with MongoDB Atlas integration and Google OAuth authentication.

Features
Multi-role authentication (Student / Teacher / Parent / Admin)
Google Login using OAuth 2.0
Dynamic dashboards for each role
Lesson plan creation & database sync
Exam scheduling & progress tracking
MongoDB Atlas integration
Deployed frontend and backend using Render

Tech Stack
Layer	Technology
Frontend	React.js (Vite) + Tailwind CSS
Backend	Node.js + Express.js
Database	MongoDB Atlas
Auth	Google OAuth 2.0
Deployment	Render (Frontend + Backend)
Version Control	GitHub

TinySigns/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
└── README.md


Environment Variables
Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=https://tinysigns-frontend.onrender.com

Frontend .env
VITE_API_URL=https://tinysigns-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id

Setup Instructions (Local Development)
1. Clone the Repository
git clone https://github.com/<your-username>/tinysigns.git
cd tinysigns

2. Setup Backend
cd backend
npm install
npm start

3. Setup Frontend
cd ../frontend
npm install
npm run dev

4. Connect to MongoDB Atlas
Create a cluster on MongoDB Atlas
Add a database user and whitelist all IPs (0.0.0.0/0)
Copy the connection string and place it in .env

5. Configure Google OAuth
Go to Google Cloud Console
Create new OAuth credentials
Authorized redirect URIs:
http://localhost:5173
https://tinysigns-frontend.onrender.com

Copy the Client ID & Secret and paste into backend .env


Deployment Steps (Render)

Backend
Go to Render
Create → Web Service
Connect GitHub repo
Root Directory → backend
Build Command → npm install
Start Command → npm start
Add environment variables
Deploy → copy backend URL

Frontend
Create → Static Site
Root Directory → frontend
Build Command → npm install && npm run build
Publish Directory → dist
Add environment variable:
VITE_API_URL=https://tinysigns-backend.onrender.com
Deploy


APIs (Sample Routes)
Route	Method	Description
/api/auth/google	GET	Google login
/api/students	GET	Fetch student data
/api/teacher/lessons	POST	Add new lesson plan
/api/exams/schedule	POST	Schedule exam
/api/progress/:id	GET	Fetch student progress


Tools & Libraries Used
Axios – API calls
Mongoose – MongoDB modeling
React Router DOM – Routing
Tailwind CSS – Styling
Passport.js – Google OAuth handling
Render – Hosting


Expected Outcome

After deployment:
Application is accessible globally via HTTPS URLs
Users can sign in with Google
Data updates in MongoDB Atlas instantly
Students’ progress and exams reflect dynamically
Teacher lesson plans sync with backend

License
This project is developed for educational purposes under the MIT License.

Developer
Author: Shashank Kulkarni
Institution: K. J. Somaiya College of Engineering
Course Outcome (CO5): Deploy MERN application to cloud and collaborate using GitHub.


Contact
If you encounter a redirect_uri_mismatch or login error, ensure:
Your Google OAuth redirect URIs match the Render frontend URL
The backend .env contains the correct FRONTEND_URL

Final Deployment URLs
Frontend: https://tinysigns-frontend.onrender.com
Backend: https://tinysigns-backend.onrender.com
