import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        require,
        min:5
    },
    productDetails:{
        type:String,
        require,
        min:10
    },
    productCategory:{
        type:String,
        require
    },
    productImage:{
        data:Buffer,
        contentType:String
    }
},{
    timestamps:true
})

export default mongoose.model("Products",ProductSchema)