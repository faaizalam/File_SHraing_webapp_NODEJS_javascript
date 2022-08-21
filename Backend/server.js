import express from "express"
import  mongoose  from "mongoose"
import cors from "cors"
import path from 'path'
// import  uploadrouter  from "./Router/uploadrouter.js"
import expressAsyncHandler from "express-async-handler"
import bodyParser from "body-parser"
import  uploadrouter from "./Router/uploadrouter.js"
import FILESS from "./Sharemodels.js"




try {
    mongoose.connect('mongodb://localhost/fileshare'||process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    console.log("working")
} catch (error) {
    console.log(error)
    
}
//     console.log("working")
// }).catch((error)=>{
    //     console.log(error)
    // })
    


    const app=express();
const __dirname=path.resolve()


app.use('/postman/upload',uploadrouter)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json()); 
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


app.use(express.static(path.join(__dirname,'./Frontend/public')))


// app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'../Frontend/public/filemain.html')))
// its used to send any specific file

// app.use(cors())

// const filesSchema=new mongoose.Schema({
//     file:{type:String,required:true},
//     text:{type:String}

// },{timestamps:true})

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
// const FILE=mongoose.model('FILE',filesSchema)









app.get('/',expressAsyncHandler(async(req,res)=>{
    
    res.redirect('filemian.html')
   
    
    
}))
app.use('/postman/upload',uploadrouter)






app.post('/postman/mongosave',expressAsyncHandler(async(req,res)=>{
  
    const fileresp=  new FILESS({
        image:req.body.filen
        
    })
   
    const insidefile= await fileresp.save()
    res.send({message:"has been send",Filelink:`${req.headers.origin}/file/${insidefile._id}`})
   


}))


app.get('/file/:id',async(req,res)=>{

    const  filecheck= await FILESS.findById(req.params.id)
    // console.log(filecheck)
    if (!filecheck) {
        res.send("no such file")

        
    }else{
        res.download(filecheck.image,filecheck.originalname)
        
    }
    
    // res.send()

})







app.get('/postman/filemain',expressAsyncHandler(async(req,res)=>{
    const filess =  await FILESS.find().sort({_id:-1}).limit(1)
    // res.redirect('filemian.html')
    console.log(filess)
    // res.send(filess[0]._id)
   
    res.send({Filelink:`http://${req.headers.host}/file/${filess[0]._id}`})
    
}))




app.listen(5000||process.env.PORT,()=>{
    console.log(`http://localhost:5000`)
})


