import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHangler';
class Auth extends Component {

    state={
        controls: {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Mail address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
           
        },
        isSignup:true 
    }
    checkValidity(value,rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!==''  && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;

        }
        //console.log(isValid);
        return isValid;
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});

    }

    submitHandler=(event)=>{
        console.log(this.state.controls.email)
        event.preventDefault();
        
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            console.log()
            return {
                isSignup:!prevState.isSignup
            };
        })
    }

    render(){
        const formElementArray=[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        const form=formElementArray.map(formEle=>(
            <Input key={formEle.id} 
                        elementType={formEle.config.elementType} 
                        elementConfig={formEle.config.elementConfig} 
                        value={formEle.config.value}
                        changed={(event)=>this.inputChangedHandler(event,formEle.id)}
                        shouldValidate={formEle.config.validation}
                        touched={formEle.config.touched}
                        inValid={!formEle.config.valid} />
            
        ))
        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button buttonType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} buttonType="Danger">SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup))
    }
}

export default connect(null,mapDispatchToProps)(Auth);