import React from 'react'
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
// import movies from '../reducers';
import { addMovies, setShowFavourites } from '../actions'
import {StoreContext } from '../index'

class App extends React.Component {
  componentDidMount () {
    const {store } = this.props;
    //2 (Call back)
    store.subscribe(() => {
      console.log('Updated');
      this.forceUpdate();
    });
    //make api call 
    //dispatch action 
    
    //1
    store.dispatch(addMovies(data));
    
    //3
    console.log('State-->', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);

    if ( index != -1 ){
      //found the movie
      return true;
    }

    return false;
  }
  onChangeTab = (val) => {
    // console.log('HEY');
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    const { movies, search } = this.props.store.getState(); // { movies: {list:[], favourites:[], }, search: {} }
    console.log('Render', this.props.store.getState()); 
    const { list, favourites, showFavourites } = movies; 
    const displayMovies  = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${ showFavourites ? '' : 'active-tabs' }`} onClick={ () => this.onChangeTab(false) }>Movies</div>
            <div className={`tab ${ showFavourites ? 'active-tabs' : '' }` } onClick={ () => this.onChangeTab(true) }>favourites</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch} 
                isMovieFavourite= {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          <div>
            {displayMovies.length===0 ? <div className="no-movies">No movies to display!</div>: null}
          </div>
        </div>
      </div>
    );
  };

}

class AppWrapper extends React.Component {
  render () {
    return (
      <StoreContext.Consumer>
        { (store) => <App store= {store}/> }
      </StoreContext.Consumer>
    );
  } 
}


export default AppWrapper;
