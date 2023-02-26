import axios from "axios";

export const createUser = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}