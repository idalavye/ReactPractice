import * as actionTypes from './actionsTypes';

//Action Creator
export const saveResult = (res) => {
    //const updatedResult = res * 2;
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
}

//Redux thunk asyncronize code yazabilmemizi sağlar

export const storeResult = (res) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(res));
        }, 2000)
    }
}

export const deleteResult = (resId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resId
    }
}
