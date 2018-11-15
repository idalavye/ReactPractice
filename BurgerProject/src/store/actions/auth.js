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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expriratinDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAutTimeout = (expirationTime) => {

    return {
        type: actionTypes.AUTH_CHECK_TIMEOUTH,
        expirationTime: expirationTime
    }

    // //expirationTime firebase in bize vermiş olduğu tokenin kullanma süresidir. 
    // console.log(expirationTime);
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, (expirationTime * 1000));
    // };
};

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};