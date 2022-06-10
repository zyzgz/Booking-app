import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReducerContext } from "../../context/ReducerContext";

export function Hotel() {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const reducer = useContext(ReducerContext);

  const fetchHotel = () => {
    setHotel({
      id: 4,
      name: "Różowy zaułek",
      city: "Międzyzdroje",
      rating: 9.7,
      image: "",
    });
    reducer.dispatch({ type: "set-loading", loading: false });
  };

  useEffect(() => {
    reducer.dispatch({ type: "set-loading", loading: true });
    setTimeout(() => {
      fetchHotel();
    }, 500);
  }, []);

  if (reducer.state.loading) return null;

  return <h1>Hotel: {hotel.name}</h1>;
}
