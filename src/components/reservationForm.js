import React, { useState } from "react";

const ReservationForm = ({ addReservation }) => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    people: "",
    comments: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.time || !form.people) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    addReservation(form);
    setForm({ name: "", date: "", time: "", people: "", comments: "" });
  };

  return (
    <div className="page-container">
      <h2>Hacer una Reserva</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          data-testid="date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          data-testid="time"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="people"
          placeholder="Cantidad de personas"
          value={form.people}
          onChange={handleChange}
          required
        />
        <textarea
          name="comments"
          placeholder="Comentarios (opcional)"
          value={form.comments}
          onChange={handleChange}
        />
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default ReservationForm;
