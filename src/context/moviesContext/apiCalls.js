import {
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess
} from "./MovieActions"
import axios from "axios";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get('/movies', {
      headers: {token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken}
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
}

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    console.log(movie)
    const res = await axios.post('/movies/', movie, {
      headers: {token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken}
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure());
  }
}

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete('/movies/' + id, {
      headers: {token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken}
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure());
  }
}