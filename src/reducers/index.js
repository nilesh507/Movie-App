import { ADD_MOVIES, ADD_FAVOURITE } from '../actions'

const initialMovieList = {
    list: [],
    favourites: []
}
export default function movies(state = initialMovieList, action) {
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     };
    // }
    // return state;
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            };
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [action.movies, ...state.favourites]
            }                
        default :
            return state;
    }
} 