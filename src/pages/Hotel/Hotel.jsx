import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingIcon } from "../../components/UI/LoadingIcon/LoadingIcon";

export function Hotel() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchHotel = () => {
    setHotel({
      id: 4,
      name: "Różowy zaułek",
      city: "Międzyzdroje",
      rating: 9.7,
      image: "",
    });
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchHotel();
    }, 500);
  }, []);

  return loading ? <LoadingIcon /> : <h1>Hotel: {hotel.name}</h1>;
}
