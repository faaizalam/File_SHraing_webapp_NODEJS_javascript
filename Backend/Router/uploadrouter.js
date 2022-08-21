import multer from "multer";
import express from 'express'
// import text  from "../uploads"

 const uploadrouter=express.Router()
const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')

    },
    filename(req,file,cb){
        console.log(file,"j")
        cb(null,`${Date.now()}.jpg`)
    }
})
// its name must be storage else it will never work storage is a predefined fun in node js
const  upload=multer({storage})


uploadrouter.post('/',upload.single('image'),(req,res)=>{
    
    // res.status(201).send({image:`/${req.file.path}`})
      res.send(req.file.path);
      

})
export default uploadrouter
