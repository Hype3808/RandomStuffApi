import mongoose from 'mongoose'

const new_keys = new mongoose.Schema({
    key:{
        type: String
    },
    email: {
        type: String,
        required: false
    },
    plan: {
        type: String,
        default: "free"
    },
    aiparams: {
        type: Object
    }
 });
 
 export default mongoose.model('latest api', new_keys);