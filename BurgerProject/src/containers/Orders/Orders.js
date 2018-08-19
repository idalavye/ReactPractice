import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
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
                        id:keys
                    });
                }

                this.setState({
                    loading: false,
                    orders:fetchedOrders
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let orders = null;

        if(this.state.orders.length === 0){
            orders= <Spinner />
        }else{
            orders = this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingrediants}
                    price={order.price}/>
            ));
        }

        return (
            <div>
                {orders}           
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);