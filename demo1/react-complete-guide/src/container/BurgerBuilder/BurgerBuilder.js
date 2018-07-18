import React, {Component} from 'react';
import Aux from '../../hoc/Auxxx/Auxxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHangler';

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
        ingredients:null,
        totalPrice: 4 ,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(resp=>{
                this.setState({ingredients:resp.data});

            }).catch(error=>{
                this.setState({error:error});
            })
    }

    updatePurchasable=(ingredients)=>{
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
       // alert('You continue');
    //    this.setState({loading:true});
    //    const order={
    //        ingredients:this.state.ingredients,
    //        price: this.state.totalPrice,
    //        customer:{
    //            name:'Nam Do',
    //            address:{
    //                street: 'Lac Long Quan',
    //                zipcode: '483934',
    //                country:'Viet Nam'
    //            },
    //            email:'dongocnam01@gmail.com',            
    //        },
    //        deliveryMethod:'fastest'
    //    }
    //    axios.post('/orders.json',order)
    //         .then(resp=>{
    //             console.log(resp);
    //            this.setState({loading:false,purchasing:false})

    //         })
    //         .catch(err=>{
    //             console.log(err);
    //             this.setState({loading:false,purchasing:false})
    //         });
    const queryParams=[];
    for(let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+ this.state.totalPrice)
    const queryString=queryParams.join('&');

    this.props.history.push({
        pathname:'/checkout',
        search:'?'+queryString
    });
    }
    CancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }
    render(){
        const disableInfo={...this.state.ingredients};
        for(let i in disableInfo){
            disableInfo[i]=disableInfo[i]<=0;
        }
        let orderSummary=null;
        let burger=this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
        if(this.state.ingredients){
            burger=(
                <Aux>
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
            orderSummary = <OrderSummary ingredients={this.state.ingredients} currentPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder,axios);