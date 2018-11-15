import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

function* logout(action) {
    /**
     * Bir işlem yield ile başlıyor ise o işlem tamamlanmadan bir sonraki satıra geçmiyecek demektir.
     * Yani asyncron bir işlem olsaydı cevap gelmeden işlem devam etmiyecektir.
     */
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expriratinDate');
    yield localStorage.removeItem('userId');

    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
}