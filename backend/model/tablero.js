// Modulos internos
const mongoose = require("mongoose");
// Esquema
const esquemaTablero = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  descripcion: String,
  sticker: String,
  estado: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});
// Creamos los exports
const Tablero = mongoose.model("tablero", esquemaTablero);
module.exports = Tablero;

