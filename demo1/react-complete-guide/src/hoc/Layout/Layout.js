import React,{Component} from 'react';
import Aux from '../../hoc/Auxxx/Auxxx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

class Layout extends Component{

    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler=()=>{
       // const showSideDrawer=this.state.showSideDrawer;
        this.setState({showSideDrawer:false})
    }

    drawerToggleClicked=()=>{
        this.setState( (prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }
    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticate} clicked={()=>this.drawerToggleClicked()}/>
                <SideDrawer isAuth={this.props.isAuthenticate} open={this.state.showSideDrawer} closed={()=>this.sideDrawerClosedHandler()}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
};

const mapStatetoProps=state=>{
    return{
        isAuthenticate:state.auth.token !== null
    }
}

export default connect(mapStatetoProps,null)(Layout);