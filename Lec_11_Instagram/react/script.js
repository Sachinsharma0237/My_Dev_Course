let names = ["Rohit","Virat", "Shikhar", "ashwin" ];

function Hello(props){

    return <h1> Grettings from {props.name} an Indian Team Player </h1>

}

function BigHello(){
    return <React.Fragment>
    {
        names.map(function(name){
            return <Hello name={name} key={name}></Hello>
        })
    }
    </React.Fragment>
}
    // (  What to render , where to render  );
    ReactDOM.render( <BigHello />  , document.getElementById("root") );