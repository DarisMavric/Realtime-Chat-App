import express from "express";
import connectDB from "./db.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./user.js"

connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());




app.use('/api/user/',userRoutes)



app.listen(process.env.PORT,() => {
    console.log("Started!");
})