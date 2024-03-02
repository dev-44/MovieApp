import axios from "axios";
import {API_KEY} from '@env'
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`

//Get Movies
const getMovies = async (name: string, year: string = '', page = 1) => {
  const { data } = await axios.get(`${API_URL}&s=${name}&type=movie&page=${page}&y=${year}`)
  return data
}

//Get Movies By Id
const getMovieById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}&i=${id}&plot=full`)
  return data
}

const moviesService = {
  getMovies,
  getMovieById,
}

export default moviesService;