import React,{Component} from 'react';
import Aux from '../../../../hoc/Auxiliary';
import Button from '../../../UI/Button/Button'


class OrderSummary extends Component {

    componentDidUpdate() {
        console.log("[OrderSummary] will update");
    }

    render(){
            const ingredientsSummary = Object.keys(this.props.ingredients)
                .map(igKey => {
                    return (
                        <li key={igKey}>
                            <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]} 
                        </li>)
                });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Success" clicked={this.props.purchasedContinued}>Continue</Button>
                <Button btnType="Danger" clicked={this.props.purchasedCancelled}>Cancel</Button>
            </Aux>
            )
    }
}

export default OrderSummary;