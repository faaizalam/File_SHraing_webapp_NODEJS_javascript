import mongoose from 'mongoose'

const FileScheme=new mongoose.Schema({

    image:{type:String,required:true}
    //   password:


},{timestamps:true})

const FILESS=mongoose.model('FILESS',FileScheme)
export default FILESS