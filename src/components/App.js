import React from 'react'
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
// import movies from '../reducers';
import { addMovies, setShowFavourites } from '../actions'


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
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);

    if ( index != -1 ){
      //found the movie
      return true;
    }

    return false;
  }
  onChangeTab = (val) => {
    console.log('HEY');
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    console.log('Render', this.props.store.getState());
    const { list, favourites, showFavourites } = this.props.store.getState(); // {list: [], favourites: [] }
    const displayMovies  = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
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

export default App;
