const express = require('express');
const app = express();
const path = require('path' )
const cors = require('cors')
const Portada = require('./routes/routePortada')
const Servicio = require('./routes/servicioRoute')
const Usuario = require('./routes/userRoute')
const Trabajo = require('./routes/TrabajoRoute')
require ('./db/conexion')
app.use(cors())

//directorio publico
/* const publicDirectoryPath = path.join(__dirname, './s') */
//configuracion de archivos staticos    

app.use(express.static('public'));


/* app.use('/public', express.static(`${__dirname}/stotage/imagenes`)) */


const port = process.env.PORT || '3001';
app.use(express.json())


 
app.use(Portada)
app.use(Servicio)
app.use(Usuario)
app.use(Trabajo)
/*  var bodyParser = require('body-parser');
 var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
  var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' })

  app.use(jsonParser);
  app.use(urlencodedParser);     */

/* app.use(express.json({limit: '50mb'})); */



app.listen(port, ()=>
{

    console.log('server inline en http://localhost:' + port)
})

 

