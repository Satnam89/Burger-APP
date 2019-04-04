import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map ( cntrl => ( 
            <BuildControl 
                key ={cntrl.label} 
                label={cntrl.label} 
                added={() => props.ingredientsAdded(cntrl.type)}
                removed={() => props.ingredientsRemoved(cntrl.type)}
                disabled={props.disabled[cntrl.type]}
                price={props.price} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={props.purchaseable} 
            onClick={props.ordered}>Order Now
            </button>
    </div>
);

export default buildControls;