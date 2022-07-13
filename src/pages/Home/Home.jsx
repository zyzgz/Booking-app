import { useEffect, useState } from "react";
import { LastHotel } from "../../components/Hotels/LastHotel/LastHotel";
import { Hotels } from "../../components/Hotels/Hotels";
import useStateStorage from "../../hooks/useSatateStorage";
import { LoadingIcon } from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "axios";
import { objectToArray } from "../../helpers/objects";
import { Searchbar } from "../../components/UI/Searchbar/Searchbar";

export function Home(props) {
  const [lastHotel, setLastHotel] = useStateStorage("last-hotel", null);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  const openHotel = (hotel) => {
    setLastHotel(hotel);
  };

  const removeLastHotel = () => {
    setLastHotel(null);
  };

  const fetchHotels = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/hotels.json`
      );

      const newHotel = objectToArray(res.data).filter(
        (hotel) => hotel.status === "1"
      );

      setHotels(newHotel);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <>
      <Searchbar />
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {lastHotel ? (
            <LastHotel {...lastHotel} onRemove={removeLastHotel} />
          ) : null}
          <Hotels onOpen={openHotel} hotels={hotels} medium={6} />
        </>
      )}
    </>
  );
}
