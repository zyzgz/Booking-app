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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Searchbar />
    </Header>
  );

  const content = (
    <>
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/hotele/:id" element={<Hotel />} />
        <Route path="/wyszukaj/:term" element={<Search />} />
      </Routes>
    </>
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
