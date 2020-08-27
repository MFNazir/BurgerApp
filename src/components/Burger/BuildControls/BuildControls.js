import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';



//array of controls
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},

];

const buildControls = (props) => (

    <div className={classes.BuildControls}> 

        {controls.map(ctrl => (
            
            <BuildControl key={ctrl.label} label={ctrl.label} /> //typr will come later

        ))}

    </div>
);


export default buildControls;