const express = require('express')
const route = new express.Router();
const Servicio = require('../models/servicioModel')
const upload = require('../lib/storage')
const {appConfig} = require('../../config')


//getAll
route.get('/servicios', async (req, res)=>
{
        try {
             const servicios = await Servicio.find();
             res.status(200).send(servicios)

        } catch (error) {
            res.status(400).send(error)
        }
} )

// getById
route.get('/servicios/:id', async (req, res)=>
{
        try {
            const _id = req.params.id
             const servicios = await Servicio.findById(_id)
             res.status(200).send(servicios)

        } catch (error) {
            res.status(400).send(error)
        }
} )



// deletebyid
route.delete('/servicio/:id', async (req, res)=>
{
         const _id = req.params.id;
         try {
                const servicio =  await Servicio.findById(_id);
                await servicio.remove();
                const respuesta =  await Servicio.find();
                res.status(200).send(respuesta)
            
        } catch (error) {
            res.status(400).send(error)
        } 
})


//

 route.post('/servicio/subir', upload.single('imagen'),  async (req, res)=>
 {    
        try {
            
          
              const servicio = new Servicio();
              servicio.titulo = req.body.titulo;
              servicio.descripcion=req.body.descripcion
           
              if(req.file)
              {
               
                const { originalname } =req.file;
                servicio.imgurl=`${appConfig.host}:${appConfig.port}/img/${originalname}`

                 await servicio.save();
 
                const respuesta =  await Servicio.find();
                res.status(200).send(respuesta)

              }
              
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }

 })
 
 
 route.post('/servicioupdate/:id', /* upload.single('imagen'), */   (req, res)=>
 {
       conolse.log('estoy actualizando')
         /* try {
            
                const _id=req.body.params.id;
                const servicio = await Servicio.findById(_id)
                console.log(servicio)
                if(servicio)
                {
                        servicio.titulo = req.body.titulo;
                        servicio.descripcion = req.body.descripcion;
                        servicio.imgurl=req.body.imgurl;
                        await servicio.save();

                        if(req.file)
                        {
                         
                          const { originalname } =req.file;
                          servicio.imgurl=`${appConfig.host}:${appConfig.port}/img/${originalname}`
          
                           await servicio.save();
           
                          const respuesta =  await Servicio.find();
                          res.status(200).send(respuesta)
          
                        }
                }

            } catch (error) {
                console.log(error)
                res.status(400).send(error)
            } */
 


 }) 
module.exports= route

