import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7 
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad : 0,
            cheese : 0,
            meat : 0,
            bacon : 0
        },
        totalPrice: 4,
        purchaseable: false
    }; 

    updatePurchaseableState = (ingredients) => {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        })
        .reduce((sum,ele) =>{
            return sum = sum + ele;
        },0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseableState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        if(updatedCount >=0) {
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
            this.updatePurchaseableState(updatedIngredients);
    }
    }

render(){
    const disableInfo = {
        ...this.state.ingredients
    };

    for(let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <=0 
    }

    return(
        <Aux>
            <Modal>
                <OrderSummary ingredients={this.state.ingredients} />
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientsAdded={this.addIngredientHandler}
            ingredientsRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            purchaseable={!this.state.purchaseable}
            price ={this.state.totalPrice}/>
        </Aux>
    );
  }
}
export default BurgerBuilder;

