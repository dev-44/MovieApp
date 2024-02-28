import React from 'react';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesListType } from '../../types';
import moviesService from './moviesService';

const initialState: MoviesListType = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

// Get movies by ID
export const getMoviesById = createAsyncThunk('movies/getMoviesById', async (id: string, thunkAPI) => {
  try {
    return await moviesService.getMoviesById(id)
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
      addCase(getMoviesById.pending, (state) => {
        state.isLoading = true
      }).
      addCase(getMoviesById.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      }).
      addCase(getMoviesById.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  }
})

export const { reset } = moviesSlice.actions;
export default moviesSlice.reducer;