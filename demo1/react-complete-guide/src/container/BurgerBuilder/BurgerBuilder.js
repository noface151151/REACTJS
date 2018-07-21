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
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props);
    //     this.state=
    // }
    state={
        //ingredients:null,
       // totalPrice: 4 ,
      //  purchasable:false,
        purchasing:false
      //  loading:false,
      //  error:false
    }

    componentDidMount(){
        this.props.onInitIngredients();
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

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
        
    }
    purchaseCancleHandler=()=>{
        this.setState({purchasing:false});
    }
    CancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }
    ContinuePurchaseHandler=()=>{
        this.props.onInitPurchased()
        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo={...this.props.ings};
        for(let i in disableInfo){
            disableInfo[i]=disableInfo[i]<=0;
        }
        let orderSummary=null;
        let burger=this.props.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
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
                    isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} currentPrice={this.props.price}
            continuePurchaseHandler={()=>this.ContinuePurchaseHandler()}
               cancelPurchaseHandler={()=>this.CancelPurchaseHandler()}
            />
        }
        //  if(this.state.loading){
        //     orderSummary= <Spinner />;
        //}
        
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
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchased:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));