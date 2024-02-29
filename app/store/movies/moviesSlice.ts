import React from 'react';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesListType } from '../../types';
import moviesService from './moviesService';

const initialState: MoviesListType = {
  movie: {
    imdbID: '',
    Title: '',
    Poster: '',
    imdbRating: '',
    Plot: '',
    LongPlot: '',
    Director: '',
    Actors: '',
    Genre: ''
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFinished: false,
  errorMessage: '',
}

// Get movie by Name and Year
export const getMovie = createAsyncThunk('movies/getMovie', async (data: {name: string; year: string}, thunkAPI) => {
  try {
    const { name, year = '' } = data;
    const result =  await moviesService.getMovie(name, year)
    if (result.Response) {
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

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.
      addCase(getMovie.pending, (state) => {
        state.isLoading = true
        state.isFinished = false
      }).
      addCase(getMovie.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.movie = action.payload
        state.isFinished = true
      }).
      addCase(getMovie.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
        state.movie = initialState.movie
        state.isFinished = true
      }).
      addCase(getMovieById.pending, (state) => {
        state.isLoading = true
        state.isFinished = false
      }).
      addCase(getMovieById.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isFinished = true
        state.movie = {
          ...state.movie,
          Plot: state.movie.Plot,
          LongPlot: action.payload.Plot,
          Director: action.payload.Director,
          Actors: action.payload.Actors,
          Genre: action.payload.Genre,
          Year: action.payload.Year,
          Country: action.payload.Country
        }
      }).
      addCase(getMovieById.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
        state.movie = initialState.movie
        state.isFinished = true
      })
  }
})

export const { reset } = moviesSlice.actions;
export default moviesSlice.reducer;