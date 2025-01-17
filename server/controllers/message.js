import { upload } from "../app.js";
import Message from "../models/messageModel.js"
import jwt from "jsonwebtoken"


export const sendMessage = async(req,res) => {
    upload.single('image')(req, res, async(err) => {
        const {userId,contactId,groupId,text,username} = req.body;
        console.log(req.body,req.file);
        const image = req.file;
        if(!groupId){
            try {
                const verifyToken = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
                if(verifyToken){
                    const newMessage = await Message.create({
                        userId,
                        contactId,
                        text: text || null,
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
        } else {
            try {
                const verifyToken = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
                if(verifyToken){
                    const newMessage = await Message.create({
                        userId,
                        groupId,
                        text: text || null,
                        username: username,
                        image: image?.filename || null
                    })
                    if(newMessage){
                        console.log(newMessage);
                        return res.status(200).json("Message sent");
                    } else {
                        return res.status(400).json("Error");
                    }
                }
            } catch (err) {
                res.status(400).json("Invalid Token")
            }
        }
    });
}

export const getMessages = async(req,res) => {
    const {userId,contactId,groupId} = req.body;

    if(!groupId){
        if(userId && contactId){
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
        } else {
            try {
                const findChat = await Message.find();
                if(findChat){
                    const obj = {} 
                    findChat.map((chat) => {
                        if(chat.contactId){
                            const key = [chat.userId, chat.contactId].sort().join('-'); // Sort and join to ensure the order is consistent

                            // Check if this key already exists or if the current chat's createdAt is later
                            if (!obj[key] || chat.createdAt > obj[key].createdAt) {
                                obj[key] = { createdAt: chat.createdAt, text: chat.text };
                            }   
                        } else {
                            const key = [chat.groupId];

                            // Check if this key already exists or if the current chat's createdAt is later
                            if (!obj[key] || chat.createdAt > obj[key].createdAt) {
                                obj[key] = { createdAt: chat.createdAt, text: chat.text,userId: chat.userId };
                            } 
                        }
                    })
                    return res.status(200).json(obj);
                } else {
                    return res.status(200).json("no messages")
                }
                
            } catch (err) {
                res.status(400).json("Invalid Token")
            }
        }
    } else {
        try {
            const verifyToken = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
            if(verifyToken){
                const findChat = await Message.find({groupId});
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
}