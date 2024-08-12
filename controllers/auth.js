const bcrypt  = require('bcryptjs');
const User = require('../models/user');
const jwt = require('../utils/jwt');


function register (req, res){
    const {firstname, lastname, email, password} = req.body;

    if(!email) res.status(400).send({msg:'El email es obligatorio u.u'});
    if(!password) res.status(400).send({msg:'La contraseña es obligatoria'});

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt)
    // user.password = hashPassword;

    const user = new User({
        firstname,
        lastname,
        email: email,
        password: hashPassword,
        role:'user',
        active:false

    })
    console.log(user)

    
    // user.save();


    // try {
    //     await user.save();
    //     res.status(200).send(userStorage,{msg:'Creado'});
    // } catch(err){
    //     res.status(400).send({msg:'Error al crear usuario'})
    // }


    // user.save()
    // .then(userStorage =>{
    //     res.status(200).send({userStorage, msg:'Creado'});
    // })
    // .catch(error =>{
    //     res.status(400).send({error,msg:'Error al crear usuario'})
    // })

    User.create(user)
    .then(user => {
      res.status(200).send({ msg: 'Usuario creado con éxito', body: user });
    })
    .catch(error => {
      res.status(400).send({ msg: 'Error al crear usuario', error });
    });
  


}


function login(req, res){
    const {email, password} = req.body

    if(!email) res.status(400).send({msg:'El email es obligatorio'});
    if(!password) res.status(400).send({msg:'La contraseña es obligatoria'});

    const emailLowerCase = email.toLowerCase();

    User.findOne ({email:emailLowerCase})
        .then(userStorage => {
            // res.status(200).send({ msg: 'Usuario encontrado', body: userStorage });
            bcrypt.compare(password, userStorage.password)
             .then(check => {
                if(!check){
                    res.status(400).send({ msg: 'La contraseña es INCORRECTA', check });
                }else if(!userStorage.active){
                    res.status(401).send({ msg: 'USUARIO NO AUTORIZADO O INACTIVO', check });
                }else{
                    res.status(200).send({
                        msg: 'LOS DATOS SON CORRECTOS',
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage)
                     });

                }
             })
             .catch(err =>{
                res.status(500).send({msg:'La contraseña es incorrecta', err});
             })
            console.log('Password', password);
            console.log(userStorage);

        })
        .catch(err => {
            res.status(500).send({ msg: 'Error del servidor', err });
        })

}

function refreshAccessToken(req, res){
    const {token} = req.body;

    if(!token){res.status(400).send({msg:'token requerido'})}

    const { user_id } = jwt.decoded(token);

   // if(!user_id){res.status(400).send({msg:'id requerido'})}

    User.findOne({_id: user_id})
        .then((userStorage)=>{
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            })
        })
        .catch(err =>{
            res.status(500).send({msg:'Error del servidor', err});
        })
}



module.exports = {
    register,
    login,
    refreshAccessToken

};