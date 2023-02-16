const mongoose = require('mongoose')
const { appConfig } = require('../../config.js')
const TrabajoSchema = new mongoose.Schema(
    {
        titulo :
        {
            type: String,
            require: true,
            trim: true
        },
       
        descripcion : 
        {
            type: String,
            require : true,
            trim: true
        },

        imagen:
        {
            type : String,
            require: true,
            trim :  true
        },
        fecha:

        {
            type: Date,
            require: true
        }
    } 
)


TrabajoSchema.methods.setImageUrl = function (filename)
{
    
       const {host, port} = appConfig
       this.imagen = `${host}:${port}/img/${filename}` 
       this.fecha=Date.now();
      // asignamos la fecha de subida de la imagen
      
}



const Trabajo = mongoose.model("Trabajos", TrabajoSchema);
module.exports=Trabajo