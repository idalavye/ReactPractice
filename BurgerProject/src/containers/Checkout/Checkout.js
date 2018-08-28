import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    /*
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query) {
            // ['salad','1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];//param[1]'i number'a convert etmek için plus ekledik
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }
    */

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let checkoutSummary = <Spinner />;

        if (this.props.ings != null) {
            checkoutSummary = (
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            );
        }   

        return (
            <div>
                {checkoutSummary}
                <Route
                    path={this.props.match.url + '/contact-data'}
                    /*redux kullanmadan
                    render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props} />
                    )} 
                    */
                    component={ContactData}
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ings:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);