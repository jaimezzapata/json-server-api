import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { endPointProductos } from "./api/end-points";

function App() {
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");

  const mostrarProductos = async () => {
    const respuesta = await axios.get(endPointProductos);
    setProductos(respuesta.data);
  };

  const confirmar = (id) => {
    let productoDelete = productos.find((producto) => producto.id === id);
    console.log(productoDelete.nombre);
    Swal.fire({
      title: `¿Seguro desea eliminar el producto ${productoDelete.nombre}?`,
      text: "No podrás revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F0F0F",
      cancelButtonColor: "#d3333",
      confirmButtonText: "Si, Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProductos(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El producto se eliminó correctamente",
          icon: "success",
        });
      }
    });
  };

  const eliminarProductos = async (id) => {
    await axios.delete(`${endPointProductos}${id}`);
    mostrarProductos();
  };

  const buscarNombre = (e) => {
    setBuscar(e.target.value);
  };

  let resulytadoBusqueda = [];
  if (!buscar) {
    resulytadoBusqueda = productos;
  } else {
    resulytadoBusqueda = productos.filter((item) =>
      item.nombre.toLowerCase().includes(buscar.toLocaleLowerCase())
    );
  }

  useEffect(() => {
    mostrarProductos();
  }, []);

  return (
    <section className="empleados">
      <h1 className="animate__animated animate__bounce animate__repeat-2">
        Listado
      </h1>
      <section className="d-flex justify-content-center align-items-center w-75">
        <input
          onChange={buscarNombre}
          className="form-control w-25 h-25"
          type="search"
          placeholder="Buscar"
        />
        <Link className="btn btn-outline-secondary w-25 m-2" to={"/crear"}>
          <i className="bi bi-plus-square text-success"></i>
        </Link>
      </section>
      <section className="cards">
        {resulytadoBusqueda.map((producto) => (
          <section className="card" key={producto.id}>
            <section key={producto.id}>
              <h4>{producto.nombre}</h4>
              <p>Valor: ${producto.valor}</p>
              <p>Gama: {producto.gama}</p>
              <p>Venta: {producto.venta}</p>
              <p>Marca: {producto.marca}</p>
              <p>Disponible?: {producto.disponible}</p>
              <p>Peso: {producto.peso} Gramos</p>
            </section>
            <section className="botones">
              <button className="btn btn-outline-secondary">
                <i className="bi bi-pen"></i>
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => confirmar(producto.id)}
              >
                <i className="bi bi-recycle text-danger"></i>
              </button>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}

export default App;