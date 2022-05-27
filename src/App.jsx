import { useState } from "react";

import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { Hotels } from "./components/Hotels/Hotels";
import { LoadingIcon } from "./components/UI/LoadingIcon/LoadingIcon";
import { Searchbar } from "./components/UI/Searchbar/Searchbar";
import { Layout } from "./components/Layout/Layout";
import { Footer } from "./components/Footer/Footer";

function App() {
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
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchHandler = (term) => {
    const hotels = [...hotels].filter((x) =>
      x.name.toLowerCase().includes(term.toLowerCase())
    );
    setHotels(hotels);
  };

  function componentDidMount() {
    setTimeout(() => {
      setHotels(hotel);
      setLoading(false);
    }, 1000);
  }

  componentDidMount();

  return (
    <div className="App">
      <Layout
        header={
          <Header>
            <Searchbar onSearch={(term) => searchHandler(term)} />
          </Header>
        }
        menu={<Menu />}
        content={loading ? <LoadingIcon /> : <Hotels hotels={hotels} />}
        footer={<Footer />}
      />
    </div>
  );
}

export default App;
