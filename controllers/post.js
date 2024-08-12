const Post = require('../models/post');
const image = require('../utils/image');

function createPost(req, res){
    const post  = new Post(req.body);
    post.created_at = new Date();

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    post.save()
        .then((postStored) =>{
            res.status(200).send({msg:'se creo correctamente', postStored})
        })
        .catch(() =>{
            res.status(400).send({msg:'error al crear el post'});
        })
}

function getPosts(req, res){
    const {page = 1, limit= 10} = req.query;

    const options = {
        page : parseInt(page),
        limit: parseInt(limit),
        sort: {created_at: "desc"}
    }

    Post.paginate({}, options)
        .then((postStored) =>{
            res.status(200).send({msg:'Todo ok', postStored});
        })
        .catch(()=>{
            res.status(400).send({msg:'error al mostrar los posts'});
        })
}

function updatePost(req, res){
    const {id} = req.params;
    const postData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id:id}, postData)
        .then((postData) =>{
            res.status(200).send({msg:'Actualización correcta', postData});
        })
        .catch((err) =>{
            res.status(400).send({msg:'Actualización fallida', err});
        })


}

function deletePost(req, res){
    const {id} = req.params;

    Post.findByIdAndDelete(id)
        .then(() =>{
            res.status(200).send({msg:'Pos eliminado correctamente'});
        })
        .catch((err) =>{
            res.status(400).send({msg:'Error al eliminar el post', err});
        })
}

function getPost(req, res){
    const { path } = req.params;

    Post.findOne({path})
        .then((postStored) =>{
            res.status(200).send({msg:'Se encontró el post solicitado', postStored});
        })
        .catch((postStored) =>{
            if(!postStored){
                res.status(400).send({msg:'No se encontró el post'});
            }else{
                res.status(500).send({msg:'Error del servidor'})
            }
        })
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
    };