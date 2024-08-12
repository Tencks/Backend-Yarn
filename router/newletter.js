const express = require('express');
const NewLetterController = require('../controllers/newletter');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/newsletter', NewLetterController.suscribeEmail);
api.get('/newsletter', [md_auth.asureAuth], NewLetterController.getEmails);
api.delete('/newsletter/:id', [md_auth.asureAuth], NewLetterController.deleteEmail);


module.exports = api;