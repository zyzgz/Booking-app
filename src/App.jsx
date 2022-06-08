import { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { Hotels } from "./components/Hotels/Hotels";
import { LoadingIcon } from "./components/UI/LoadingIcon/LoadingIcon";
import { Searchbar } from "./components/UI/Searchbar/Searchbar";
import { Layout } from "./components/Layout/Layout";
import { Footer } from "./components/Footer/Footer";
import { AuthContext } from "./context/AuthContext";
import { LastHotel } from "./components/Hotels/LastHotel/LastHotel";
import useStateStorage from "./hooks/useSatateStorage";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "set-hotels":
      return { ...state, hotels: action.hotels };
    case "set-loading":
      return { ...state, loading: action.loading };
    case "login":
      return { ...state, isAuthenticated: true };
    case "logout":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Nie ma takiej akcji: " + action.type);
  }
};

const initialState = {
  hotels: [],
  loading: true,
  isAuthenticated: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastHotel, setLastHotel] = useStateStorage("last-hotel", null);

  const searchHandler = (term) => {
    const newHotels = [...hotel].filter((x) =>
      x.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch({ type: "set-hotels", hotels: newHotels });
  };

  const openHotel = (hotel) => {
    setLastHotel(hotel);
  };

  const removeLastHotel = () => {
    setLastHotel(null);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "set-hotels", hotels: hotel });
      dispatch({ type: "set-loading", loading: false });
    }, 1000);
  }, []);

  const header = (
    <Header>
      <Searchbar onSearch={(term) => searchHandler(term)} />
    </Header>
  );

  const content = (
    <Routes>
      <Route
        exact={true}
        path="/"
        element={
          <>
            {lastHotel ? (
              <LastHotel {...lastHotel} onRemove={removeLastHotel} />
            ) : null}
            <Hotels onOpen={openHotel} hotels={state.hotels} />
          </>
        }
      />

      <Route path="/hotel/:id" element={<h1>to jest jakis hotel</h1>} />
    </Routes>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isAuthenticated: state.isAuthenticated,
          login: () => dispatch({ type: "login" }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <Layout
          header={header}
          menu={<Menu />}
          content={state.loading ? <LoadingIcon /> : content}
          footer={<Footer />}
        />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
