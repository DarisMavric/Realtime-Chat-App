import Message from "../models/messageModel.js"


export const sendMessage = async(req,res) => {
    const {userId,contactId,text,image} = req.body;
    if(!userId || !contactId || !text) {
        return res.status(400).json('All fields are mandatory')
    }
    const newMessage = await Message.create({
        userId,
        contactId,
        text,
        image
    })
    if(newMessage){
        return res.status(200).json("Message sent");
    } else {
        return res.status(400).json("Error");
    }

}

export const getMessages = async(req,res) => {
    const {userId,contactId} = req.body;
    if(!userId || !contactId){
        return res.status(400).json("All fields are mandatory");
    }
    const findChat = await Message.find({userId:userId,contactId:contactId});
    if(findChat){
        return res.status(200).json(findChat);
    } else {
        return res.status(400).json("Error");
    }
}