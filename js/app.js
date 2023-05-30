'use strict';


// Global Drinks Array 
let drinksArray = [];

//Constructor
function Coffee(coffeName, ingredients, image, isHot) {
    this.coffeName = coffeName;
    this.ingredients = ingredients;
    this.image = image;
    this.isHot = isHot;
    this.price = 0;
    drinksArray.push(this);
};

//function to return random number between min and max values
function genrateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// prototype for calculate the price using the genrateRandom() function
Coffee.prototype.calculatePrice = function (min, max) {
    this.price = genrateRandom(min, max);
};

// section To add the cards on it
let drinks = document.getElementById('drinks');

// prototype to Render the instance created by the user as a cards. 
// Coffee.prototype.render = function () {

//     //create a div for each instance(card)
//     let drinkDiv = document.createElement("div");
//     drinkDiv.classList.add("card")
//     drinks.appendChild(drinkDiv);

//     // create image element
//     let coffeeImage = document.createElement('img');
//     coffeeImage.setAttribute('src', this.image);
//     drinkDiv.appendChild(coffeeImage);

//     //create div for the content of the instance(name,ingredients,price,Hot/Cold)
//     let contentDiv = document.createElement("div");
//     contentDiv.classList.add("container");
//     drinkDiv.appendChild(contentDiv);

//     // create  h3 element for the Drink name
//     let coffeName = document.createElement('h3');
//     coffeName.textContent = this.coffeName;
//     contentDiv.appendChild(coffeName);

//     // create  ul element for the Drink ingredients
//     let ingredients = document.createElement('ul');
//     for (let i = 0; i < this.ingredients.length; i++) {
//         let Ele = document.createElement('li');
//         ingredients.appendChild(Ele);
//         Ele.textContent = this.ingredients[i];
//     }
//     contentDiv.appendChild(ingredients);

//     // create p element for the Drink Cold/Hot and price
//     let isHot = document.createElement('p');
//     contentDiv.appendChild(isHot);
//     isHot.textContent = `${this.isHot ? 'Hot drink' : 'Cold drink'} ${this.price} $`;

//     //create a line element between the cards
//     let line = document.createElement("hr")
//     drinkDiv.appendChild(line);

// }

function render() {/////////////////////////////////////////////////////////////////////////////////// 11 11 11 11 11 11 

    drinks.innerHTML = ''; // solve the duplicate /////////////////////////////////////////////////// 13 13 13 13 13 
    for (let i = 0; i < drinksArray.length; i++) {
        //create a div for each instance(card)
        let drinkDiv = document.createElement("div");
        drinkDiv.classList.add("card")
        drinks.appendChild(drinkDiv);

        // create image element
        let coffeeImage = document.createElement('img');
        coffeeImage.setAttribute('src', drinksArray[i].image);
        drinkDiv.appendChild(coffeeImage);

        //create div for the content of the instance(name,ingredients,price,Hot/Cold)
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("container");
        drinkDiv.appendChild(contentDiv);

        // create  h3 element for the Drink name
        let coffeName = document.createElement('h3');
        coffeName.textContent = drinksArray[i].coffeName;
        contentDiv.appendChild(coffeName);

        // create  ul element for the Drink ingredients
        let ingredients = document.createElement('ul');
        for (let j = 0; j < drinksArray[i].ingredients.length; j++) {
            let Ele = document.createElement('li');
            ingredients.appendChild(Ele);
            Ele.textContent = drinksArray[i].ingredients[j];
        }
        contentDiv.appendChild(ingredients);

        // create p element for the Drink Cold/Hot and price
        let isHot = document.createElement('p');
        contentDiv.appendChild(isHot);
        isHot.textContent = `${drinksArray[i].isHot ? 'Hot drink' : 'Cold drink'} ${drinksArray[i].price} $`;

        //create a line element between the cards
        let line = document.createElement("hr")
        drinkDiv.appendChild(line);

    }
}

