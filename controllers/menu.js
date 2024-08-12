const Menu = require('../models/menu');

async function createMenu(req, res){
    const menu = new Menu(req.body);

    menu.save()
        .then((menuStorage) =>{
            res.status(200).send({menuStorage})
        })
        .catch(() =>{
            res.status(400).send({msg:'Error al crear el menu'});
        })
}   

async function getAllMenus(req,res){
    const { active } = req.query;
    let response = null;

    if (active === undefined){
        response = await Menu.find().sort({order:"asc"});
    } else {
        response = await Menu.find({active}).sort({order:"asc"});
    }
    
    res.status(200).send({msg:'nice', response})


    if(!response){
        res.status(400).send({msg:'no se han encontrado menus'})
    }

}

async function updateMenu(req, res){
    const { id } = req.params;
    const menuData = req.body;

    Menu.findByIdAndUpdate({_id:id}, menuData)
        .then(() =>{
            res.status(200).send({msg:'Actualizó correctamente'});
        })
        .catch(() =>{
            res.status(400).send({msg:'Erro al actualizar el menú'});
        })
}


async function deleteMenu(req, res){
    const { id } = req.params;
    
    Menu.findByIdAndDelete({_id : id})
        .then(() =>{
            res.status(200).send({msg:'El borrado fue exitoso'});
        })
        .catch(() =>{
            res.status(400).send({msg:'Error al borrar'})
        })

}


module.exports = {
    createMenu,
    getAllMenus,
    updateMenu,
    deleteMenu,

};