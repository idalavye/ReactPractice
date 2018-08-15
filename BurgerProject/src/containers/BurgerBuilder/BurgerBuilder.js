import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxable';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    //ingrediants bir obje bir array değil
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false, //satın alınabilirlilik
        purchasing: false, //satın alma
        loading: false,
        error:false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error:true });
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];//returns 0,0,0,0
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = oldCount + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updateIngredients = {
            ...this.state.ingredients
        }

        if (oldCount <= 0) {
            return;
        }

        updateIngredients[type] = oldCount - 1;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');

        // this.setState({
        //     loading: true
        // });

        // const order = {
        //     ingrediants: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'İbrahim',
        //         address: {
        //             street: 'Test Street 1',
        //             zipCode: 43500,
        //             country: 'Turkiye'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest' //delivery=teslim
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     });

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Not Loading Ingredients..</p>: <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}></OrderSummary>;  
        }

        
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        //{salad : true, meat:false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);