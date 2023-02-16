const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema(
    {
            nombre: 
            {
                type: String,
                require: true,
                trim: true
            },
            email: 
            {
                type: String,
                unique: true,
                require: true,
                trim: true,
                validate(value)
                {
                    if(!validator.isEmail(value))
                    {
                        throw new Error("Email incorrecto")
                    }
                }
            },
            clave: 
            {
                type: String,
                require: true,
                trim: true,

            },
            tokens:[{
                token: 
                {
                    type: String,
                    require: true
                }
             }]


    }
)

userSchema.pre('save', async  function(next)
{
    
    const usuario = this;
    
    if(usuario.isModified('clave'))
    {
       
        usuario.clave = await bcrypt.hash(usuario.clave, 8);
       
    }
   
    next()
})


userSchema.statics.findByCredentials= async (email, clave)=>
{
    
   
   const usuario = await Usuario.findOne({email})
   if(!usuario)
   {
    console.log('error del usuario:' + email )
    throw new Error('Error de credenciales, intentelo de nuevo!!!!!')
   }
      
   const isMatch =  await bcrypt.compare(clave, usuario.clave)
 
   if(!isMatch)
   {
    console.log('error del clave: ' + clave)
    throw new Error('Error de credenciales, intentelo de nuevo!!!!!')

   }
 
     
    return usuario;
   
    
}


userSchema.methods.generateAuthToken = async function()
{
    
    const usuario=this;
    const token = jwt.sign({_id: usuario._id.toString()}, 'jonass2053');
    usuario.tokens = usuario.tokens.concat({token})
    await usuario.save()
    return token;
}

const Usuario = mongoose.model('Usuarios', userSchema);
module.exports=Usuario