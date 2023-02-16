const { Router } = require('express');
const express = require('express')
const route = new express.Router();
const Portada =  require('../models/portadaModel')
const upload = require('../lib/storage')
const {appConfig} = require('../../config');


const multer = require('multer')
/* const cargar= multer({ dest: 'testimg/'}) */


route.get('/', (req, res)=>
{
    console.log('test')
    res.send('hola desde node')
})


//getAll
route.get('/portadas', async (req, res)=>
{
        try {
             const portadas = await Portada.find();
             res.status(200).send(portadas)

        } catch (error) {
            res.status(400).send(error)
        }
} )


// deletebyid
route.delete('/portada/:id', async (req, res)=>
{

        const  _id = req.params.id;
         try {
                const portada =  await Portada.findById(_id);
                await portada.remove();
                const respuesta =  await Portada.find();
                res.status(200).send(respuesta)
            
        } catch (error) {
            res.status(400).send(error)
        }  
})


//

 route.post('/portada/subir',  upload.single('imagen'), async (req, res)=>
 {    
   
   

          try {


              const portada = new Portada();
              portada.nombre=req.file.originalname;
              if(req.file)
              {
                const { originalname } =req.file;
                portada.setImageUrl(originalname);
                console.log(originalname)
                await portada.save();

                const respuesta =  await Portada.find();
                res.status(200).send(respuesta)

              }
              
        } catch (error) {
            res.status(400).send(error)
        }  
 
 }) 
module.exports= route