// Get the Form element
let saveValues = document.getElementById('drinkForm');
// Add a listener for the Form 
saveValues.addEventListener('submit', handler)

// Handler to collect the data from the user. 
function handler(e) {
    e.preventDefault();
    let coffeeName = e.target.coffee.value;
    let ingredients = e.target.ingredients.value.split(',');//split: to convert the string to the array. 
    let coffeeImage = e.target.image.value;
    let isHot = e.target.hot.checked;

    //create a coffee instance
    let drink = new Coffee(coffeeName, ingredients, coffeeImage, isHot);
    // calculate the price for the coffee
    drink.calculatePrice(2, 10);
    //render the coffee instance as a card
    //drink.render();

    /* 
    // Object before save it to LS
    console.log("the Object before store into LS ",drinksArray)

    //Convert JS to JSON 
    let jsonObj = JSON.stringify(drinksArray);/////////////////////////////////////////////////////////////////  66666666666666666
    // Save the Object to the LS 
    window.localStorage.setItem("drinks", jsonObj);/////////////////////////////////////////////////////////////  55555555555555555
    */
    storeIntoLocalStorage();
    /*
      // Read the object From LS
      let objectLS = window.localStorage.getItem("drinks");
      let jsObj = JSON.parse(objectLS);
      console.log("the Object after read from LS ", jsObj);
    */
    //readFromLocalStorage(); /////////////////////////////////// Don not read here .. 

    // solve render the new added item ///////////////////////////////////////////////////////////////////// 12 12 12 12 12 
    render();

    //
    renderTable();

};

function storeIntoLocalStorage() {////////////////////////////////////////////////////////////////////////  9999999999999999999
    // Object before save it to LS
    console.log("the Array before store into LS ", drinksArray)

    //Convert JS to JSON 
    let jsonArray = JSON.stringify(drinksArray);
    // Save the Object to the LS 
    window.localStorage.setItem("drinks", jsonArray);

}

function readFromLocalStorage() {
    // Read the object From LS
    let objectLS = window.localStorage.getItem("drinks");
    let jsArray = JSON.parse(objectLS);
    console.log("the Array after read from LS ", jsArray);

    if (jsArray != null) {   /////////////////////////////////////////////////////////////////  14 14 14 14 14 14 
        // drinksArray = jsArray;
        // console.log("the Drinks Array after read from LS ", drinksArray);

        for (let i = 0; i < jsArray.length ; i++) {    /////////////////////////////////////////// 15 15 15 15 15 
            // Re-instantiation 
            let drink = new Coffee(jsArray[i].coffeName,jsArray[i].ingredients,jsArray[i].image,jsArray[i].isHot);
            drink.price = jsArray[i].price;
        }
         console.log("the Drinks Array after read from LS and re-instantiation ", drinksArray);

    }


}

let tableSection = document.getElementById("table");

 function renderTable(){
    tableSection.innerHTML = '';
    let table = document.createElement("table");
    tableSection.appendChild(table);
////////////////////////////////////////// First Row 
    let rowHeader = document.createElement("tr");
    table.appendChild(rowHeader);

    let header1 = document.createElement("th");
    rowHeader.appendChild(header1);
    header1.textContent = "Drink Name";

    let header2 = document.createElement("th");
    rowHeader.appendChild(header2);
    header2.textContent = "Drink Price";
//////////////////////////////////////////  Rows

    for(let i=0 ; i< drinksArray.length ; i++){
        let rowHeader = document.createElement("tr");
        table.appendChild(rowHeader);
    
        let header1 = document.createElement("td");
        rowHeader.appendChild(header1);
        header1.textContent = drinksArray[i].coffeName;
    
        let header2 = document.createElement("td");
        rowHeader.appendChild(header2);
        header2.textContent = drinksArray[i].price;
    }



 }
readFromLocalStorage();/////////////////////////////////////////////////////////////////////////////////// 10 10 10 10 10 10 10 
render();

renderTable();