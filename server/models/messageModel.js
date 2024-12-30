import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    contactId: {    
        type: String,
        required: true,
    },
    text: {
        type:String,
        required: [true, "Please add the Full Name"],
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