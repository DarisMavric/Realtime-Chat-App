import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    contactId: {    
        type: String,
    },
    groupId: {
        type: String,
    },
    text: {
        type:String,
    },
    username: {
        type: String
    },
    userImage: {
        type: String,
    },
    image: {
        type:String,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model('Message',messageSchema);