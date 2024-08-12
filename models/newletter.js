const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NewLetterSchema = mongoose.Schema({
    email:{
        type:String,
        unique: true,
    },
});

NewLetterSchema.plugin(mongoosePaginate); 

module.exports = mongoose.model('NewsLetter', NewLetterSchema);
