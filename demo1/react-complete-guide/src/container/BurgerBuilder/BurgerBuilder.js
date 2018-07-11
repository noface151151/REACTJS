import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props);
    //     this.state=
    // }
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:2,
            meat:0
        },
        totalPrice: 4 
    }

     addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updateCounted=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updateCounted;
        const priceAddition=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    }
    removeIngredienthandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        let updateCounted=oldCount-1;
        if(updateCounted<0)
            updateCounted=0;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updateCounted;
        const priceAddition=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        let newPrice=oldPrice-priceAddition;
        if(newPrice<0)
            newPrice=0;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    }
   
    render(){
        const disableInfo={...this.state.ingredients};
        for(let i in disableInfo){
            disableInfo[i]=disableInfo[i]<=0;
        }
        console.log(disableInfo);
        return(
          
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdd={(type)=>this.addIngredientHandler(type)}
                ingredientRemove={(type)=>this.removeIngredienthandler(type)}
                disabled={disableInfo}
                currentPrice={this.state.totalPrice}
                />
            </Aux>
            
        );
    }
}

export default BurgerBuilder;