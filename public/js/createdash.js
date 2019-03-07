$(document).ready(function() {
    datasetID = 2; // TODO set to user's dataset by checking the user model in sql

    function getDataset() {
        $.get("/api/datasets/" + datasetID, function(data) {
          $("#sample-table-head").empty();
          $("#sample-table-body").empty();
          var json = data.json_data;
          var columnNames = Object.keys(json[0]);
            
          for (var i = 0; i < columnNames.length; i++) {
            $th = $("<th>").text(columnNames[i]);
            $("#sample-table-head").append($th);
            $option = $("<option>").text(columnNames[i]);
            $option.appendTo("#x-option, #y-option");
          }
          
          if (json.length > 5) {
              for (var j = 0; j < 5; j++) {
                  displaySampleData();
              }
          } else {
            for (var j = 0; j < json.length; j++) {
                displaySampleData();
            }
          }

          function displaySampleData() {
              var $tr = $("<tr>");
              for (var prop in json[j]) {
                if (json[j].hasOwnProperty(prop)) {
                    var $td = $("<td>").text(json[j][prop]);
                    $td.appendTo($tr);
                }
              }
              $("#sample-table-body").append($tr);
          }
        });
      }
    getDataset();
});