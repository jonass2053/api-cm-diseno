
const multer = require('multer')
const Portada = require('../models/portadaModel')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/')

    },
    filename: function (req, file, cb) {
     
      if(file)
      {
        
        cb(null, `${file.originalname}`)
      }
      else
      {
      
        throw Error('no se admiten valores vacios')
      }
      
     

    }
  })
  
  const upload = multer({storage})
  // ahora el va a guardar el nombre de la imagen en la base de datos
 

  

module.exports= upload;