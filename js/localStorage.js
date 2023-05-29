'use strict'; 

window.localStorage.setItem("gender","male");
window.localStorage.setItem("name","Mohammad");

let gender = window.localStorage.getItem("gender");
let userName = window.localStorage.getItem("name");
console.log(`The user ${userName} is ${gender}`);

let key1 = window.localStorage.key(0);
console.log(`The key ${key1}`)

window.localStorage.removeItem("name");

window.localStorage.clear();