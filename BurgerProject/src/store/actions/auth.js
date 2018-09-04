import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        console.log(authData);

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCZurHojYNCA0lt3a5B4ufc8X1_URbpSKA', authData)
            .then((response)=>{
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFailed(error));
            });
    };
};