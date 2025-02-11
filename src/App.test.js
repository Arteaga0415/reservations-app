import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import ReservationsList from "./components/reservationList";
import App from "./App";
import ReservationForm from "./components/reservationForm";
import { useReservations } from "./hooks/useReservations";

describe("Test a la applicacion de reservas: ", () => {
  it("Muestra 'No hay reservas aún' cuando la lista está vacía", () => {
    render(<ReservationsList reservations={[]} />);
    expect(screen.getByText(/No hay reservas aún/i)).toBeInTheDocument();
  });

  it("Muestra una reserva en la lista", () => {
    const mockReservations = [
      {
        name: "Juan Pérez",
        date: "2025-02-12",
        time: "18:30 PM",
        people: "4",
        comments: "Mesa junto a la ventana",
      },
    ];

    render(<ReservationsList reservations={mockReservations} />);
    expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-02-12/i)).toBeInTheDocument();
    expect(screen.getByText(/18:30 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/4 personas/i)).toBeInTheDocument();
  });

  it("El formulario se renderiza correctamente", () => {
    render(<ReservationForm addReservation={() => {}} />);
    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Cantidad de personas/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Reservar/i)).toBeInTheDocument();
  });

  it("Permite escribir en los inputs", () => {
    render(<ReservationForm addReservation={() => {}} />);
    const nameInput = screen.getByPlaceholderText(/Nombre/i);

    fireEvent.change(nameInput, { target: { value: "Carlos" } });
    expect(nameInput.value).toBe("Carlos");
  });

  it("Envía el formulario con datos válidos", () => {
    const mockAddReservation = jest.fn();
    render(<ReservationForm addReservation={mockAddReservation} />);

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Cantidad de personas/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Comentarios/i), {
      target: { value: "Sin gluten" },
    });
    fireEvent.change(screen.getByTestId("date"), {
      target: { value: "2025-02-12" },
    });
    fireEvent.change(screen.getByTestId("time"), {
      target: { value: "19:00" },
    });

    fireEvent.submit(screen.getByText(/Reservar/i));

    expect(mockAddReservation).toHaveBeenCalled();
  });

  it("Agrega una reserva correctamente con el hook", () => {
    const { result } = renderHook(() => useReservations());

    act(() => {
      result.current.addReservation({
        name: "Pedro",
        date: "2025-02-12",
        time: "19:00",
        people: "3",
      });
    });

    expect(result.current.reservations).toHaveLength(1);
    expect(result.current.reservations[0].name).toBe("Pedro");
    expect(result.current.reservations[0].people).toBe("3");
  });
});
