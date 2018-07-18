import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckOutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class CheckOut extends Component{
    state={
        ingredients:null,
        price:0
    }

    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};

        for(let param of query.entries()){
            if(param[0]==='price'){
                this.setState({price:param[1]})
            }else{
                ingredients[param[0]]=+param[1];
            }
           
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
                <Route path={this.props.match.path+'/contact-data'} 
                render={(props)=>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.price} {...props}/>)} /> 
            </div>
        )
    }
}

export default CheckOut;