import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://hotele-react-default-rtdb.europe-west1.firebasedatabase.app",
});

export default instance;
