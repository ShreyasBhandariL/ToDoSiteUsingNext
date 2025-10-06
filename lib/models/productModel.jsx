const { default: mongoose, mongo } = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
},{
    timeStamp: true,
})

const Product = mongoose.models.products || mongoose.model('products',productSchema)

export default Product;