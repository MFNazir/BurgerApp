import React, { Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-9de03.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
    }

    updatePurchaseState(ingredients) {
        
        const sum = Object.keys(ingredients) //this gives you an array of keys of the ingredient state
         .map(igKey => {
                return ingredients[igKey]; //this will return an amount (value) for the selected key for example salad would return 0
         })
         .reduce((sum, el) => {
             return sum + el;
         }, 0); //zero is the starting number or the intial value for el
         this.setState({purchaseable: sum > 0}); //return would be true or false
         console.log(sum);
    }

    //alternative updatePurchaseState
    //const notPurchasable = Object.values(ingredients).every((e) => e === 0);
    //this.setState({ purchasable: !notPurchasable });

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; //need the old count
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; //this updates the specific type of meat
        const priceAddition = INGREDIENT_PRICES[type]; //this gets the specific ingrediant price from the global variable
        const oldPrice = this.state.totalPrice; //this gets the already created base price from the state
        const newPrice = oldPrice + priceAddition; //this gives you the new price 
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }); //updates the state
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; //need the old count
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; //this updates the specific type of meat
        const priceDeduction = INGREDIENT_PRICES[type]; //this gets the specific ingrediant price from the global variable
        const oldPrice = this.state.totalPrice; //this gets the already created base price from the state
        const newPrice = oldPrice - priceDeduction; //this gives you the new price 
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }); //updates the state
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
                // this.setState( { loading: true } );
                // const order = {
                //     ingredients: this.state.ingredients,
                //     price: this.state.totalPrice,
                //     customer: {
                //         name: 'Max Schwarzmüller',
                //         address: {
                //             street: 'Teststreet 1',
                //             zipCode: '41351',
                //             country: 'Germany'
                //         },
                //         email: 'test@test.com'
                //     },
                //     deliveryMethod: 'fastest'
                // }
                // axios.post( '/orders.json', order )
                //     .then( response => {
                //         this.setState( { loading: false, purchasing: false } );
                //     } )
                //     .catch( error => {
                //         this.setState( { loading: false, purchasing: false } );
                //     } );
                const queryParams = [];
                    for (let i in this.state.ingredients) {
                        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
                    }
                    const queryString = queryParams.join('&');
                    this.props.history.push({
                        pathname: '/checkout', //this sends you to the checkout page
                        search: '?' + queryString
                    });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        //{salad: true, meat: false....} the loop below will take type from BuildControls
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 //checks weather each key in the state has a value of ZERO or not
        }

        let orderSummary = null;

        let burger = <Spinner />


        if (this.state.ingredients) {

            burger =  ( 
                    <Aux>    
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                                ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disabledInfo}
                                price={this.state.totalPrice} 
                                purchaseable={this.state.purchaseable} 
                                ordered={this.purchaseHandler}/>
                    </Aux>
            );
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price={this.state.totalPrice}/>;
            }

            if (this.state.loading) {
                orderSummary = <Spinner />
            }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }
}

export default WithErrorHandler(BurgerBuilder, axios);