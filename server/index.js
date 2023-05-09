const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//creamos la conexion a mysql
const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "10126201",
  database: "empleados_crud",
});

// CREAR (C)
app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  const array = [nombre, edad, pais, cargo, anios];

  db.query(
    "INSERT INTO empleados (nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?)",
    array,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//LEER (R)
app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ACTUALIZAR (U)
app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  const array = [nombre, edad, pais, cargo, anios, id];

  db.query(
    "UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?",
    array,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//BORRAR (D)
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
