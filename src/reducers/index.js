import {ADD_MOVIES} from '../actions'

const initialMovieList = {
    list: [] ,
    favourites: []
}
export default function movies (state = initialMovieList, action ) {
    if(action.type === ADD_MOVIES){
        return {
            ...state,
            list: action.movies
        };
    }
    return state;
} 