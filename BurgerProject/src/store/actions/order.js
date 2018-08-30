import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

//Bu bir action creator bir actionType değil. Bu yüzden reducerda buna özel bir case
//tanımlamadık. Serverdan gelen sonuca göre bir actionType çağırıyoruz.
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                //console.log(res.data);

                const fetchedOrders = [];
                /**
                 * firebase'den gelen unique id'leri kaybetmemek için aşağıdaki şekilde bir yöntem kullandık.
                 */
                for (let keys in res.data) {
                    fetchedOrders.push({
                        ...res.data[keys],
                        id: keys
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}