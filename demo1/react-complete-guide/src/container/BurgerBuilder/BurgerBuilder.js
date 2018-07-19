import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxxx/Auxxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHangler';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props);
    //     this.state=
    // }
    state={
        //ingredients:null,
       // totalPrice: 4 ,
      //  purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(resp=>{
        //         this.setState({ingredients:resp.data});

        //     }).catch(error=>{
        //         this.setState({error:error});
        //     })
    }

    updatePurchasable=(ingredients)=>{
        const sum=Object.keys(ingredients)
                    .map((igKey)=>{
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum+el;
                    },0);
        return sum>0;
    }
    //  addIngredientHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     const updateCounted=oldCount+1;
    //     const updatedIngredients={...this.state.ingredients};
    //     updatedIngredients[type]=updateCounted;
    //     const priceAddition=INGREDIENT_PRICE[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=oldPrice+priceAddition;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchasable(updatedIngredients);
    // }
    // removeIngredienthandler=(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     let updateCounted=oldCount-1;
    //     if(updateCounted<0)
    //         updateCounted=0;
    //     const updatedIngredients={...this.state.ingredients};
    //     updatedIngredients[type]=updateCounted;
    //     const priceAddition=INGREDIENT_PRICE[type];
    //     const oldPrice=this.state.totalPrice;
    //     let newPrice=oldPrice-priceAddition;
    //     if(newPrice<0)
    //         newPrice=0;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchasable(updatedIngredients);
    // }
   
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancleHandler=()=>{
        this.setState({purchasing:false});
    }
    CancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }
    ContinuePurchaseHandler=()=>{
        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo={...this.props.ings};
        for(let i in disableInfo){
            disableInfo[i]=disableInfo[i]<=0;
        }
        let orderSummary=null;
        let burger=this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    ingredientAdd={this.props.onIngredientAdded}
                    ingredientRemove={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    currentPrice={this.props.price}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={()=>this.purchaseHandler()}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} currentPrice={this.props.price}
            continuePurchaseHandler={()=>this.ContinuePurchaseHandler()}
               cancelPurchaseHandler={()=>this.CancelPurchaseHandler()}
            />
        }
         if(this.state.loading){
            orderSummary= <Spinner />;
        }
        
        return(
          
            <Aux>
                <Modal show={this.state.purchasing} Modalclosed={()=>this.purchaseCancleHandler()}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));