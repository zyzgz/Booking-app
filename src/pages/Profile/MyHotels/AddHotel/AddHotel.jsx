import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HotelForm } from "../../../../components/Hotels/HotelForm/HotelForm";

export function AddHotel(props) {
  const navigate = useNavigate();

  const submit = async (form) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/hotels.json`, form);
    navigate("/profil/hotele");
  };

  return (
    <HotelForm title="Dodaj Hotel" buttonText="Zapisz" onSubmit={submit} />
  );
}
