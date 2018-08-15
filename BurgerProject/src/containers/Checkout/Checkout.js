import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query) {
            // ['salad','1']
            ingredients[param[0]] = +param[1];//param[1]'i number'a convert etmek için plus ekledik
        }

        this.setState({
            ingredients: ingredients
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let checkoutSummary = <Spinner />;

        if (this.state.ingredients != null) {
            checkoutSummary = (
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            );
        }

        return (
            <div>
                {checkoutSummary}
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;