import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HotelForm } from "../../../../components/Hotels/HotelForm/HotelForm";
import { useEffect, useState } from "react";

export function EditHotel(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  const submit = async (form) => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/hotels/${id}.json`,
      form
    );
    navigate("/profil/hotele");
  };

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/hotels/${id}.json`
      );
      setHotel(res.data);
    };
    fetchHotel();
  }, [id]);

  return (
    <HotelForm
      title="Edytuj hotel"
      hotel={hotel}
      buttonText="Zapisz"
      onSubmit={submit}
    />
  );
}
