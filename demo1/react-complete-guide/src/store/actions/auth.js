import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId

    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAILD,
        error:error
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };

        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCwKmX-uDZ_ri4ZmDa-OTxSJmyOgd4QlYk';
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCwKmX-uDZ_ri4ZmDa-OTxSJmyOgd4QlYk'
        }
        //console.log(authData);
        axios.post(url,authData)
            .then(resp=>{
                console.log(resp);
                dispatch(authSuccess(resp.data.idToken,resp.data.localId));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err));
            })
    }
}