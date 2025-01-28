import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

console.log('MONGO_URI:', process.env.MONGO_URI); // Specifically check if MONGO_URI is loaded

=======

// Load environment variables from the backend .env file
dotenv.config({ path: './backend/.env' });

// Connect to MongoDB
>>>>>>> 3e8a60bf2d10086d8aacb28a6c662f3e5c1d6105
connectDB();

const app = express();

// Resolve the current directory (root directory)
const _dirname = path.resolve();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
<<<<<<< HEAD
const corsOptions = {
    origin: [
        'https://mern-job-portal-67oy.onrender.com', // Deployed frontend
        'http://localhost:5173', // Vite development server
        'http://localhost:3000', // Backend server (optional for tools like Postman)
    ],
    credentials: true, // Allow cookies
};
app.use(cors(corsOptions));


=======

// CORS Configuration
const corsOptions = {
  origin: [
    'https://job-portal-gold-ten.vercel.app',  // Allow your deployed frontend (production)
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Backend server port configuration
>>>>>>> 3e8a60bf2d10086d8aacb28a6c662f3e5c1d6105
const PORT = process.env.PORT || 5000;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files from the frontend build directory
// Make sure the 'frontend/dist' or 'frontend/build' folder contains the built files after running `npm run build` in the frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));

<<<<<<< HEAD
app.listen(PORT,()=>{
   
    console.log(`Server running at port ${PORT}`);
})
=======
// Catch-all route to serve the frontend app
app.get('*', (req, resp) => {
  resp.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
>>>>>>> 3e8a60bf2d10086d8aacb28a6c662f3e5c1d6105
