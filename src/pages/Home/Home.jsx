import { useContext, useEffect } from "react";
import { LastHotel } from "../../components/Hotels/LastHotel/LastHotel";
import { Hotels } from "../../components/Hotels/Hotels";
import useStateStorage from "../../hooks/useSatateStorage";
import { ReducerContext } from "../../context/ReducerContext";

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
  const reducer = useContext(ReducerContext);

  const openHotel = (hotel) => {
    setLastHotel(hotel);
  };

  const removeLastHotel = () => {
    setLastHotel(null);
  };

  useEffect(() => {
    reducer.dispatch({ type: "set-loading", loading: true });

    setTimeout(() => {
      reducer.dispatch({ type: "set-hotels", hotels: hotel });
      reducer.dispatch({ type: "set-loading", loading: false });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reducer.state.loading) return null;

  return (
    <>
      {lastHotel ? (
        <LastHotel {...lastHotel} onRemove={removeLastHotel} />
      ) : null}
      <Hotels onOpen={openHotel} hotels={reducer.state.hotels} />
    </>
  );
}
