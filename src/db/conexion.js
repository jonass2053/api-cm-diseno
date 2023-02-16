const mongoose = require('mongoose')

const host ='127.0.0.1';
const port ='27017';
const database ='chant'

const url =`mongodb+srv://admin:admin@cluster0.gnblhbn.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, ()=>
{
    console.log("dabase en linea")
})

