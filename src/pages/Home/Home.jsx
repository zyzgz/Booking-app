import { useEffect, useState } from "react";
import { LastHotel } from "../../components/Hotels/LastHotel/LastHotel";
import { Hotels } from "../../components/Hotels/Hotels";
import useStateStorage from "../../hooks/useSatateStorage";
import { LoadingIcon } from "../../components/UI/LoadingIcon/LoadingIcon";

const hotel = [
  {
    id: 1,
    name: "Pod akacjami",
    city: "Warszawa",
    rating: 8.3,
    image: "",
  },
  {
    id: 2,
    name: "Dębowy",
    city: "Lublin",
    rating: 9.3,
    image: "",
  },
  {
    id: 3,
    name: "Alexis",
    city: "Poznań",
    rating: 8.5,
    image: "",
  },
  {
    id: 4,
    name: "Różowy zaułek",
    city: "Międzyzdroje",
    rating: 9.7,
    image: "",
  },
];

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

  useEffect(() => {
    setTimeout(() => {
      setHotels(hotel);
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {lastHotel ? (
        <LastHotel {...lastHotel} onRemove={removeLastHotel} />
      ) : null}
      <Hotels onOpen={openHotel} hotels={hotels} />
    </>
  );
}