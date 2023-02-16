const mongoose = require('mongoose')
const { appConfig } = require('../../config.js')
const portadaSchema = new mongoose.Schema(
    {
        nombre :
        {
            type: String,
            require: true,
            trim: true
        },
       
        url : 
        {
            type: String,
            require : true,
            trim: true
        },

        fecha:
        {
            type : Date,
            require: true
        }
    } 
)


portadaSchema.methods.setImageUrl = function (filename)
{
    
      const {host, port, ruta} = appConfig
   /*    this.url = `${host}:${port}/img/${filename}`  */
   this.url=ruta;

      // asignamos la fecha de subida de la imagen
      this.fecha=Date.now();
}



const Portada = mongoose.model("Portadas", portadaSchema);
module.exports=Portada