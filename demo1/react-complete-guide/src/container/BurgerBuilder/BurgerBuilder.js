import React, {Component} from 'react';
import Aux from '../../hoc/Auxxx/Auxxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
            cheese:0,
            meat:0
        },
        totalPrice: 4 ,
        purchasable:false,
        purchasing:false
    }

    updatePurchasable=(ingredients)=>{
        // const ingredients={...this.state.ingredients};

        const sum=Object.keys(ingredients)
                    .map((igKey)=>{
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum+el;
                    },0);
        this.setState({purchasable:sum>0});
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
        this.updatePurchasable(updatedIngredients);
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
        this.updatePurchasable(updatedIngredients);
    }
   
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancleHandler=()=>{
        this.setState({purchasing:false});
    }
    ContinuePurchaseHandler=()=>{
        alert('You continue');
    }
    CancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }
    render(){
        const disableInfo={...this.state.ingredients};
        for(let i in disableInfo){
            disableInfo[i]=disableInfo[i]<=0;
        }
        return(
          
            <Aux>
                <Modal show={this.state.purchasing} Modalclosed={()=>this.purchaseCancleHandler()}
                       >
                    <OrderSummary ingredients={this.state.ingredients} currentPrice={this.state.totalPrice}
                    continuePurchaseHandler={()=>this.ContinuePurchaseHandler()}
                       cancelPurchaseHandler={()=>this.CancelPurchaseHandler()}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdd={(type)=>this.addIngredientHandler(type)}
                ingredientRemove={(type)=>this.removeIngredienthandler(type)}
                disabled={disableInfo}
                currentPrice={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={()=>this.purchaseHandler()}
                
                />
            </Aux>
            
        );
    }
}

export default BurgerBuilder;