import React,{ useState } from 'react'
import eliminarg from './assets/img/botonx.png'
import editar from './assets/img/editar.png'
import './css/style.css';

function Formulario() {
    const [matricula4,setMatricula4] = useState("SINDATOS")
    let imageURL;

    const carrerasList = ["SISTEMAS COMPUTACIONALES", "LOGISTICA", "ADMINISTRACION", "QUIMICA"]
    const alumnosLista=[]

    const [inputValue, setInputValue] = useState('');

    const [carreras,setCarreras] = useState(carrerasList)
    const [alumnos,setAlumnos] = useState(alumnosLista)

    function seleccionarFoto(event) {
        const file = event.target.files[0];
        imageURL=URL.createObjectURL(file);
    }

    const agregarCarreras=()=>{
        const carreraNuevo = prompt("INGRESA NUEVA CARRERA")
        if(carreraNuevo == null || carreraNuevo === ""){
            alert("EL CAMPO ESTA VACIO");
        }else{
            let carreraNuevo1= carreraNuevo.toUpperCase();
            if (carreras.includes(carreraNuevo1)) {
                alert("CARRERA YA EXISTENTE.");
            }else {
                alert("CARRERA REGISTRADA CON EXITO.");
                setCarreras([...carreras,carreraNuevo1])
            } 
        }
    }

    function handleInputChange(event) {
        // Convertimos el texto ingresado a mayúsculas
        const uppercasedValue = event.target.value.toUpperCase();
        // Actualizamos el estado con el nuevo valor en mayúsculas
        setInputValue(uppercasedValue);
      }

    function validarRegistro(matricula1) {
        return alumnos.some(item => item.matricula === matricula1);
      }

    const agregaAlumnos=()=>{
        let matricula1 = document.getElementById("matricula").value;
        let nombre1 = document.getElementById("name").value;
        let carrera1 = document.getElementById("carrerasg").value;
        if(matricula1 === "" || nombre1 ==="" || carrera1 === "SELECCION" || imageURL == null){
            alert("POR FAVOR RELLENE LOS CAMPOS")
        }else{
            if(validarRegistro(matricula1)){
                alert("LA MATRICULA YA A SIDO REGISTRADA POR OTRO ALUMNO")
                setInputValue(null);
                document.getElementById("matricula").value = "";
                document.getElementById("name").value = "";
                document.getElementById("carrerasg").value = "SELECCION";
                document.getElementById("archivo").value="";
            }else{
                setAlumnos([...alumnos,{matricula:matricula1,nombre:nombre1,carrerageneral:carrera1,foto:imageURL}])
                alert("El alumno ha sido registrado exitosamente.");
                setInputValue(null);
                document.getElementById("matricula").value = "";
                document.getElementById("name").value = "";
                document.getElementById("carrerasg").value = "SELECCION";
                document.getElementById("archivo").value="";
            }
        }
    }


    const eliminarRegistro = (matricula) => {
        const nuevaListaAlumnos = alumnos.filter((alumno) => alumno.matricula !== matricula);
        setAlumnos(nuevaListaAlumnos);
    };

    const editarRegistro = (index, matr) => {
        console.log(index)
        document.getElementById("formulariooculto").style.display = "block";
        document.getElementById("formulario-original").style.display = "none";
        var tabla = document.getElementById("tabla-registros");
        let id = index+1
        var fila = tabla.rows[id];
        document.getElementById("matriculaeditar").value = fila.cells[0].innerHTML;
		    document.getElementById("nombreeditar").value = fila.cells[1].innerHTML;
		    document.getElementById("carreraseditar").value = fila.cells[2].innerHTML;
        setMatricula4(matr)
    };

    const guardarRegistroEditado = (event) => {
        event.preventDefault(); // evitar que se recargue la página al hacer submit
    
        // obtener los nuevos datos del registro editado desde los inputs del formulario
        const matriculaedit = document.getElementById("matriculaeditar").value;
        const nombreedit = document.getElementById("nombreeditar").value;
        const carreraedit = document.getElementById("carreraseditar").value;
        const arcivo = document.getElementById('archivoeditar')
        var nuevosDatos;
        // actualizar los datos del registro en el estado de la lista de alumnos
        if(arcivo.value === ''){
          alert("NO SELECCIONO FOTO, CAMBIO DE CAMPOS");
          nuevosDatos = { matricula:matriculaedit, nombre:nombreedit, carrerageneral:carreraedit};
        }else{
          alert("SELECCIONO FOTO, CAMBIO DE CAMPOS")
          nuevosDatos = { matricula:matriculaedit, nombre:nombreedit, carrerageneral:carreraedit, foto:imageURL };
        }
        setAlumnos(
          alumnos.map((objeto)=>{
            if(objeto.matricula === matricula4){
              return {...objeto,...nuevosDatos}
            }else{
              return objeto;
            }
          })
        );    
        // limpiar el formulario y volver a estado inicial
        event.target.reset();
        document.getElementById("formulariooculto").style.display = "none";
        document.getElementById("formulario-original").style.display = "block";
        document.getElementById("matricula").value = "";
        document.getElementById("name").value = "";
        document.getElementById("carrerasg").value = "SELECCION";
        document.getElementById("archivo").value="";
    };


  return (
    <>
      <div className="form-register">
        <div className='formulario-original' id='formulario-original'>
          <h1>FORMULARIO DE INGRESO DE EMPLEADOS</h1>
          <label>MATRICULA DEL ALUMNO</label>
          <input type="text" id="matricula" name="matricula" className="form-control" />
          <br />
          <br />
          <label>NOMBRE DEL ALUMNO</label>
          <input type="text" id="name" name="name" className="form-control" value={inputValue} onChange={handleInputChange}/>
          <br />
          <br />
          <label>CARRERA QUE CURSA</label>
          <br />
          <select id="carrerasg" name="carrerasg" className="form-select">
            <option value="SELECCION">--SELECCIONAR--</option>
            {carreras.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <br />
          <input type="submit" onClick={agregarCarreras} value="AGREGAR CARRERA" className="btn btn-success"/>
          <br />
          <br />
          <label>SELECCIONA TU FOTO</label>
          <br />
          <input id="archivo" type="file" onChange={seleccionarFoto} className="form-control"/>
          <br />
          <button onClick={agregaAlumnos} className="btn btn-success">
            AGREGAR ALUMNO
          </button>
          <br />
        </div>
        <br />
        <h2>LISTA DE ALUMNOS</h2>
        <table border={1} id="tabla-registros" className="table table-dark table-striped-columns">
          <thead>
            <tr className="table-secondary">
              <th>MATRICULA</th>
              <th>NOMBRE</th>
              <th>CARRERA</th>
              <th>FOTO</th>
              <th>EDITAR</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          {alumnos.map((item, index) => (
            <thead key={index}>
              <tr>
                <td id="elemento">{item.matricula}</td>
                <td id="elemento">{item.nombre}</td>
                <td id="elemento">{item.carrerageneral}</td>
                <td id="elemento">
                  <img src={item.foto} alt="" style={{ width: "100px", height: "100px" }}/>
                </td>
                <td>
                  <button onClick={() => eliminarRegistro(item.matricula)} className="btn btn-success">
                    <img src={eliminarg} alt="" />
                  </button>
                </td>
                <td>
                  <button onClick={() => editarRegistro(index, item.matricula)} className="btn btn-success">
                    <img src={editar} alt="" />
                  </button>
                </td>
              </tr>
            </thead>
          ))}
        </table>
        <br />

        <form
          onSubmit={guardarRegistroEditado}
          id="formulariooculto"
          className="formulario-oculto"
        >
          <input
            type="text"
            name="matriculaeditar"
            placeholder="Matrícula"
            id="matriculaeditar"
            className="form-control"
            required
          />
          <br />
          <input
            type="text"
            name="nombreeditar"
            placeholder="Nombre"
            id="nombreeditar"
            className="form-control"
            value={inputValue} onChange={handleInputChange}
            required
          />
          <br />
          <select id="carreraseditar" name="carreraseditar" className="form-select">
            <option value="SELECCION">--SELECCIONAR</option>
            {carreras.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <br />
          <input
            id="archivoeditar"
            type="file"
            onChange={seleccionarFoto}
            className="form-control"
          />
          <br />
          <br />
          <button type="submit" className="btn btn-success">
            GUARDAR CAMBIOS
          </button>
        </form>
        <br />
      </div>
    </>
  );
}

export default Formulario
