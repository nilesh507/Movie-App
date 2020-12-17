// {
//     type: 'ADD_MOVIES'
//     movies: []
// }
// {
//     type: 'DECREASE_COUNT' 
// }
//Action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';

//Action creators
export function addMovies (movies) {
    return {
      type: ADD_MOVIES,
      movies
    }
}

export function addFavourite(movies) {
    return {
      type: ADD_FAVOURITE,
      movies
    }
}
