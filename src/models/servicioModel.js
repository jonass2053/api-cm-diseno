const mongoose  = require('mongoose')

const servicioSchema = new mongoose.Schema(
    {
        titulo :
        {
            type: String,
            require: true,
            trim: true
        },
        descripcion:
        {
            type: String,
            trim: true,
            require: true
    
        },
        imgurl:
        {
            type: String,
            trim: true,
            require: true
    
        },
    }

   
)



const Servicio = mongoose.model('Servicios', servicioSchema);

module.exports= Servicio



   
