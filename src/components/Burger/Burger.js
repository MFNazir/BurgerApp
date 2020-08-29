import React from 'react'; 
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //console.log(props.ingredients); //gtes you object from Burger Builder
    //console.log( Object.keys(props.ingredients)); //makes arrays of the object

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => { // this gives [] of keys ["salad", "cheese", "tikki", "tanduri"]
        
        //console.log(igKey); //this gives you for example salad or like every element of the array
        //console.log(props.ingredients[igKey]); //helps determine the size of the Array below. for example salad would props.ingredient[salad] = 1

        return [...Array(props.ingredients[igKey])].map((_,i) => {

            //return [...Array(props.ingredients[igKey])].map((_,i) => {
            //This code makes an array of "undefined" that is calculated by determing the value from a key. 
            //gives quantity of each [] element ...salad, cheese...etc.... How? Key, Value Pair...
            //you provide key [igKey] and it gives value ...for ex: cheese: 4, where cheese is key and 4 is value
            //So  now when we plug in our 'salad' number we get the array ['undefined']. For 'meat' we would get ['undefined', 'undefined']. 

            //.map((_, i) => { 
            //So now we have, for the ingredient loop that we are on, an array of undefined. On THAT array we call a second map function. 
            //Here we already know the value/element will be undefined so we can throw that away (that's the underscore). 
            //What we want to know is the index which is the i


            //console.log(igKey); this will be used to assign the type which will scan the switch statement in BI
            //console.log(igKey + i); //to give unique name to each key....chicken01,chicken 02 etc...

            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })

    .reduce((arr, el) => { //allows us to see the content of an array

        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {

            transformedIngredients = <p>Please Start Adding Ingredients</p>        
    }

    //console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;