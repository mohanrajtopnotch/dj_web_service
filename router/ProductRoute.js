const Router = require("express").Router();
const mongoose = require('mongoose')
const multer = require('multer')
const DJPRODUCT = require('../dbo/dj_product')
const LoggerUtil =require('../utils/LoggerUtil')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage })

Router.post('/createProduct',upload.single('productImage'),async (req,res,next)=>{
    console.log(req.file)
    console.log(req.body)
    try {
        console.log(req.body);
        const dj_product = new DJPRODUCT({
            _id:new mongoose.Types.ObjectId(),
            title:req.body.title,
            descriptions:req.body.descriptions,
            rating:req.body.rating,
            productImage:req.file.path
        });
        const save = await dj_product.save();
        return LoggerUtil.response(req, res, save);
    } catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
})

Router.get("/getProduct", async (req, res) => {
    try{
        const data = await DJPRODUCT.find();
        return LoggerUtil.response(req, res, data);
    }
    catch(error){
        return LoggerUtil.error(req, res, 404, error);
    }
  
});

Router.post("/updateProduct",async (req,res)=>{
    let conditionMap = req.body.conditionMap
    let dataMap = req.body.dataMap
    let condition = {
        _id: mongoose.Types.ObjectId(conditionMap._id),
    };
    try {
        const data = await DJPRODUCT.findOneAndUpdate(
            condition,
            dataMap,
            { new: true }
        )
        return LoggerUtil.response(req, res, data);
    }
    catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
})


module.exports =Router