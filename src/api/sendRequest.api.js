import axios from "axios";

export const createTaskRequest = async (userData) =>
  await axios.post("http://localhost:4000/user", userData);