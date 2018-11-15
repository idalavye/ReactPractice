import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdesSaga(action) {
    yield put(actions.fetchOrderStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        /**
         * firebase'den gelen unique id'leri kaybetmemek için aşağıdaki şekilde bir yöntem kullandık.
         */
        for (let keys in response.data) {
            fetchedOrders.push({
                ...response.data[keys],
                id: keys
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }

}