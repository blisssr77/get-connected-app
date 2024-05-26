require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')

const routes = require('./controllers/routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', routes)

app.use((req,res)=>{
    res.status(404).json({message: "You are in the wrong routes .."})
})

app.listen(process.env.PORT, ()=>{
    console.log("Connected and Running")
})