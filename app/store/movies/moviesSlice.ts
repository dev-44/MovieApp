import React from 'react';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesListType } from '../../types';
import moviesService from './moviesService';
import { RootState } from '../index';

const initialState: MoviesListType = {
  moviesList: [],
  movie: {
    imdbID: '',
    Title: '',
    Poster: '',
    imdbRating: '',
    Plot: '',
    Director: '',
    Actors: '',
    Genre: '',
    Year: '',
    Country: '',
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFinished: false,
  errorMessage: '',
  searchName: '',
  searchYear: '',
  totalResults: 0,
}

// Get movie by Name and Year
export const getMovies = createAsyncThunk('movies/getMovies', async (data: {name: string; year: string, page: number}, thunkAPI) => {
  try {
    const { name, year, page } = data;
    const result =  await moviesService.getMovies(name, year, page)
    if (result.Response === 'True') {
      // if (page > 1) {
      //   const prevData = (thunkAPI.getState() as RootState).movies.movies
      //   console.log('PrevData', prevData)
      //   result.Search = [...prevData, ...result.Search]
      //   console.log('PAGE >>> 1', result.Search)
      //   return result
      // }
      // console.log('PAGE === 1', result.Search)
      return result
    } else {
      throw new Error('Movie not found')
    }
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Get More Movies by Pagination
export const getMoreMovies = createAsyncThunk('movies/getMoreMovies', async (data: {name: string; year: string, page: number}, thunkAPI) => {
  try {
    const { name, year, page } = data;
    const result =  await moviesService.getMovies(name, year, page)
    if (result.Response === 'True') {
      return result
    } else {
      throw new Error('Movie not found')
    }
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Get movie by Id
export const getMovieById = createAsyncThunk('movies/getMovieById', async (id: string, thunkAPI) => {
  try {
    const result = await moviesService.getMovieById(id)
    if (result.Response === 'True') {
      return result
    } else {
      throw new Error('Movie not found')
    }
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Set Search Data
export const setSearchData = createAsyncThunk('movies/setSearchData', async (data: {name: string; year: string}, thunkAPI) => {
  return data
})

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.
      addCase(getMovies.pending, (state) => {
        state.isLoading = true
        state.isFinished = false
      }).
      addCase(getMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.moviesList = action.payload.Search
        state.totalResults = action.payload.totalResults
        state.isFinished = true
      }).
      addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
        state.isFinished = true
      }).
      addCase(getMoreMovies.pending, (state) => {
        state.isLoading = true
        state.isFinished = false
      }).
      addCase(getMoreMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.moviesList = [...state.moviesList, ...action.payload.Search]
        state.isFinished = true
      }).
      addCase(getMoreMovies.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
        state.isFinished = true
      }).
      addCase(getMovieById.pending, (state) => {
        state.isLoading = true
        state.isFinished = false
      }).
      addCase(getMovieById.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.movie = action.payload
        state.isFinished = true
      }).
      addCase(getMovieById.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
        state.isFinished = true
      }).
      addCase(setSearchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.searchName = action.payload.name
        state.searchYear = action.payload.year
      })
  }
})

export const { reset } = moviesSlice.actions;
export default moviesSlice.reducer;