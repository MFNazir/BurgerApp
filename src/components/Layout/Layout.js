import React from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css';

//make sure your Layout.js doesn't consist of curly brackets as it is returning some JSX
//Example:
/** const person = ( props ) => {
 
    return (
        //<div className="Person" style={style}>
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};*/
const layout = (props) => (
    <Aux>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </Aux>
);

export default layout;