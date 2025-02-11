import { useState } from "react";

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);

  const addReservation = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  return { reservations, addReservation };
};
