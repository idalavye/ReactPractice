import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        /**
         * @event.preventDefault()
         * Description: If this method is called, the default action of the event will not be triggered.
         */

        /**
         * form elemanın default özelliği sunucuya bir istek göndermesidir. Bunu yaparken ise sayfayı reload yapar
         * bunu yapmasını istemessek yukarıdaki şekilde tanımlayabiliriz.
         */
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({
            loading: true
        });

        const order = {
            ingrediants: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'İbrahim',
                address: {
                    street: 'Test Street 1',
                    zipCode: 43500,
                    country: 'Turkiye'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest' //delivery=teslim
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false
                });

                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            });

    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type='text' name="name" placeholder="Your Name" />
                <input className={classes.Input} type='email' name="email" placeholder="Your Mail" />
                <input className={classes.Input} type='text' name="street" placeholder="Street" />
                <input className={classes.Input} type='text' name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;