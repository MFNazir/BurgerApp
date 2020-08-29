import React, { Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseState(ingredients) {
        
        const sum = Object.keys(ingredients) //this gives you an array of keys of the ingredient state
         .map(igKey => {
                return ingredients[igKey]; //this will return an amount (value) for the selected key for example salad would return 0
         })
         .reduce((sum, el) => {
             return sum + el;
         }, 0); //zero is the starting number
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

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 //checks weather each key in the state has a value of ZERO or not
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} 
                    purchaseable={this.state.purchaseable} />


            </Aux>
        );

    }
}

export default BurgerBuilder;