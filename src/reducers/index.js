import { combineReducers } from 'redux';
import {
    ADD_MOVIES,
    ADD_TO_FAVOURITE,
    REMOVE_FROM_FAVOURITE,
    SET_SHOW_FAVOURITES,
    ADD_MOVIE_TO_LIST,
    ADD_SEARCH_RESULT,
    SHOW_SEARCHES
} from '../actions'


const initialMoveieState = {
    list: [],
    favourites: [],
    showFavourites: false
}
// Reducer for movies
export function movies(state = initialMoveieState, action) {
    // console.log('MOVIES REDUCER', action);
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
                ...state, // make a copy of the state object and then update the following properties
                list: action.movies
            };
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites: [action.movies, ...state.favourites]
            }
        case REMOVE_FROM_FAVOURITE:
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return {
                ...state,
                favourites: filteredArray
            }
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val
            }
            case ADD_MOVIE_TO_LIST:
                return {
                    ...state,
                    list: [action.movie, ...state.list]
                };
        default:
            return state;
    }
};

const initialSearchState = {
    result: {},
    showSearchResults: false,
};
// Reducer for search
export function search(state = initialSearchState, action) {
    // console.log("SEARCH REDUCER");
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true,
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false,
            };
        case SHOW_SEARCHES:
            return {
                ...state,
                showSearchResults: false,
            }
        default:
            return state;
    }
    
}

const initialRootState = {
    movies: initialMoveieState,
    search: initialSearchState,
};
// combining the 2 reducer into one!
export default function rootReducer(state = initialRootState, action) {
    return {
        movies: movies(state.movies, action),
        search: search(state.search, action),
    };
}

// export default combineReducers ({
//     movies,
//     search
// });