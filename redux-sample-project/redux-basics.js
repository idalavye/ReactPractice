const redux = require('redux'); //Node.JS syntax
const createStore = redux.createStore;

const initialState = {
    counter:0
};

//Reducer
const rootReducer = (state = initialState,action) => {
    if(action.type === 'INC_COUNTER'){
        return{
            ...state,
            counter:state.counter + 1
        }
    }

    if(action.type === 'ADD_COUNTER'){
        return{
            ...state,
            counter:state.counter + action.value
        }
    }
    
    return state;
};

//
/**
 * createStore bir reducer metot bekler
 */
const store = createStore(rootReducer);
console.log(store.getState());

//Subscription
store.subscribe(() => {
    console.log('[Subscription]' , store.getState());
});

//Dispatching Action
/**
 * dispatch metodu mutlaka type field içeren bir obje almalı
 */
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER', value:10});
console.log(store.getState());




/**
 * node redux-basics.js
 */