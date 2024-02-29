import axios from "axios";

const API_URL = "http://www.omdbapi.com/?apikey=35cc8d5f"

//Get Movies By Id
const getMovie = async (name: string, year: string = '') => {
  const { data } = await axios.get(`${API_URL}&t=${name}`.concat(year ? `&y=${year}` : ''))
  return data
}

//Get Movies By Id
const getMovieById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}&i=${id}&plot=full`)
  return data
}

const moviesService = {
  getMovie,
  getMovieById,
}

export default moviesService;