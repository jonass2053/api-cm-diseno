const jwt = require('jsonwebtoken')
const User = require('../models/usuarioModel')

const auth =(async (req, res, next)=>
{
    try {
    
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, 'jonass2053')
    const user = await User.findOne({_id: decode._id, 'tokens.token' : token})
    console.log(user)
    if(!user)
    {
        throw new Error();
    }
    req.token= token;
    req.user=user;
    next();
    } catch (error) {
        console.log(error)
        res.status(401).send({error : 'Auth error!'})
    }
    

})

module.exports=auth;