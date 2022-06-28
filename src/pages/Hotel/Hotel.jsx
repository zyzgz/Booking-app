import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingIcon } from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "axios";
import { objectToArray } from "../../helpers/objects";

export function Hotel() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchHotel = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/hotels/${id}.json`
      );

      setHotel(res.data);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return loading ? <LoadingIcon /> : <h1>Hotel: {hotel.name}</h1>;
}
