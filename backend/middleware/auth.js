//Móduolos de node
const jwt = require("jsonwebtoken");
//Crear función middleware
function auth(req, res, next) {
  let jwtToken = req.header("Authorization");
  //Separo el Bearer del token

  /**Bearer.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.* *eyJfaWQiOiI1Zjk5NzNiZWRkNzY2NjM4YjQxYzQwYjYiLCJub21icmUiOiJQZXBhIiwiY29ycmVvIjoicGVwYUBsb2wuY29tIiw*iaWF0IjoxNjAzOTc3MDYxfQ.itpamRVWc0cUSwc2PLUhKSo5IOSPgkZoL208IiYCxmU
   */
  //Colocamos un espacio en donde está el punto para separar el Bearer porque sólo queremos obtener el token

  jwtToken = jwtToken.split(" ")[1];
  //Si no existe el token
  if (!jwtToken) return res.status(401).send("No hay token para validar");
  //Si el jwt existe
  try {
    const payload = jwt.verify(jwtToken, "clave");
    req.usuario = payload;
    next();
  } catch (error) {
    res.status(401).send("Token no válido, sin authorización a procesos");
  }
}
//Exports
module.exports = auth;
