import express from "express";
import connectDB from "./db.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./userRoutes.js"
import messageRoutes from "./messageRoutes.js"

connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());




app.use('/api/user/',userRoutes)
app.use('/api/message/',messageRoutes)



app.listen(process.env.PORT,() => {
    console.log("Started!");
})