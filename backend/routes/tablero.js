//Módulos de node
const express = require("express");
const router = express.Router();
//Módulos creados por nosotros
const Tablero = require("../model/tablero");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");
//Rutas
//Obtener actividades del usuario
router.get("/lista", auth, async (req, res) => {
  //Buscamos el usuario logueado
  const usuario = await Usuario.findById(req.usuario._id);
  //Si el usuario no existe
  if (!usuario) return res.status(401).send("Usuario no existe en DB");
  //si el usuario si existe
  const tablero = await Tablero.find({
    idUsuario: req.usuario._id,
  });
  res.send(tablero);
});

//Hago un proceso post para registrar una actividad
router.post("/", auth, async (req, res) => {
  //obtenemos el id del ususario logueado con correo y pass
  const usuario = await Usuario.findById(req.usuario._id);
  //Si el usuario no existe
  if (!usuario) return res.status(401).send("El usuario no existe");
  //Si el usuario existe
  const tablero = new Tablero({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
  });
  //Enviamos el resultado a la db para que se guarde
  const result = await tablero.save();
  res.status(200).send(result);
});
//Registrar actividad con imagen
router.post(
  "/cargarArchivo",
  cargarArchivo.single("sticker"),
  auth,
  async (req, res) => {
    //protocolo con que se recibe estos archivos http o https o con el local o el dominio
    const url = req.protocol + "://" + req.get("host");
    //verificamos si existe el usuario
    const usuario = await Usuario.findById(req.usuario._id);
    //si el usuario no existe
    if (!usuario) return res.status(401).send("No existe el usuario en DB");
    //definimos la ruta de la imagen
    let rutaImagen = null;
    if (req.file.filename) {
      rutaImagen = url + "/public/" + req.file.filename;
      //http://localhost:3000/public/1625354-stick.jpg
    } else {
      rutaImagen = null;
    }
    //guardar en tablero
    const tablero = new Tablero({
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      // estado: req.body.estado,
      estado: "asignada",
      sticker: rutaImagen,
      descripcion: req.body.descripcion,
    });
    const result = await tablero.save();
    res.status(200).send(result);
  }
);
//Editar actividad
router.put("/", auth, async (req, res) => {
  //Buscar usuario
  const usuario = await Usuario.findById(req.usuario._id);
  //si el usuario no existe
  if (!usuario) return res.status(401).send("El usuario no existe en DB");
  //Realizamos el update
  const tablero = await Tablero.findByIdAndUpdate(
    req.body._id,
    {
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      estado: req.body.estado,
    },
    {
      new: true,
    }
  );
  //Si no hay actividades para el usuario
  if (!tablero) return res.status(401).send("No hay actividad asignada");
  //Si se realizó un update a alguna actividad
  res.status(200).send(tablero);
});

//Eliminar actividad
router.delete("/:_id", auth, async (req, res) => {
  //Buscamos el usuario por id
  const usuario = await Usuario.findById(req.usuario._id);
  //Si no existe
  if (!usuario) return res.status(401).send("No existe usuario en DB");
  //Eliminamos actividad asignada al usuario
  const tablero = await Tablero.findByIdAndDelete(req.params._id);
  //si no encuentra ninguna actividad con ese id
  if (!tablero) return res.status(401).send("No hay actividad con ese id");
  //Si se encuentra la actividad
  res.status(200).send({
    message: "Actividad eliminada",
  });
});
//Exports
module.exports = router;
