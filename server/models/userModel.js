import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName: {
        type:String,
        required: [true, "Please add the Full Name"],
    },
    email: {
        type:String,
        required: [true,"Please add the user email address"],
        unique: [true,"Email address already taken"],
    },
    password: {
        type:String,
        required:[true,"Please add the user password"],
    },
    image: {
        type:String,
    },
    about: {
        type:String,
        default: 'Hey there'
    }
},
    {
        timestamps: true,
    }
);

export default mongoose.model('User',userSchema);