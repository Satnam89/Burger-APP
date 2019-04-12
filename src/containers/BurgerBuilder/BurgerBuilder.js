import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7 
};

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }; 

    componentDidMount() {
        axios.get('https://react-my-burger-e1b84.firebaseio.com/ingredients.json')
        .then( response => this.setState( {ingredients: response.data} ))
    }

    updatePurchaseableState = (ingredients) => {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        })
        .reduce((sum,ele) =>{
            return sum = sum + ele;
        },0);
        this.setState({purchaseable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        // alert('You Continue!');
        this.setState( {loading:true} );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Satnam Singh',
                address: {
                    street: 'redpath',
                    zipCode: 'HEH2H1',
                    country: 'Canada' 
                },
                email:'brar90@gmail.com' 
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
        .then( response => this.setState( { loading:false, purchasing:false } ))
        .catch( error =>  this.setState( { loading:false, purchasing:false } ))
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

    let burger= <Spinner/>;
    let orderSummary= null;

    if(this.state.ingredients){
        burger= (<Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    ordered={this.purchaseHandler}
                    purchaseable={!this.state.purchaseable}
                    price ={this.state.totalPrice}/>
                </Aux>);
        orderSummary= <OrderSummary 
        ingredients={this.state.ingredients} 
        purchasedContinued={this.purchaseContinueHandler}
        purchasedCancelled={this.purchaseCancelHandler}
        price={this.state.totalPrice}/>
    }

    if(this.state.loading) {
        orderSummary= <Spinner/>
    }

    return(
        <Aux>
            <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
  }
}
export default BurgerBuilder;

