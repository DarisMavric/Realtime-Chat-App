import mongoose from "mongoose";


const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    usernames: {
        type: [String],
        requried: true,
    },
    users: {    
        type: [String],
        required: true,
    },
    image: {
        type:String,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model('Group',groupSchema);