const mongoose = require('mongoose');
const app = require('./app');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER
} = require('./constants');

const PORT = process.env.POST || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`
) .then(() => {
    console.log("Conexión exitosa a MongoDB Atlas");

    app.listen(PORT, () =>{
        console.log('##############################');
        console.log('######### API REST ###########');
        console.log('##############################');
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    })


  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB Atlas", error);
  });