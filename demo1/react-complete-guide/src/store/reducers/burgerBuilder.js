import * as actionType from '../actions/actionTypes';
import {
    updateObject
} from '../utillity';

const initialStata = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false

};

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const reducer = (state = initialStata, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            const amountUpdate = state.ingredients[action.ingredientName] + 1;
            const updatedIngredient={
                [action.ingredientName]:amountUpdate
            }
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
            const updateState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building:true
            }
            
            return updateObject(state, updateState);
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building:true
            };
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                    cheese: action.ingredients.cheese
                },
                totalPrice: 4,
                error: false,
                building:false
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;