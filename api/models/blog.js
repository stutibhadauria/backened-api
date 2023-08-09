const mongoose=require('mongoose')

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    // image:    
    // {
    //   public_id: {
    //     type: String,
        
    // },
    // url:{
    //   type:String
    // }
//   }
},{timestamps:true})

const BlogModel=mongoose.model('blog',BlogSchema)
module.exports=BlogModel