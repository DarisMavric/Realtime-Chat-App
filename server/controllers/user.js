import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUser = async(req,res) => {

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
                first_name: user.fname,
                last_name: user.lname,
                email: user.email
            }
            const token = jwt.sign({ id: user._id }, "secretkey");
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
        fullName,
        email,
        password: hashedPassword
    })


    if(user){
        const data = {
            fullName: user.fullName,
            email: user.email
        }
        const token = jwt.sign({ id: user._id }, "secretkey");
        res.cookie("accessToken", token);
        res.status(200).json(data);
    } else {
        return res.status(400).json('User data is not valid');
    }
}