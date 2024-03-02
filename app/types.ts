export type RootStackParamList = {
  HomeScreen: undefined,
  MovieDetails: {
    id: string;
  }
}

export type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  imdbRating: string;
  Plot: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Year?: string;
  Country?: string;
}

export type MoviesListType ={
  moviesList: Movie[],
  movie: Movie;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isFinished: boolean;
  errorMessage: string;
  searchName: string;
  searchYear: string;
  totalResults: number;
}