import express from "express";
import connectDB from "./db.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./userRoutes.js"
import messageRoutes from "./messageRoutes.js"
import groupRoutes from "./groupRoutes.js"
import multer from "multer";
import {app,server} from "./socket/socket.js"

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/images')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname)
    }
})
export const upload = multer({ storage: storage });


app.use(cookieParser());
app.use(express.json());

app.use('/api/user/',userRoutes)
app.use('/api/group/',groupRoutes)
app.use('/api/message/',messageRoutes)





server.listen(process.env.PORT,() => {
    console.log("Started!");
})