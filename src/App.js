import React, { useState } from "react";
import ReservationsList from "./components/reservationList";
import ReservationForm from "./components/reservationForm";
import { useReservations } from "./hooks/useReservations";

const App = () => {
  // const [reservations, setReservations] = useState([]);

  // const addReservation = (reservation) => {
  //   setReservations([...reservations, reservation]);
  // };

  const { reservations, addReservation } = useReservations();

  return (
    <div className="page">
      <ReservationsList reservations={reservations} />
      <ReservationForm addReservation={addReservation} />
    </div>
  );
};

export default App;
