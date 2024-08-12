const NewLetter = require('../models/newletter');

function suscribeEmail(req, res){
    const { email } = req.body;

    if(!email){res.status(400).send({msg:'El email no puede estar vacio'})}
    const newsletter = new NewLetter({
        email: email.toLowerCase()
    })
    
    newsletter.save()
        .then((newsletterStored) =>{
            res.status(200).send({msg:'Email registrado correctamente',newsletterStored});
        })
        .catch(() =>{
            res.status(400).send({msg:'El email ya estaba registrado'})
        })
}

function getEmails(req, res){
    const {page = 1 , limit = 10} = req.query;

    const options = {
        page :parseInt(page),
        limit: parseInt(limit)
    }

    NewLetter.paginate({}, options)
        .then((emailStored) =>{
            res.status(200).send({msg:'Exíto al obtener los emails',emailStored});
        })
        .catch(() =>{
            res.status(400).send({msg:'Error al obtener los emails'});
        })
}

function deleteEmail(req,res){
    const { id } = req.params;

    NewLetter.findByIdAndDelete(id)
        .then(() =>{
            res.status(200).send({msg:'Éxito al eliminar el registro'})
        })
        .catch((err) =>{
            res.status(400).send({msg:'Error al eliminar el registro', err})
        })
}




module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail

}