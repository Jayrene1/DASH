$(document).on('click',"#Load",function(){
    console.log("Test");
    getAsText();
});
function getAsText() {
    readFile = $("#file").prop('files')[0];
    var reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
};
function loaded(evt) {
    $("#loaded-data").children().remove();
    var fileString = evt.target.result;
    var lines = fileString.split('\r\n');
    parseData(lines);
};
function parseData(lines){

    var table = $("<table>");
    var thead = $("<thead>");
    var theadRow = $("<tr>");
    var tbody = $("<tbody>");

    var firstFive = [];
    for (var i=0; i<5; i++){
        firstFive.push(lines[i]);
    }

    var firstRow = firstFive[0].split(',');
    var columns = firstRow.length;

    for (var j=0; j<columns; j++){
        var headerLabel = $("<th>").attr("scope","col").text(firstRow[j]).appendTo(theadRow);
    }

    theadRow.appendTo(thead);
    thead.appendTo(table);

    for (var k=1; k<5; k++){
        var row = firstFive[k].split(',');
        var tbodyRow = $("<tr>");
        for (var l=0; l<columns; l++){
            var datum = $("<td>").text(row[l]).appendTo(tbodyRow);
        }
        tbodyRow.appendTo(tbody);
    }

    tbody.appendTo(table);
    table.appendTo("#loaded-data");

    loadDropDowns(firstRow);
};

function loadDropDowns(headers){
    var d1 = $('<select />').attr("id","xvalue");
    var d2 = $('<select />').attr("id","yvalue");
    for (var i = 0; i<headers.length; i++){
        $('<option />', {value: headers[i], text: i}).appendTo(d1);
        $('<option />', {value: headers[i], text: i}).appendTo(d2);
    }
    d1.appendTo('#dropdowns');
    d2.appendTo('#dropdowns');
};

$(document).on("click","#Build",function(){
    
});