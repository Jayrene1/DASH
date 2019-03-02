var data1 = [
    {type: "Pizza", amnt: 45},
    {type: "Lasagna", amnt: 25},
    {type: "Spaghetti", amnt: 25},
    {type: "Spinach", amnt: 5}
];
var data2 = [
    {type: "Pizza", amnt: 50},
    {type: "Lasagna", amnt: 35},
    {type: "Spaghetti", amnt: 15},
    {type: "Spinach", amnt: 0}
];

var config = {
    radius: 160,
    width: 375,
    height: 375,
    colors: ['cc0033', 'a30052', 'cc0066', '9900cc', 'ff00cc', '993366'],
    el: "body"
  };
  
  var components = {};
  var key = function(d) { return d.data.type; };
  
  function render(data) {
    components.color = d3.scale.ordinal().range(config.colors);
        //var color = d3.scale.category10();

    components.pie = d3.layout.pie()
      .value(function(d) {
        return d.amnt;
      })
      .sort(null);
  
    components.arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(config.radius - 10);

    components.labelArc = d3.svg.arc()
      .outerRadius(config.radius - 40)
      .innerRadius(config.radius - 40);      
  
    components.svg = d3.select("body").append("svg")
      .attr("width", config.width)
      .attr("height", config.height)
      .append("g")
      .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")");
  
    var g = components.svg.selectAll('.arc')
      .data(components.pie(data))
      .attr('class', 'arc')
      .enter().append('g');
  
    g.append('path')
      .attr('d', components.arc)
      .style("fill", function (d) {
        return components.color(d.data.type);
      })
      .style("stroke", function (d) {
          return components.color(d.data.type);
      });

    g.append("text")
      .attr("transform", function (d) {
          return "translate(" + components.labelArc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function (d) {
          return d.data.type;
      });

  }
  
  function update(data) {
    // join
    var g = components.svg.selectAll(".arc")
        .data(components.pie(data), function(d){ return d.data.type; });

    // update
    g 
    .transition()
        .duration(1500)
        .attrTween("d", arcTween);

    // enter
    g.enter().append("path")
        .attr("class", "arc")
        .style("fill", function (d) {
            return components.color(d.data.type);
        })
        .style("stroke", function (d) {
            return components.color(d.data.type);
        })
        .attr("d", components.arc)
        .each(function(d) { this._current = d; });

    g.enter().append("text")
        .attr("transform", function (d) {
            return "translate(" + components.labelArc.centroid(d) + ")";  //was components.labelArc
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.type;
        });

    g.exit()
        .transition()
        .duration(myDuration)
        .attrTween("d", function(d, index) {
  
          var currentIndex = this._previous.data.region;
          var i = d3.interpolateObject(d,this._previous);
          return function(t) {
            return arc(i(t))
          }
  
        })
        .remove()

  }

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
        console.log(this.temp);
        var i = d3.interpolate(this.temp, a);
        this.temp = i(0);
        return function(t) {
          return arc(i(t));
        };
    }  


  render(data1)
 // update(data1);
  setTimeout(function(){
      update(data2);
  }, 5000);

// createPieChart(data1);
// setTimeout(function(){
//     updatePieChart(data2);
// }, 5000);