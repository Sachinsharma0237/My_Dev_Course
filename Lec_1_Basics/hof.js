function getFirstName(fullName){
    // "Steve Rogers"
    fullName = fullName.split(" ");
    // [ "Steve" , "Rogers"  ];
    return fullName[0];
    }
    
    function getLastName(fullName){
       //"Steve Rogers"
       fullName = fullName.split(" ");
       return fullName[1]; 
    }
    
    
    function sayHi(fullName , fun){
        let name = fun(fullName);
        console.log(name);
    }
    
    
    
    sayHi("Steve Rogers" , getFirstName);
    sayHi("Tony Stark" , getLastName);