let $ = require('jquery');
let dialog = require("electron").remote.dialog;
let fs = require("fs");

$(document).ready(function(){
    let db;
    let lsc;
    let sheetsDB = [];
//------------------------------------------------------------Upper Column----------------------------------------------------------------------------//    
    /* Click Event Created on File and Home class */
    $(".file, .home").on("click", function(){
        clickSound();
        let menu = $(this).text();
        if(menu == "File"){
            $(".file").addClass("active");
            $(".file-menu-options").removeClass("hide");
            $(".home").removeClass("active");
            $(".home-menu-options").addClass("hide");
        }else{
            //Menu ==> Home
            $(".file").removeClass("active");
            $(".file-menu-options").addClass("hide");
            $(".home").addClass("active");
            $(".home-menu-options").removeClass("hide");
        }
    })

    /* New-Open-Save */
    $(".new").on("click", function(){
        //UI and DB New
        initDb();
        initUi();
    });
    $(".open").on("click", function(){
        let path = dialog.showOpenDialogSync();
        console.log(path);
        let openedDb = fs.readFileSync(path[0]);
        db = JSON.parse(openedDb);
        setUI();
    });
    $(".save").on("click", function(){
        let path = dialog.showSaveDialogSync();
        if(path){
            fs.writeFileSync(path, JSON.stringify(db));
            alert("File Saved Successfully");
        }else{
            alert("File Not Saved");
        }
    });
    /* Print Command */
    $(".print").on("click", function(){
        window.print();
    });
    /* copy Command */
    $(".copy").on("click", function(){
        
    });
    /* paste Command */
    $(".paste").on("click", function(){
        
    });
    /* cut Command */
    $(".cut").on("click", function(){
        
    });
    /* insert Command */
    $(".insert").on("click", function(){
        
    });
    /* sticky-notes Command */
    $(".sticky-notes").on("click", function(){
        
    });

    /*Click Event Created on cell Class*/
    $(".cell").on("click", function(){
        /* complete div aa jata hai uth ke 'this' me */
        console.log(this);        
        let rowId = Number($(this).attr("rowId"));
        let colId = Number($(this).attr("colId"));
        let cellObject = db[rowId][colId];
        $("#formula").val(cellObject.formula);
        let address = String.fromCharCode(65+colId) + (rowId + 1) + "";
        $("#address").val(address);
        /* Yha tk address wale column me name of cell show hoga */
    })
    /* Blur Event Created on cell Class */
    $(".cell").on("blur", function(){
        lsc = this;
        let rowId = $(this).attr("rowId");
        let colId = $(this).attr("colId");
        let cellObject = db[rowId][colId];
        let value = $(this).text();
        if( value != cellObject.value ){
            cellObject.value = value;
            //when cell is dependent on formula and then a value is given to that cell from Ui then existing formula should be deleted
            deleteFormula(cellObject);
            updateChildrens(cellObject);
        }
        //console.log(db);
    });
    /* Blur Event Created on formula Id */
    $("#formula").on("blur", function(){
        let formula = $(this).val();
        if(formula){
        let rowId = $(lsc).attr("rowId");
        let colId = $(lsc).attr("colId");
        let cellObject = db[rowId][colId];
        if(cellObject.formula != formula){

            deleteFormula(cellObject);
            let value = solveFormula(formula, cellObject);
            cellObject.value = value;    //value update
            cellObject.formula = formula;    // formula update
            $(lsc).text(value);             //UI Update
            updateChildrens(cellObject);
        }
      }
    });
    /* Scroll Event Created on Content class */
    $(".content").on("scroll", function(){
         
        let top = $(this).scrollTop();
        let left = $(this).scrollLeft();
        // console.log(top, left);
        $(".top-row , .top-left-cell").css("top", top + "px");
        $(".left-col , .top-left-cell").css("left", left + "px");
    });
    /* KeyUp Event Created on cell class */
    $(".cell").on("keyup", function(){
        let height = $(this).height();
        let id = $(this).attr("rowid");
        $(`.left-col-cell[cellid=${id}]`).height(height);
    });

//-----------------------------------------------------------Text Features-------------------------------------------------------------------------//    
    
    /* Font-select */
    $("#font-select").on("change", function(){
        let fontSelect = $(this).val();
        let rowid = $(lsc).attr("rowid");
        let colid = $(lsc).attr("colid");
        let cellObject = db[rowid][colid];
        $(lsc).css("font-family", fontSelect)
    })
    /* Font-Styles (Bold-Underline-Italic) */
    $(".font-styles button").on("click", function(){
        let button = $(this).text();
        console.log(`clicked on ${button}`);
        let rowid = $(lsc).attr("rowid");
        let colid = $(lsc).attr("colid");
        let cellObject = db[rowid][colid];
        if(button == "B"){
            //Bold ho to bold remove ho jaye
            $(lsc).css("font-weight", cellObject.fontStyles.bold ? "normal"  : "bold" );    //UI update
            cellObject.fontStyles.bold = !cellObject.fontStyles.bold;                        //DB update
        }else if(button == "U"){
            $(lsc).css("text-decoration", cellObject.fontStyles.underline ? "none" : "underline");
            cellObject.fontStyles.underline = !cellObject.fontStyles.underline;
        }else if(button == "I"){
            $(lsc).css("font-style", cellObject.fontStyles.italic ? "normal" : "italic" );
            cellObject.fontStyles.italic = !cellObject.fontStyles.italic;
        }
    });
    /* font-Size */
    $("#font-size").on("change", function(){
        let fontSize = $(this).val();
        let rowid = $(lsc).attr("rowid");
        let colid = $(lsc).attr("colid");
        let cellObject = db[rowid][colid];
        $(lsc).css("font-size", fontSize + "px");
    });
    /* font-Color */
    $("#cell-font-color").on("change",function(){
        // cell ka font color change hojana chahie
        let color = $(this).val();
        console.log(color);
        let rowId = $(lsc).attr("rowid");
        let colId = $(lsc).attr("colid");
        let cellObject = db[rowId][colId];
        $(lsc).css("color",color);
        
        cellObject.fontColor = color;
    });
    $("#cell-color").on("change",function(){
        let color = $(this).val();
        console.log(color);
        $(lsc).css("background", color);
    });
    /* Font-Alignment (Left-Center-Right) */
    $(".font-alignment button").on("click", function(){
        let button = $(this).text();
        console.log(`clicked on ${button}`);
        let rowid = $(lsc).attr("rowid");
        let colid = $(lsc).attr("colid");
        let cellObject = db[rowid][colid];
        if(button == "L"){
            $(lsc).css("text-align", "left");
            cellObject.fontAlignment = "left";
        }else if(button == "C"){
            $(lsc).css("text-align", "center");
            cellObject.fontAlignment = "center";
        }else{
            $(lsc).css("text-align", "right");
            cellObject.fontAlignment = "right";
        }
    });
    

//------------------------------------------------------------Sheets-----------------------------------------------------------------------------//    

    /* Sheets-Add */
    let sheetId = 0;
    $(".sheet-add").on("click", function(){
        $(".active-sheet").removeClass("active-sheet");
        sheetId++;
        let sheet = `<div class="sheet active-sheet" sid="${sheetId}">Sheet ${sheetId+1}</div>`;
        $(".sheets-list").append(sheet);
        $(".active-sheet").on("click", function (){
            if(!$(this).hasClass("active-sheet")){
              $(".active-sheet").removeClass("active-sheet");
              $(this).addClass("active-sheet");
               // db change hona chahie
              let sheetId = $(this).attr("sid");
              db = sheetsDB[sheetId];
              // ui set hona chahe
              setUI();
            }
          });
        initDb();
        initUi();
        console.log(sheetsDB);
    });
    $(".sheet").on("click", function(){
        if(!($(this).hasClass("active-sheet"))){
            $(".active-sheet").removeClass("active-sheet");
            $(this).addClass("active-sheet");             //resolve error of sheet 1 active-class
            let sheetId = $(this).attr("sid");
            db = sheetsDB[sheetId];
            setUI();
        }
    });

//------------------------------------------------------------All Functions--------------------------------------------------------------------// 
    function deleteFormula(cellObject){
        $("#formula").val("");
        cellObject.formula = "";
        for(let i = 0; i < cellObject.parents.length; i++){
            //A1
            let { rowId, colId } = getRowIdColIdFromAddress(cellObject.parents[i]);
            let parentCellObject = db[rowId][colId];
            let childrensOfParents = parentCellObject.childrens;
            //[ "", "", "B1", "" ]
            let filteredChildrens = childrensOfParents.filter( function(child){
                    return child != cellObject.name;
            });
            parentCellObject.childrens = filteredChildrens;
        }
        cellObject.parents = [];
    }
    function updateChildrens(cellObject){
        //[ "C1", "B1", "Z1" ]
        for(let i = 0; i < cellObject.childrens.length; i++){
            let { rowId, colId } = getRowIdColIdFromAddress(cellObject.childrens[i]);
            let childrenCellObject = db[rowId][colId];
            let value = solveFormula(childrenCellObject.formula);
            childrenCellObject.value = value;
            // UI update =>>>> div[rowId="0"][colId="1"];
            $(`div[rowid=${rowId}][colid=${colId}]`).text(value);
            updateChildrens(childrenCellObject);
        }
    }
    function solveFormula(formula, selfCellObject){
        /* ( A1 + A2 ) */
        let fComps = formula.split(" ");
        // [ "(", "A1", "+", "A2", ")" ]
        for(let i = 0; i < fComps.length; i++){
            let comp = fComps[i];
            let firstCharacter = comp[0];
            if(( firstCharacter >= "A" && firstCharacter <= "Z" )|| (firstCharacter >= "a" && firstCharacter <= "z" )){
                
                    let { rowId, colId } = getRowIdColIdFromAddress(comp);
                    let cellObject = db[rowId][colId];        //A1
                    if(selfCellObject){
                        //Add Self to childrens only first time
                        cellObject.childrens.push(selfCellObject.name); 
                        //Add Parents
                        selfCellObject.parents.push(cellObject.name);
                    }
                    let value = cellObject.value;
                    formula = formula.replace( comp, value );  // ( 10 + 20 )
            }
        }
        let value = eval(formula);
        return value;
    }
    function getRowIdColIdFromAddress(address){
        let colId = address.charCodeAt(0) <= 90 ? address.charCodeAt(0) - 65 : address.charCodeAt(0) - 97;
        let rowId = Number(address.substring(1)) - 1;
        return {
            rowId : rowId,
            colId : colId
        }
    }
    function clickSound(){
        const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatpellet.ogg");
        audio.play();
    }
    function setUI(){
        for(let i = 0; i < 100; i++){
            for(let j = 0; j < 26; j++){
                let cellObject = db[i][j];
                $(`div[rowid="${i}"][colid="${j}"]`).text(cellObject.value);
                $(`div[rowid="${i}"][colid="${j}"]`).css("font-weight", cellObject.fontStyles.bold ? "bold" : "normal");
                $(`div[rowid="${i}"][colid="${j}"]`).css("font-style", cellObject.fontStyles.italic ? "italic" : "normal");
                $(`div[rowid="${i}"][colid="${j}"]`).css("text-decoration", cellObject.fontStyles.underline ? "underline" : "none");
                $(`div[rowid="${i}"][colid="${j}"]`).css("text-align", cellObject.fontAlignment);
                $(`div[rowid="${i}"][colid="${j}"]`).css("font-size", cellObject.fontSize + "px");
                $(`div[rowid="${i}"][colid="${j}"]`).css("color", cellObject.fontColor);
                $(`div[rowid="${i}"][colid="${j}"]`).css("background", cellObject.fontBackground); 
            }
        }
    }
    function initUi(){
    /*    for(let i = 0; i < 100; i++){
            for(let j = 0; j < 26; j++){
                let cell = $(`div[rowid="${i}"][colid="${j}"]`);
                cell.text("");
                //cell.removeAttr("style");
            }
        }  */
        let cells = $(".cell");
        for(let i = 0; i < cells.length; i++){
            $(cells[i]).html("");
            $(cells[i]).removeAttr("style");
        }
    }
    function initDb(){
        db = [];
        for(let i = 0; i < 100; i++){
            let row = [];
            for(let j = 0; j < 26; j++){
                let rowId = i + 1;
                let colId = String.fromCharCode(65+j);
                let name =  colId +  rowId + ""; 
                let cellObject = {
                    name : name,
                    value : "" ,
                    formula : "",
                    childrens : [],
                    parents : [],
                    fontStyles : { bold : false, italic : false, underline : false},
                    fontAlignment : "left",
                    fontSize : "16",
                    fontColor : "black",
                    fontBackground : "white",
                    fontSelect : "arial"
                }
                row.push(cellObject);
            }   
            db.push(row);
        }
        sheetsDB.push(db);
    }
    initDb();
})