const express =require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const {API_VERSION} = require('./constants');


const app = express();

//import routingss
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const MenuRouter = require('./router/menu');
const CourseRouter = require('./router/course');
const PostRouter = require('./router/post');
const NewLettersRouter = require('./router/newletter');

//Configure body parse
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//static folders
app.use(express.static('uploads'));


//Configure Header HTTP - CORS
app.use(cors());


//Config Routings
app.use(`/api/${API_VERSION}`, authRouter);
app.use(`/api/${API_VERSION}`, userRouter);
app.use(`/api/${API_VERSION}`, MenuRouter);
app.use(`/api/${API_VERSION}`, CourseRouter);
app.use(`/api/${API_VERSION}`, PostRouter);
app.use(`/api/${API_VERSION}`, NewLettersRouter);


module.exports = app;