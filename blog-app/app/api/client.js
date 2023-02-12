import axios from "axios";

const client = axios.create({
  baseURL: `https://odd-blue-camel-kilt.cyclic.app/api`,
});

export default client;
