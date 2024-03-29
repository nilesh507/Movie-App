import movies from "../reducers";

//Action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT"
export const SHOW_SEARCHES = "SHOW_SEARCHES"

//Action creators - function that returns a action
export function addMovies (movies) {
    return {
      type: ADD_MOVIES,
      movies
    }
}

export function addFavourite(movies) {
    return {
      type: ADD_TO_FAVOURITE,
      movies
    }
}

export function removeFromFavourite (movie) {
  return {
    type: REMOVE_FROM_FAVOURITE,
    movie
  }
}
export function setShowFavourites (val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val
  }
}
export function addMovieToList (movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie
  }
}
export function handleMovieSearch (movie) {
  const url = `https://www.omdbapi.com/?apikey=44f93f2a&t=${movie}`;
  return function (dispatch) {
    fetch(url)
    .then(response => response.json())
    .then(movie => {
      console.log('MOVIE-->',movie);

      //dispatch an action
      dispatch(addovieSearchResult(movie))
    })
  }
}

export function addovieSearchResult (movie) {
  return { 
    type: ADD_SEARCH_RESULT,
    movie
  }
}

export function showSearchResults(){
  return {
    type: SHOW_SEARCHES,
  }
}