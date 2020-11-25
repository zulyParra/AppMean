//Módulos internos
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//Modulos creados por nosotros
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const tablero = require("./routes/tablero");
//App
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/tablero/", tablero);
app.use("/public", express.static("public")); 

//Puerto de ejecución
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en puerto: " + port));

//Registro en Mongo
mongoose
  .connect("mongodb://localhost/scrum", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa"))
  .catch((error) => console.log("Conexión fallida"));
