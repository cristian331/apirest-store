const express = require("express");
// const { faker } = require('@faker-js/faker');

 const routerApi = require("./routes"); // El archivo index.js se busca en automatico

 const app = express();
 const port = 3000;

 routerApi(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});


