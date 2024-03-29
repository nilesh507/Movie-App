import React from 'react'
import { connect } from 'react-redux'

import { addMovieToList, handleMovieSearch, showSearchResults } from '../actions'
// import { connect, StoreContext } from '../index'


class Navbar extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }
    
    //

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 27) { // 27 is the key code for the Escape key
            this.props.dispatch(showSearchResults());
        }
    }
    //

    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults: false
        });
    }

    handleSearch = () => {
        const { searchText } = this.state;
        
        this.props.dispatch(handleMovieSearch(searchText));
    }

    handleChange = (event) => {
        this.setState({
            searchText: event.target.value
        })
        this.handleSearch();
    }


    render() {
        //destructured the result to the movie name 
        const { result: movie, showSearchResults } = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input 
                        onChange={this.handleChange} 
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.handleAddToMovies(movie);
                            }
                        }}
                    />
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>

                    {showSearchResults  &&
                        <div className="search-results">
                            <div className="search-result">
                                <img src={movie.Poster} alt="search-pic"></img>

                                <div className="movie-info">
                                    <span>{movie.Title}</span>
                                    <button onClick={ () =>  this.handleAddToMovies(movie) }>
                                        Add to Movies
                                    </button>
                                </div>
                            </div >
                        </div >
                    }
                </div>
            </div>
        );
    };
}


// class NavbarWrapper extends React.Component {
//     render () {
//       return (
//         <StoreContext.Consumer>
//           { (store) => <Navbar dispatch= {store.dispatch} search= { this.props.search } /> }
//         </StoreContext.Consumer>
//       );
//     } 
// }
  
// function mapStateToProps({state}) {
//     return {
//         search: state.search
//     }
// }
function mapStateToProps({search}) {
    return {
        search,
    };
}

export default connect(mapStateToProps)(Navbar);
