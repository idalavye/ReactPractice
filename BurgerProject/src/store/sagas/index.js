import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actinTypes from '../actions/actionTypes';
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';

import {
    initIngredientsSaga
} from './burgerBuilder';

import {
    purchaseBurgerSaga,
    fetchOrdesSaga
} from './order';

export function* watchAuth() {
    //yield basically say execute this and wait for it to finish

    yield all([
        takeEvery(actinTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actinTypes.AUTH_CHECK_TIMEOUTH, checkAuthTimeoutSaga),
        takeEvery(actinTypes.AUTH_USER, authUserSaga),
        takeEvery(actinTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);

}

export function* watchBurgerBuilder() {
    yield takeEvery(actinTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    //takeLatest önceki işlemleri otamatik olarak durdurur ve sadece bu işi execute ettirir.
    yield takeLatest(actinTypes.PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(actinTypes.FETCH_ORDERS, fetchOrdesSaga);
}