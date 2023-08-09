const express = require('express')
const app = express()
const dotenv=require('dotenv')
const connectdb=require('./db/connectdb')
const cors=require('cors')
const cloudinary=require('cloudinary')
const fileUpload = require("express-fileupload")
const web=require('./routes/web')



app.use(fileUpload({useTempFiles: true}))
app.use(cors())

app.use(express.json())


dotenv.config({
    path:'.env'
})

connectdb()
app.use('/api',web)



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})