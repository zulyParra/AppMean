//modulos de node, multer permite cargar todo tipo de archivos
const multer = require("multer");
//directorio donde se van a guardar los archivos, creo en backend la carpeta public
const directorio = "./public/";
//cuando se utiliza multer se maneja Diskstorage
const storage = multer.diskStorage({
  //destino donde se va aguardar req es la peticion que se hace y cb es el callback
  destination: (req, file, cb) => {
    //si llega todo null se va a un error cath interno del multer
    cb(null, directorio);
  },
  filename: (req, file, cb) => {
    //por medio de la fecha de subida el asigna un código único a cada archivo
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
        //stick.jpg
        //1726354354672-stick.jpg
        //7enviamos el archivo como deberia quedar guardado
        cb(null,filename);
    }, 
});
//cargar archivo
const cargarArchivo = multer({
  //donde va aquedar el archivo
  storage: storage,
  fileFilter: (req, file, cb) => {
    //formatos o extenciones que se aceptan, sticker nombre del campo del modelo tablero.js
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Sólo aceptamos estos tipos de archivo - jpg - png - - gif")
      );
    }
  },
});
//Exports
module.exports = cargarArchivo;