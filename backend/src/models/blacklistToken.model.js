import mongoose,{Schema} from "mongoose";

const blacklistTokenSchema = new Schema({
    token:{
        type:String,
        required:true
    }
},{timestamps:true})

export const BlacklistToken = mongoose.model('BlacklistToken',blacklistTokenSchema) 
