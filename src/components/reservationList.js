import React from "react";
import PropTypes from "prop-types";

const ReservationsList = ({ reservations }) => {
  return (
    <div className="page-container">
      <h2>Reservas</h2>
      <ul>
        {reservations.length === 0 ? (
          <p>No hay reservas aún.</p>
        ) : (
          reservations.map((reserva, index) => (
            <div className="reservation-card" key={index}>
              <strong>{reserva.name}</strong> - {reserva.date} {reserva.time} -{" "}
              {reserva.people} personas
              <p>{reserva.comments && `Comentarios: ${reserva.comments}`}</p>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

ReservationsList.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      people: PropTypes.string.isRequired,
      comments: PropTypes.string,
    })
  ).isRequired,
};

export default ReservationsList;
