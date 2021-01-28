  
// main function // import // include
// compile => top to down , left to right
// c++ => cout<<"Hey i am new to coding !!"<<endl;
// java => System.out.println("Hello World !!");
// javascript => console.log("Hey i am new to coding");

// console.log("Hey i am new to coding !!!");


// int float double char string bigint 
// number , boolean , undefined , null , object , string
// how to define / initialize a variable ??
// dynamically typed language
// let ,  const => ES6 => Ecma SCript 6
// block scoped variable
let a = 10;
// console.log(a);
let b = true;
let c = "Hey i am a string !!";
let d = 'hey i am a single quote string !!';
// console.log(b);
// console.log(c);
// console.log(d);

if(true){
    let val = "I am inside if block";   
}

let value; // by default it will take undefined as a data type

// console.log(value);

// const => block scoped variable => constant
const pi = 12;
// console.log(pi);


//1d 2d array

let names = [ "steve" , "tony" , "natasha" , [ "i am inside 2d" , true  , false , 20 ] ,  "bruce"  ];
// add at back
names.push("i am pushed");
// delete from back
names.pop();
// console.log(names);


// objects => key values pair
// keys will be always unique ,
// values can be duplicate
let obj = {
    name : "Steve Rogers",
    // place : "Queens", // update
    movies : ["cap america" , "winter soldier" , "civil war"],
    "Full Name":"Captain America"
}


// object values access => dot notation

// console.log(obj.movies);
let key = "place";
// console.log(obj.key);

// bracket notation
// console.log(obj[key]);

// console.log(obj["Full Name"]);


obj.place = "New York";

console.log(obj);