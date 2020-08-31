import React from 'react'; 

import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
    <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
    
    </li>
            )
    });
    return (

            <Aux>
                <h3>Your Order</h3>
                <p>The Burger That You Have Built: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue To Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>You Are Cancelled!!</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>You Shall Pass!!</Button>
            </Aux>
    );

};

export default orderSummary;