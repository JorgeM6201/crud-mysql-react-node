import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";

function App() {
  //HOOKS
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState(0);

  const [empleadosList, setEmpleados] = useState([]);

  const [editar, setEditar] = useState(false);

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();

      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: `<i>El empleado <b>${nombre}</b> fue registrado con exito</i>`,
        icon: "success",
        timer: 3000,
      });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();

      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: `<i>El empleado <b>${nombre}</b> fue actualizado con éxito</i>`,
        icon: "success",
        timer: 3000,
      });
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
    console.log(val);
  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
    setAnios("");
    setEditar(false);
  };

  const borrarEmpleado = (val) => {
    Swal.fire({
      title: 'Deseas borrar el registro?',
      html: `<i>Realmente desea eliminar a <b>${val.nombre}</b> ?</i>`,
      icon:'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
        });
        Swal.fire({
          title: "<strong>Borrado!</strong>",
          html: `<i>El empleado <b>${val.nombre}</b> ha sido eliminado</i>`,
          icon: "success",
          timer: 3000,
        });

      } 
    })




   
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE EMPLEADOS</div>
        <div className="card-body">
          <div className="App">
            <div className="datos">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Nombre:
                </span>
                <input
                  onChange={(event) => {
                    setNombre(event.target.value);
                  }}
                  type="text"
                  value={nombre}
                  className="form-control"
                  placeholder="Ingrese un Nombre"
                  aria-label="Nombre"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Edad:
                </span>
                <input
                  onChange={(event) => {
                    setEdad(event.target.value);
                  }}
                  type="number"
                  value={edad}
                  className="form-control"
                  placeholder="Ingrese la Edad"
                  aria-label="Edad"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Pais:
                </span>
                <input
                  onChange={(event) => {
                    setPais(event.target.value);
                  }}
                  type="text"
                  value={pais}
                  className="form-control"
                  placeholder="Ingrese un Pais"
                  aria-label="Pais"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Cargo:
                </span>
                <input
                  onChange={(event) => {
                    setCargo(event.target.value);
                  }}
                  type="text"
                  value={cargo}
                  className="form-control"
                  placeholder="Ingrese un Cargo"
                  aria-label="Cargo"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  {" "}
                  Años:
                </span>
                <input
                  onChange={(event) => {
                    setAnios(event.target.value);
                  }}
                  type="number"
                  value={anios}
                  className="form-control"
                  placeholder="Ingrese los Años de experiencia"
                  aria-label="Años"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div className="boton">
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>

      <div className="container">
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        onClick={() => {
                          editarEmpleado(val);
                        }}
                        type="button"
                        className="btn btn-info"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          borrarEmpleado(val);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
