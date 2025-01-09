import { upload } from "../app.js";
import Group from "../models/groupModel.js"
import jwt from "jsonwebtoken";



export const createGroup = async(req,res) => {
   upload.single('image')(req, res, async(err) => {
           const {name,users} = req.body;
           const image = req.file;
           if(!name || !users) {
               return res.status(400).json('All fields are mandatory')
           }
           try {
               const verifyToken = jwt.verify(req.cookies.accessToken, process.env.SECRET_KEY);
               if(verifyToken){
                   const newGroup = await Group.create({
                       name,
                       users,
                       image: image?.filename || null
                   })
                   if(newGroup){
                       return res.status(200).json(newGroup);
                   } else {
                       return res.status(400).json("Error");
                   }
               }
           } catch (err) {
               res.status(400).json("Invalid Token")
           }
    });
}


export const sendGroupMessage = (req,res) => {

}

export const findGroup = async(req,res) => {
    const {id} = req.query;
        if(id){
            console.log(id);
            const group = await Group.find({users: { $all: id}});
            if(group){
                res.status(200).json(group);
            } else {
                res.status(400).json('User does not exist!');
            }
        } else {
            res.status(400).json("Error");
        }
} 