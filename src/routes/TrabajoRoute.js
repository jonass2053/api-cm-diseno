
const express = require('express')
const route = new express.Router();
const upload = require('../lib/storage')
const {appConfig} = require('../../config');
const Trabajo  = require('../models/trabajosModel')

const multer = require('multer')

/* const cargar= multer({ dest: 'testimg/'}) */




//getAll
route.get('/trabajos', async (req, res)=>
{
        try {
             const trabajos = await Trabajo.find();
             res.status(200).send(trabajos)

        } catch (error) {
            res.status(400).send(error)
        }
} )


// deletebyid
route.delete('/trabajo/:id', async (req, res)=>
{

        const  _id = req.params.id;
         try {
                const trabajo =  await Trabajo.findById(_id);
                await trabajo.remove();
                const respuesta =  await Trabajo.find();
                res.status(200).send(respuesta)
            
        } catch (error) {
            res.status(400).send(error)
        }  
})


//

 route.post('/trabajo/subir',  upload.single('imagen'), async (req, res)=>
 {    
            console.log(req.body)

          try {
              const trabajo = new Trabajo();
              trabajo.titulo=req.body.titulo;
              trabajo.descripcion=req.body.descripcion;

             

              if(req.file)
              {
                const { originalname } =req.file;
                trabajo.setImageUrl(originalname);
                await trabajo.save();

                const respuesta =  await Trabajo.find();
                res.status(200).send(respuesta)

              }
              
        } catch (error) {
            res.status(400).send(error)
        }   
 
 }) 
module.exports= route
