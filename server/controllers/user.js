import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { upload } from "../app.js";


export const getUsers = async(req,res) => {
    const {id} = req.query;
    if(id){
        const user = await User.findById(id);
        if(user){
            res.status(200).json(user);
        } else {
            res.status(400).json('User does not exist!');
        }
    } else {
        const users = await User.find();
        if(users){
            res.status(200).json(users);
        } else {
            res.status(400).json("No users");
        }
    }
}

export const editUser = async(req,res) => {
    upload.single('image')(req, res, async(err) => {
        const id = req.body.id;
        const file = req.file;
        if(file){
            const user = await User.findByIdAndUpdate(
                id, 
                {
                    image: file.filename,
                    fullName: req.body.fullName,  // Update fullName
                    about: req.body.about          // Update about field
                },
                { new: true } // This ensures the updated user is returned
            );
            if(user){
                const data = {
                    id: user._id,
                    fullName: user.fullName,
                    image: user.image,
                }
                res.status(200).json(data);
            } else {
                res.status(400).json("Error");
            }
        } else {
            const user = await User.findByIdAndUpdate(
                id, 
                {
                    fullName: req.body.fullName,  // Update fullName
                    about: req.body.about          // Update about field
                },
                { new: true } // This ensures the updated user is returned
            );
            if(user){
                const data = {
                    id: user._id,
                    fullName: user.fullName,
                    image: user.image,
                }
                res.status(200).json(data);
            } else {
                res.status(400).json("Error");
            }
        } 
    });
}

export const signOut = async(req,res) => {
    res.clearCookie('accessToken');
    return res.status(200).json("Cookies deleted");
}

export const signIn = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json('All fields are mandatory')
    } 
    const user = await User.findOne({email})
    if(user) {
        const checkPassword = bcrypt.compare(
            req.body.password,
            user.password
        );
        if(checkPassword) {

            const data = {
                fullName: user.fullName,
                id: user._id,
                image: user.image
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            res.cookie("accessToken", token);
            res.status(200).json(data);
            

        } else {
            return res.status(400).json('Incorrect password')
        }
    } else {
        return res.status(400).json('User does not exist!');
    }
    
}

export const signUp = async(req,res) => {
    const {fullName,email,password} = req.body;
    if(!password || !fullName || !email) {
        return res.status(400).json('You should fill all the fields') 
    } 
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        return res.status(400).json('User already registered!');
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        image: "user-avatar-male-5.png",
        fullName,
        email,
        password: hashedPassword
    })


    if(user){
        const data = {
            id: user._id,
            fullName: user.fullName,
            image: user.image
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.cookie("accessToken", token);
        res.status(200).json(data);
    } else {
        return res.status(400).json('User data is not valid');
    }
}