import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
const apiProductos = `http://localhost:3000`;

const Crear = () => {
  const { register, handleSubmit } = useForm();
  const regresar = useNavigate();

  async function agregar(data, e) {
    e.preventDefault();
    await axios.post(apiProductos + "/productos", data);
    regresar("/");
  }

  return (
    <form
      onSubmit={handleSubmit(agregar)}
      className="form-control d-flex justify-content-evenly flex-column align-items-center gap-2 p-5"
    >
      <label htmlFor="nombre">
        Nombre
      </label>
      <input className="form-control w-25" type="text" {...register("nombre", {
        required: true
      })} />

      <label htmlFor="valor">
        Valor
      </label>
      <input className="form-control w-25" type="text" {...register("valor", {
        required: true
      })} />

      <label htmlFor="categoria">
        Categoria
      </label>
      <input className="form-control w-25" type="text" {...register("gama", {
        required: true
      })} />

      <label htmlFor="fecha">
        Fecha
      </label>
      <input
        className="form-control w-25"
        type="datetime-local"
        {...register("venta", {
            required: true
        })}
      />
      <label htmlFor="">Disponible?</label>
        <select name="" id="" {...register('disponible', {
            required: true
        })}>
            <option value="si">Si</option>
            <option value="no">No</option>
        </select>
      <label htmlFor="marca">
        Marca
      </label>
      <input className="form-control w-25" type="text" {...register("marca", {
        required: true
      })} />

      <label htmlFor="peso">
        Peso
      </label>
      <input className="form-control w-25" type="text" {...register("peso", {
        required: true
      })} />

      <input
        className="btn btn-outline-secondary w-25 m-2"
        type="submit"
      />
      <Link className="btn btn-outline-secondary w-25 m-2" to={"/"}>
        <i className="bi bi-arrow-return-left"></i>
      </Link>
    </form>
  );
};

export default Crear;
