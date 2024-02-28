import axios from "axios";

const API_URL = "http://www.omdbapi.com/?apikey=35cc8d5f"

//Get Movies By Id
const getMoviesById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}&i=${id}`)
  return data
}

const moviesService = {
  getMoviesById
}

export default moviesService;