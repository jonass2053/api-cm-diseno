const express = require('express')
const Usuario = require('../models/usuarioModel')
const route = new express.Router();
const auth = require('../middleware/auth')


route.get('/usuarios', async (req, res)=>
{
    try {
        const usuarios = await Usuario.find();
        res.status(200).send(usuarios);
        
    } catch (error) {
        res.status(400).send(error)
    }
})
route.get('/usuario/:id', async (req, res)=>
{
    try {
        const usuarios = await Usuario.findById(req.params.id)
        res.status(200).send(usuarios);
        
    } catch (error) {
        res.status(400).send(error)
    }
})

route.delete('/usuario/:id', async (req, res)=>
{
    try {
        const usuario = await Usuario.findById(req.params.id)
        usuario.remove();
        res.status(200).send('registro elimino un registro correctamente');
        
    } catch (error) {
        res.status(400).send(error)
    }
})


route.put('/usuario/:id', async (req, res)=>
{
       
        const keyValid = ['nombre', 'email', 'clave']
        const updates = Object.keys(req.body)
        const operationIsValid=updates.every(update=>keyValid.includes(update))
       
        if(operationIsValid)
        {
            const usuario = await Usuario.findById(req.params.id)
            keyValid.forEach(e=>usuario[e]=req.body[e])
            await usuario.save();
            res.status(200).send('registro actualizado correctamente')        

        }

        res.status(400).send('se ha producido un error para que la opracion pueda proceder con exito deve mandar estos keys ' + keyValid)
        


        

       

})

// Add User
route.post('/usuario', async(req, res)=>
{
        const msjSuccess =[
            'Se ha creado un registro satisfactoriamente',
            'success'
        ]
        const msjError=[
            'El limite de registro son 2 usuarios y ya existen, debe iniciar sesion con unos de los registrados',
            'error'
        ]

     try {
            // esta peticion solo aceptara el registro de dos usuarios 
        const verificacion = await Usuario.find();
       if(verificacion.length<=2)
       {
        console.log(verificacion.length)
        const usuario = new Usuario(req.body);
        usuario.nombre.toUpperCase();
        await usuario.save();
        res.status(201).send(msjSuccess) 
       }
       else
       {
        console.log('ups')
        res.status(405).send(msjError)
       }

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    } 
   
    
})

// login
route.post('/usuario/login', async (req, res)=>
{

    const respuesta ={codStatus:'' , mensaje: '', usuario: '', token: ''}
   
    try {
           
        
        const user = await Usuario.findByCredentials(req.body.email, req.body.clave)
        const token = await user.generateAuthToken();
        respuesta.mensaje='Usuario encontrado';
        respuesta.usuario=user;
        respuesta.token=token;
        respuesta.codStatus='200'
        console.log(respuesta)
        res.status(200).send(respuesta) 
    } catch(e)
    {
        console.log(e.message);
        respuesta.mensaje=e.message;
        respuesta.codStatus='400';
        res.status(400).send(respuesta);
    }
        
       
    
       
})  

//logunt

route.post('/usuario/logout', auth,   async(req, res)=>
{


     try {
        
        req.user.tokens= await req.user.tokens.filter((token)=>{token.token !==req.token}) 
        await req.user.save();
        res.status(200).send({'Mjs' : 'Sesion cerrada correctamente'})
    }   catch (error) {
        console.log(error)
        res.status(500).send(error)
    } 
})

module.exports=route