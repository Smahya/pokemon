import axios from "axios";

const BASEURL = 'https://pokeapi.co/api/v2/pokemon';

const instance = axios.create({
 baseURL: BASEURL
})

export { instance }