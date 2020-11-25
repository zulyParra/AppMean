//Módulos internos
const express = require("express");
const router = express.Router();
//Módulos creados
const { Usuario } = require("../model/usuario");
//Ruta
router.post("/",async (req,res) => {
    //revisamos si existe el mismo correo en nuestra db
    let usuario = await Usuario.findOne({ correo: req.body.correo});
    //si el usuario existe en db
    if(usuario) return res.status(400).send("El usuario ya está registrado");
    //Si el correo no existe
    usuario = new Usuario({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        edad: req.body.edad,
        correo: req.body.correo,
        pass: req.body.pass,
    })
//Guardamos usuario en db y obtenemos el JWT
    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken});
})
//Exports
module.exports = router;
