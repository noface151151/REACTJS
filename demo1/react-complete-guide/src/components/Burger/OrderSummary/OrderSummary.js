import React from 'react';
import Aux from '../../../hoc/Auxxx';

const orderSummary =(props)=>{
    const ingredientSummary=Object.keys(props.ingredients) 
        .map((igKey,index)=>{
            return (
                <li key={igKey+index}>
                    <span style={{textTransform:'capitalize'}}>{igKey}: </span><p>{props.ingredients[igKey]}</p>
                </li>
            )
        });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}

export default orderSummary;