const Course = require('../models/course');
const image  = require('../utils/image');

async function createCourse(req, res){
    const course = new Course(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath

    

    course.save({})
        .then((couseStorage) =>{
            res.status(201).send({couseStorage})
        })
        .catch(() =>{
            res.status(400).send({msg:'Error al crear el curso'})
        })
}

    function getCourse(req, res){
        const { page = 1, limit = 10} = req.query
       const options ={
        page:parseInt(page),
        limit:parseInt(limit),
       };

        Course.paginate({}, options)
            .then((courses) =>{
                res.status(200).send({courses})
            })
            .catch((err) =>{
                res.status(400).send({msg:'Error al obtener los cursos',err})
                console.log(err)
            })
    }

     function updateCourse(req, res){
        const {id} = req.params;
        const courseData = req.body;

        if (req.files.miniature){
            const imagePath = image.getFilePath(req.files.miniature);
            courseData.miniature = imagePath;
        }

        Course.findByIdAndUpdate({_id:id}, courseData)
            .then(() =>{
                res.status(200).send({msg:'se actualizó ok', courseData});
            })
            .catch((err) =>{
                res.status(400).send({msg:'No se pudo actualizar, error', err});
            })
    }


    function deleteCourse(req, res){
        const {id} = req.params;

        Course.findByIdAndDelete(id)
            .then(() =>{
                res.status(200).send({msg:'Se borro exitosamente el curso'});
            })
            .catch(() =>{
                res.status(400).send({msg:'Error al borrar curso'});
            })
    }



module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
};