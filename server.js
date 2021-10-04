const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/Person')
require('dotenv/config')

//Middelware
app.use(express.json())

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db')
)

// routes
app.get('/', (req,res) => {
    res.send('home page')
})

app.use('/person', router)


//listen to server
app.listen(5000)