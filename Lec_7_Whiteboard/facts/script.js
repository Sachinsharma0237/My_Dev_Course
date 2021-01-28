let addbtn = document.querySelector(".add");
let todos = document.querySelector(".todos");
let todoInput = document.querySelector("#todo");

addbtn.addEventListener("click", function(){
    let data = todoInput.value;
    if( data ){
        let newTodo = document.createElement("li");
        //newTodo.innerHTML = data;
        //todoInput.value = "";          
        let ptag = document.createElement("p");
        ptag.innerHTML = data;
        let close = document.createElement("button");
        close.innerHTML = "X";

        close.addEventListener("click", function(){
            close.parentElement.remove();
        })
        newTodo.append(ptag);
        newTodo.append(close);
        todos.append(newTodo); 
        todoInput.value = "";               
        /*<ul>
            <li>
                <p>data</p>
                <button>"X"</button>
            </li>
        </ul>   */
    }
})