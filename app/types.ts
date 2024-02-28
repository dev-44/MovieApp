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
  id: string;
  title: string;
  image: string;
  rating: string;
  description: string;
}

export type MoviesListType ={
  movies: Movie[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}