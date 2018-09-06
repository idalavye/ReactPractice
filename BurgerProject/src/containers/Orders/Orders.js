import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         //console.log(res.data);

        //         const fetchedOrders = [];
        //         /**
        //          * firebase'den gelen unique id'leri kaybetmemek için aşağıdaki şekilde bir yöntem kullandık.
        //          */
        //         for (let keys in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[keys],
        //                 id:keys
        //             });
        //         }

        //         this.setState({
        //             loading: false,
        //             orders:fetchedOrders
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({
        //             loading: false
        //         });
        //     });
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingrediants}
                    price={order.price} />
            ));
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));