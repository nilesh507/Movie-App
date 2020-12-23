import * as React from 'react'
import {Provider} from 'react-redux'

import { createContext } from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import './index.css';
import App from './components/App';
import movies from './reducers'
import rootReducer from './reducers'
import AppWrapper from './components/App';

// //curryed form function logger (obj, next, action )/
// //logger(obj)(next)(action)
// const logger = function ({ dispatch, getState }) {
//     return function (next) {
//         return function  (action) {
//             //middleware code
//             console.log('ACTION_TYPE', action.type);
//             next(action);
//         }
//     }
// };

const logger = ({ dispatch, getState }) => (next) => (action) => {
    //logger code
    if(typeof action !== 'function'){
        console.log('ACTION_TYPE-->', action.type);
    } 
    next(action);
}

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//     //logger code 
//     if(typeof action === 'function'){
//         action(dispatch);
//         return ;
//     }
//     next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store',store.getState());

// export const StoreContext = createContext();

// console.log('StoreContext', StoreContext);

// class Provider extends React.Component {
//     render () {
//         const {store} = this.props;
//         return (
//             <StoreContext.Provider value={store}>
//                 {this.props.children}
//             </StoreContext.Provider>
//         )
//     }
// }

// //const connectedAppComponent = connect (callback)(App);
// export function connect(callback) {
//     return function (Component) {
//         class ConnectedComponent extends React.Component {
//             constructor(props) {
//                 super(props);
//                 this.unsubscribe = this.props.store.subscribe(() => {
//                     console.log('Updated');
//                     this.forceUpdate();
//                 });
//             }

//             compontntWillUnmount () {
//                 this.unsubscribe();
//             }

//             render() {
//                 const { store } = this.props;
//                 const state = store.getState();
//                 const dataToBePassedAsProps = callback(state);
//                 return <Component dispatch={store.dispatch} {...dataToBePassedAsProps}/>
//             }
//         }

//         class ConnectedComponentWrapper extends React.Component {
//             render() {
//                 return (
//                     <StoreContext.Consumer>
//                         {(store) => <ConnectedComponent store={store} />}
//                     </StoreContext.Consumer>
//                 )
//             }
//         }
//         return ConnectedComponentWrapper;

//     };
// }

//update store by dispatching actions
// store.dispatch({
//     type: 'ADD_MOVIES',
//     movies: [{name: "Superman"}]
// });

// console.log('AFTER STATE-->', store.getState())

ReactDOM.render(
    <Provider store= { store }>
        <AppWrapper />
    </Provider>,
    document.getElementById('root')
);


//Functional component <--> class component