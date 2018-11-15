import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    /**
     * Bir işlem yield ile başlıyor ise o işlem tamamlanmadan bir sonraki satıra geçmiyecek demektir.
     * Yani asyncron bir işlem olsaydı cevap gelmeden işlem devam etmiyecektir.
     */
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expriratinDate');
    // yield localStorage.removeItem('userId');

    //call kullanmak test işlmelerimizi kolaylaştırır.
    yield call([localStorage,"removeItem"],"token");
    yield call([localStorage,"removeItem"],"expriratinDate");
    yield call([localStorage,"removeItem"],"userId");

    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCZurHojYNCA0lt3a5B4ufc8X1_URbpSKA';

    if (action.isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZurHojYNCA0lt3a5B4ufc8X1_URbpSKA'
    }

    try {
        const response = yield axios.post(url, authData);

        console.log(response);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expriratinDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAutTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');

    if (!token) {
        yield put(actions.logout());
    } else {
        //Eğer localStore da token varsa ...
        const expirationDate = yield new Date(localStorage.getItem('expriratinDate'));

        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAutTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}

