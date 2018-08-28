import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_RESULT:
            //change date 
            return {
                ...state,
                //@concat
                //Bu yöntem mevcut dizileri değiştirmez, ancak birleştirilen dizilerin değerlerini içeren yeni bir dizi döndürür.
                results: state.results.concat({ id: new Date(), value: action.result })

                /**
                 * state.ctr.counter diyerek global store'a erişemeyiz. 
                 */
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id,1);

            //updating array
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }

    return state;
};

export default reducer;