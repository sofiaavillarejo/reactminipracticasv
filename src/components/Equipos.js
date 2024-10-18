import React, { Component } from 'react'
import axios from 'axios';

export default class Equipos extends Component {
  selectEquipo = React.createRef();
  cajaNombre = React.createRef();

  state = {
    equipos: [],
    jugadores: [],
  }
  
  
  loadEquipos = () =>{
    var urlApi = "https://apiejemplos.azurewebsites.net/";
    var request = "api/Equipos";
    var url = urlApi + request;
    axios.get(url).then(response => {
      console.log(response.data);
      this.setState({
        equipos: response.data
      })
    })
  }

  buscarJugadores = (e) =>{
    e.preventDefault();
    var urlApi = "https://apiejemplos.azurewebsites.net/";
    var idEquipo = this.selectEquipo.current.value;
    console.log(idEquipo);
    var requestJugadores = "api/Jugadores/JugadoresEquipos/" + idEquipo;
    let url = urlApi + requestJugadores;
    axios.get(url).then(response => {
      console.log(response.data);
      this.setState({
        jugadores: response.data
      })
    })
  }
  componentDidMount = () => {
    this.loadEquipos();
  }

  buscarNombre = (e) =>{
    e.preventDefault();
    var urlApi = "https://apiejemplos.azurewebsites.net/";
    var nombre = this.cajaNombre.current.value.toLowerCase();
    var request = "api/Jugadores/FindJugadores/"+ nombre;
    var url = urlApi + request;
    axios.get(url).then(response => {
      this.setState({
        jugadores: response.data,
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Mini Practica React</h1>
        <form>
          <label>Nombre Jugador</label>
          <input type='text' ref={this.cajaNombre}/>
          <button onClick={this.buscarNombre}>Buscar por NOMBRE</button>
          <hr/>
          <label>Seleccione un equipo</label>
          <select ref={this.selectEquipo}>
          {
              this.state.equipos.map((equipo, index) => {
                return(
                  <option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>
                )
              })
            }
          </select>
          <button onClick={this.buscarJugadores}>Buscar Jugadores</button>
        </form>
        {
          this.state.jugadores.length > 0 && (
            <table border="1">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Posicion</th>
                <th>Pais</th>
                <th>Fecha nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.jugadores.map((jugador, index) => {
                  return(
                    <tr key={index}>
                      <td><img src={jugador.imagen} style={{width:"100px"}}></img></td>
                      <td>{jugador.nombre}</td>
                      <td>{jugador.posicion}</td>
                      <td>{jugador.pais}</td>
                      <td>{jugador.fechaNacimiento}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          )
        }
      </div>
    )
  }
}
