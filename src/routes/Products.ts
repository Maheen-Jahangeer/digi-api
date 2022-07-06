import express from 'express';
import Products from "../models/products";
import multer from 'multer';
import { response } from '../helper/response';
import fs from 'fs';
import {ObjectId} from 'mongodb'

const productRouter = express.Router();

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })

//add product
productRouter.post('/add-product', upload.single('productImage'), async (req, res) => {
    try {
        const newProduct = await new Products({
            productName: req.body.productName,
            productCategory: req.body.productCategory,
            productDetails: req.body.productDetails,
            productImage: {
                data:fs.readFileSync('images/'+req.file.filename),
                contentType:'image/png'
            }
        })
        await newProduct.save();
        res.send(response({
            result: "Successfully inserted"
        }))
    } catch (e) {
        res.status(401).send(response({
            status: 'nok',
            error: {
                errorCode: '401',
                message: e.message
            }
        }))
    }
})

//delete product
productRouter.delete('/:id', async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).send(response({
            result: "Deleted successfully"
        }))
    } catch (e) {
        res.send(response({
            status: 'nok',
            error: {
                errorCode: '400',
                message: e.message
            }
        }))
    }
})

//get products
productRouter.get('/all-products', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products)
    } catch (e) {
        res.status(400).send(response({
            status: "nok",
            error: {
                errorCode: '400',
                message: e.message
            }
        }))
    }
})

//get products by id
productRouter.get('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        res.status(200).json(product)
    } catch (e) {
        res.status(400).send(response({
            status: "nok",
            error: {
                errorCode: '400',
                message: e.message
            }
        }))
    }
})

//update products
productRouter.put('/edit/:id',upload.single('productImage'), async(req, res) => {
    try {
        if(req.file){
            upload.single('productImage');
            const productName = req.body.productName
            const productDetails = req.body.productDetails
            const productCategory = req.body.productCategory
            const productImage = {
                data:fs.readFileSync('images/'+req.file.filename),
                contentType:'image/png'
            }
            const updatedProduct = await Products.findByIdAndUpdate(req.params.id, {
                $set:{
                    productName,
                    productCategory,
                    productDetails,
                    productImage
                }
            })
            res.status(200).json(updatedProduct)
        }
        else{
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id,{
            $se:req.body
        })
        res.status(200).json(updatedProduct)}
    } catch (e) {
        res.send(response({
            status: "nok",
            error: {
                errorCode: "400",
                message: e.message
            }
        }))
    }
})

export default productRouter;