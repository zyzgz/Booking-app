import { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { Searchbar } from "./components/UI/Searchbar/Searchbar";
import { Layout } from "./components/Layout/Layout";
import { Footer } from "./components/Footer/Footer";
import { AuthContext } from "./context/AuthContext";
import { ReducerContext } from "./context/ReducerContext";
import { reducer, initialState } from "./reducer";
import { Home } from "./pages/Home/Home";
import { Hotel } from "./pages/Hotel/Hotel";

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchHandler = (term) => {
    const newHotels = [...hotel].filter((x) =>
      x.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch({ type: "set-hotels", hotels: newHotels });
  };

  const header = (
    <Header>
      <Searchbar onSearch={(term) => searchHandler(term)} />
    </Header>
  );

  const content = (
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      <Route path="/hotele/:id" element={<Hotel />} />
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
        <ReducerContext.Provider
          value={{
            state: state,
            dispatch: dispatch,
          }}
        >
          <Layout
            header={header}
            menu={<Menu />}
            content={content}
            footer={<Footer />}
          />
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
