import { upload } from "../app.js";
import Message from "../models/messageModel.js"
import jwt from "jsonwebtoken"


export const sendMessage = async(req,res) => {
    upload.single('image')(req, res, async(err) => {
        const {userId,contactId,text} = req.body;
        const image = req.file;
        if(!userId || !contactId || !text) {
            return res.status(400).json('All fields are mandatory')
        }
        try {
            const verifyToken = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
            if(verifyToken){
                const newMessage = await Message.create({
                    userId,
                    contactId,
                    text,
                    image: image?.filename || null
                })
                if(newMessage){
                    return res.status(200).json("Message sent");
                } else {
                    return res.status(400).json("Error");
                }
            }
        } catch (err) {
            res.status(400).json("Invalid Token")
        }
    });
}

export const getMessages = async(req,res) => {
    const {userId,contactId} = req.body;
    if(!userId || !contactId){
        return res.status(400).json("All fields are mandatory");
    }
    try {
        const verifyToken = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
        if(verifyToken){
            const findChat = await Message.find({$and: [{
                $or: 
                [
                    {userId: userId,contactId:contactId},
                    {userId: contactId,contactId:userId}
                ]
            }]});
            if(findChat){
                return res.status(200).json(findChat);
            } else {
                return res.status(200).json("no messages")
            }
        }
    } catch (err) {
        res.status(400).json("Invalid Token")
    }
}