import React, { Component } from 'react';
import firebaseApp from "./firebase/firebaseConfig";

class App extends Component {
  state = {  }

  componentDidMount(){


     // API call
    // get all documents
    firebaseApp.firestore().collection("Resume").get().then( allDocs =>{
      allDocs.forEach( doc =>{
        console.log(doc.id);
        console.log(doc.data());
      })
    })


    // firebaseApp.firestore().collection("Resume").doc("Kx4nEdEh5nHjpea7Y8n4").get().then( doc =>{
    //     console.log(doc.id);
    //     console.log(doc.data());
    // })

  }

  addData = () =>{
    console.log("Inside add Data");
    firebaseApp.firestore().collection("Resume").doc("Kx4nEdEh5nHjpea7Y8n4").update({
      ContactDetails : {
        Name : "Sachin Sharma",
        Phone : "9540360365",
        Email : "sachinsharma@test.com" 
      }
    }).then( ()=>{
      console.log("skin set !!!");
    } )
  }

  render() { 
    return ( <h1>
      <button onClick={this.addData}>Add me</button>
    </h1> );
  }
}
 
export default App;