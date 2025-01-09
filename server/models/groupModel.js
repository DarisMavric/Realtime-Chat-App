import mongoose from "mongoose";


const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
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