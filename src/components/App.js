import React from 'react'
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
// import movies from '../reducers';
import { addMovies } from '../actions'


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

  render() {
    console.log('Render', this.props.store.getState());
    const { list } = this.props.store.getState(); // {list: [], favourites: [] }
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">favourites</div>
          </div>

          <div className="list">
            {list.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch} 
                isMovieFavourite= {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

}

export default App;
