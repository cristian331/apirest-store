const express = require("express");
const cors = require("cors")
const { logErros, errorHandler, boomErrorHandler, ormErrorHandler } = require("./middleware/error.handler");

const routerApi = require("./routes"); // El archivo index.js se busca en automatico

const app = express();
const port = 3000;

app.use(express.json());

// para registir el acceso solo a ciertos origenes
// const whiteList = ['http://localhost:8080'];
// const option = {
//   origin: (origin, callback) => {
//     if(whiteList.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Acceso no permitido'))
//     }
//   }
// }
// app.use(cors(option));
app.use(cors());

require('./utils/auth');

routerApi(app);

//Nota: se deben declarar despues de ejecutar la funcion del router.
app.use(logErros);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
