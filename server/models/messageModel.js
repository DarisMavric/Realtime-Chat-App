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
        type: String
    },
    text: {
        type:String,
        required: [true, "Please add the Full Name"],
    },
    username: {
        type: String
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