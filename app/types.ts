export type RootStackParamList = {
  HomeScreen: undefined,
  MovieDetails: {
    id: string;
    title?: string;
    image?: string,
    description?: string;
  }
}

export type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  imdbRating: string;
  Plot: string;
  LongPlot: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Year?: string;
  Country?: string;
}

export type MoviesListType ={
  movie: Movie;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}