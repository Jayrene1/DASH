$(document).ready(function() {
    datasetID = 2; // TODO set to user's dataset by checking the user model in sql
    var json;
    function getDataset() {
        $.get("/api/datasets/" + datasetID, function(data) {
          $("#sample-table-head").empty();
          $("#sample-table-body").empty();
          json = data.json_data;
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

    $("#create-graph").on("click", function() {
      
      var chart = new AxesChartProperties(
        $("input[name='type']:checked").val(),
        [],
        $("#x-option option:selected").text(),
        $("#y-option option:selected").text(),
        "#test-chart",
        false
      );

      for (var i = 0; i < json.length; i++) {
        var graphDataPoint = {};
        graphDataPoint[chart.config.xprop] = json[i][chart.config.xprop];
        graphDataPoint[chart.config.yprop] = json[i][chart.config.yprop];
        chart.data.push(graphDataPoint);
      }
      console.log(chart);
    });

    function CircleChartProperties(type, xprop, yprop, el){
      this.dimension = {radius: 400, width: 800, height: 800};
      this.config = {
        xprop: xprop,
        yprop: yprop,
        type: type,
        el: el
      };
      this.style = {
        backgroundColor: "2c2f33",
        colors: [
          "#f75e7e", "#fdbb2c", "#727df5", "24cd97", "#ab68fb", "#6bc1fb", "#fe501a", "fec41a", "	#00FFFF", "	#008080"
        ]
      };
    }  

    function AxesChartProperties(type, data, xprop, yprop, el, timeSeries){
      this.data = data;
      this.dimension = {
        margin: {top: 30, right: 30, bottom: 60, left: 60},
        width: 1200,
        height: 900,
      };
      this.config = {
        timeSeries: timeSeries,
        axisTicks: {x: 3, y: 5},
        xprop: xprop,
        yprop: yprop,
        type: type,
        el: el
      };
      this.style = {
        rotateXLabel: true, //only for line and bar
        rotateYLabel: false,
        backgroundColor: "#2c2f33",
        axis: {color: "#ffffff", opacity: 0.6, width: 3,  textSize: 8},
        line: {color: "#ffffff", width: 3}
      };
    }  
});