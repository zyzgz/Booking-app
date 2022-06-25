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
import { Search } from "./pages/Search/Search";
import { ProfileDetails } from "./pages/Profile/ProfileDetails/ProfileDetails";
import { MyHotels } from "./pages/Profile/MyHotels/MyHotels";
import { NotFound } from "./pages/404/NotFound";
import { Login } from "./pages/Auth/Login";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute/AuthenticatedRoute";
import { AddHotel } from "./pages/Profile/MyHotels/AddHotel/AddHotel";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Auth/Register/Register";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Searchbar />
    </Header>
  );

  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path="/profil/hotele/dodaj-nowy-hotel" element={<AddHotel />} />
      </Route>
      <Route path="/hotele/:id" element={<Hotel />} />
      <Route path="/wyszukaj/:term?" element={<Search />} />
      <Route path="/zaloguj" element={<Login />} />
      <Route path="/rejestracja" element={<Register />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path="/profil" element={<Profile />}>
          <Route path="" element={<ProfileDetails />} />
          <Route path="hotele" element={<MyHotels />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
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
