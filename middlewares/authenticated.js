const jwt = require('../utils/jwt');

function asureAuth(req, res, next){
    
    if(!req.headers.authorization){
      return  res.status(403).send({msg:'La petición no tiene cabecera de auth'})
    }

    const token = req.headers.authorization.replace("bearer ", "").replace('Bearer ', '')
   // console.log(token)

    try {
      const payload = jwt.decoded(token)

      const {exp} = payload;

      const currentData = new Date().getTime();

      if(exp <= currentData){
        return res.status(400).send({msg:'El token expiró'});
      }

      req.user = payload;

      next();

    } catch (error) {
      return res.status(400).send({msg:"Token inválido"});
    }


}

module.exports = {
    asureAuth
}


//MERN 45: LLEGAMOS A 9:45MIN 6TA UNIDAD