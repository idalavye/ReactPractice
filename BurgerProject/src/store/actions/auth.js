import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expriratinDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAutTimeout = (expirationTime) => {

    //expirationTime firebase in bize vermiş olduğu tokenin kullanma süresidir. 
    console.log(expirationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, (expirationTime * 1000));
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCZurHojYNCA0lt3a5B4ufc8X1_URbpSKA';

        if (isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZurHojYNCA0lt3a5B4ufc8X1_URbpSKA'
        }

        axios.post(url, authData)
            .then((response) => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expriratinDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAutTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFailed(error.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            //Eğer localStore da token varsa ...
            const expirationDate = new Date(localStorage.getItem('expriratinDate'));

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAutTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}