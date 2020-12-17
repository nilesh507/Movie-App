// {
//     type: 'ADD_MOVIES'
//     movies: []
// }
// {
//     type: 'DECREASE_COUNT' 
// }
//Action types
export const ADD_MOVIES = 'ADD_MOVIES';

//Action creators
export function addMovies (movies) {
    return {
      type: ADD_MOVIES,
      movies
    }
}
