import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

console.log('MONGO_URI:', process.env.MONGO_URI); // Specifically check if MONGO_URI is loaded

connectDB();

const app = express();

const _dirname = path.resolve();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: [
        'https://mern-job-portal-67oy.onrender.com', // Deployed frontend
        'http://localhost:5173', // Vite development server
        'http://localhost:3000', // Backend server (optional for tools like Postman)
    ],
    credentials: true, // Allow cookies
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 5000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req,resp) => {
    resp.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT,()=>{
   
    console.log(`Server running at port ${PORT}`);
})