import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckOutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class CheckOut extends Component{
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            ingredients[param[0]]=+param[1];
        }
        this.setState({ingredients:ingredients});
    }
    CheckoutCancelled=()=>{
        this.props.history.goBack();
    }
    CheckoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckOutSummary ingredients={this.state.ingredients}
                onCheckoutCancelled={()=>this.CheckoutCancelled()}
                onCheckoutContinued={()=>this.CheckoutContinued()}/>
                <Route path={this.props.match.path+'/contact-data'} render={()=>(<ContactData ingredients={this.state.ingredients} />)} /> 
            </div>
        )
    }
}

export default CheckOut;