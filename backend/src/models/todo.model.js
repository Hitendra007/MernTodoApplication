import mongoose,{Schema} from 'mongoose'

const TodoSchema = new Schema({
    todo:{
        type:String,
        required:[true,'Please send Todo']
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Todo = mongoose.model('Todo',TodoSchema)
