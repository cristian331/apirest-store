const express = require("express");
const { logErros, errorHandler, boomErrorHandler } = require("./middleware/error.handler")

const routerApi = require("./routes"); // El archivo index.js se busca en automatico

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

//Nota: se deben declarar despues de ejecutar la funcion del router.
app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});


