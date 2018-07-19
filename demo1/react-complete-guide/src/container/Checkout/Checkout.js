import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckOutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class CheckOut extends Component{
    CheckoutCancelled=()=>{
        this.props.history.goBack();
    }
    CheckoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckOutSummary ingredients={this.props.ings}
                onCheckoutCancelled={()=>this.CheckoutCancelled()}
                onCheckoutContinued={()=>this.CheckoutContinued()}/>
                <Route path={this.props.match.path+'/contact-data'} 
                component={ContactData} /> 
            </div>
        )
    }
}

const mapStateToProps =state=>{
    return{
        ings:state.ingredients
    }
}
export default connect(mapStateToProps)(CheckOut);