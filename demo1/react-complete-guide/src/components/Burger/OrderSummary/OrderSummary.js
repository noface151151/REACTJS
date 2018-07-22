import React,{Component} from 'react';
import Aux from '../../../hoc/Auxxx/Auxxx';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    componentWillUpdate(){
    }

    render(){
        const ingredientSummary=Object.keys(this.props.ingredients) 
        .map((igKey,index)=>{
            return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}:{this.props.ingredients[igKey]} </span>
                </li>
            )
        });
        return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.currentPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={()=>this.props.cancelPurchaseHandler()}> CANCEL </Button>
            <Button buttonType="Success" clicked={()=>this.props.continuePurchaseHandler()}> CONTINUE </Button>
        </Aux>
        );
    }
}


export default OrderSummary;