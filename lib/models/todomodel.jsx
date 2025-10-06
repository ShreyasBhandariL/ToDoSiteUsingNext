const { default: mongoose } = require("mongoose");


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    isComplete: {
        type:Boolean,
        default:false,
    }
},{
    timeStamp: true
})

const ToDo = mongoose.models.todos || mongoose.model("todos",todoSchema);

export default ToDo;