import * as actionTypes from './actions/actionsTypes';

const initialState = {
    counter: 5,
    results: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {/*
        case 'INCREMENT':
            return {
                counter: state.counter + 1
            }*/
        case actionTypes.INCREMENT:
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                //@concat
                //Bu yöntem mevcut dizileri değiştirmez, ancak birleştirilen dizilerin değerlerini içeren yeni bir dizi döndürür.
                results: state.results.concat({ id: new Date(), value: state.counter })
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id,1);

            //updating array
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results:updatedArray
            }
    }

    return state;
};

export default reducer;