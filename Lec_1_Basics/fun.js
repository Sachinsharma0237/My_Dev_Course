// function body
// high order function
function sayHi(name , fun){
    console.log(name + " says Hiii !!!");
    fun();
    return 10;
}
// function call
// sayHi();
// let val = sayHi();
// console.log(val);
// console.log(sayHi);
// let name = "Steve";
// let val = sayHi(name);
// console.log(val);

// varibales and functions same
// variables can be passed as parameter in a function
// functions can be passed as parameter in a function
// functions which accepts functions as a argument are known as high order functions
// functioin which are passed as parameter in a function are known as callback functions
// callback
let newFun = function(){
    console.log("I am a anonysmous function");
}

// newFun();
console.log(sayHi("Steve" , newFun));