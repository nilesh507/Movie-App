import React from 'react'
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';


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
    store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });
    //3
    console.log('State-->', this.props.store.getState());
  }
  render() {
    console.log('Render')
    const movies = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">favourites</div>
          </div>

          <div className="list">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  };

}

export default App;
