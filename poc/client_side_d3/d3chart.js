function D3Chart(data, config, style){
  if(data === undefined || config === undefined){  //TODO add style === undefined
    throw new Error("Missing an argument to D3Chart");
  }
  if(config.type === undefined){
    
  }
  this.xprop = config.xprop;
  this.yprop = config.yprop;
  this.type = config.type.trim().toLowerCase();
  this.el =config.el;

  switch( this.type ) {
    case "line":
      this.data = parseChartData(data, config);
      this.createChart = createLineChart;   //save the chart function
      //call the function which will both return the svg and save it to this.chart
      createLineChart(this.data, config, style, this); 
      break;
    case "bar":
      this.data = parseChartData(data, config);
      this.createChart = createBarChart;
      createBarChart(this.data, config, style, this);
      break;
    case "donut":
      this.data = parseChartData(data, config);
      this.createChart = createDonutChart;
      createDonutChart(this.data, config, style, this);
      break;
    case "pie":
      this.data = parseChartData(data, config);
      this.createChart = createPieChart;
      createPieChart(this.data, config, style, this);
      break;      
    default:
      throw new Error("config object is missing the type property");
  }
}

function parseChartData(data, config){
  var tempArr = [];
  for(var i = 0; i<data.length; i++){
    var dataObj = data[i];
    tempArr.push({
      xprop: dataObj[config.xprop], 
      yprop: dataObj[config.yprop]
    })
  }
  return tempArr;
}


function createLineChart(data, config, style, me){
  
  if(config.timeSeries){
      // data/time parsing
      var parseDate = d3.time.format("%Y-%d-%m").parse;
  }

  // set the ranges by graph dimension
  var x;
  if(config.timeSeries){
      x = d3.time.scale().range([0, config.width]);
  }else{
      x = d3.scale.linear().range([0, config.width]);
  }
  
  
  var y = d3.scale.linear().range([config.height, 0]);

  // define graph x/y axis
  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom")
  if(config.timeSeries){
      xAxis.ticks(5)
          .tickFormat(d3.time.format("%m-%d-%Y"))
  }else{
      xAxis.ticks(data.length);
  }

  var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(5);

  var valueline = d3.svg.line()
      .x(function(d) { return x(d.xprop); })
      .y(function(d) { return y(d.yprop); });        
      
  // Adds the svg canvas
  var svg = d3.select(config.el)
      .append("svg")
          .attr("width", config.width + config.margin.left + config.margin.right)
          .attr("height", config.height + config.margin.top + config.margin.bottom)
      .append("g")
          .attr("transform", 
              "translate(" + config.margin.left + "," + config.margin.top + ")");

  data.forEach(function(d) {
      if(config.timeSeries){
          var date = d.xprop.slice(0,10);
          d.xprop = parseDate(date); 
      }
      d.yprop = +d.yprop;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.xprop; }));
  y.domain([0, d3.max(data, function(d) { return d.yprop; })]);

  // Add the valueline path.
  svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(data));

  // Add the X Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(xAxis);

  // Add the Y Axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  me.chart = svg;
  return svg;
}

function createBarChart(data, config, style, me){
  var components = {};
  var parseDate;

  config.width = config.width  - config.margin.left - config.margin.right
  config.height = config.height  - config.margin.top - config.margin.bottom
  // config.width = config.width - config.margin.left - config.margin.right,
  // config.height = config.height - config.margin.top - config.margin.bottom;
  if(config.timeSeries){
      // data/time parsing
      parseDate = d3.time.format("%Y-%d-%m").parse;
  }


  components.x = d3.scale.ordinal()
      .rangeRoundBands([0, config.width], .1);
      
  components.y = d3.scale.linear()
      .range([config.height, 0]);

  // D3 Axis - renders a d3 scale in SVG
  components.xAxis = d3.svg.axis()
      .scale(components.x)
      .orient("bottom");
  if(config.timeSeries){
      components.xAxis.tickFormat(d3.time.format("%m-%d-%Y"));
  }


  components.yAxis = d3.svg.axis()
      .scale(components.y)
      .orient("left")
      .ticks(10);
  if(config.yDataVal && config.yDataVal === "%"){
      components.yAxis.tickFormat(d => Math.round(d*100/d3.max(data)) + "%");
  }else if(config.yDataVal && config.yDataVal === "%"){
      components.yAxis.tickFormat(d =>  "$" + d3.format(",.2f")(data) );
  }

  // create an SVG element (appended to body)
  // set size
  // add a "g" element (think "group")
  // annoying d3 gotcha - the 'svg' variable here is a 'g' element
  // the final line sets the transform on <g>, not on <svg>
  components.svg = d3.select(config.el).append("svg")
      .attr("width", config.width +config. margin.left + config.margin.right)
      .attr("height", config.height + config.margin.top + config.margin.bottom)
  .append("g")
      .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");

  components.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + config.height + ")")

  components.svg.append("g")
      .attr("class", "y axis")
      .append("text") // just for the title (ticks are automatic)
          .attr("transform", "rotate(-90)") // rotate the text!
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Value ($)");
  
  data.forEach(function(d) {
      if(config.timeSeries){
          var date = d.xprop.slice(0,10);
          d.xprop = parseDate(date); 
      }
      d.yprop = +d.yprop;
  });
  // measure the domain (for x, unique letters) (for y [0,maxFrequency])
  // now the scales are finished and usable
  components.x.domain(data.map(function(d) { return d.xprop; }));
  components.y.domain([0, d3.max(data, function(d) { return d.yprop; })]);

  // another g element, this time to move the origin to the bottom of the svg element
  // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
  //   for everything in the selection\
  // the end result is g populated with text and lines!
  if(data.length<5){
      components.svg.select('.x.axis').transition().duration(300).call(components.xAxis)
  }else{
      components.svg.select('.x.axis').transition().duration(300).call(components.xAxis)
          .selectAll("text")
              .attr("y", 0)
              .attr("x", 9)
              .attr("dy", ".35em")
              .attr("transform", "rotate(90)")
              .style("text-anchor", "start");
  }


  // same for yAxis but with more transform and a title
  components.svg.select(".y.axis").transition().duration(300).call(components.yAxis)

  // THIS IS THE ACTUAL WORK!
  var bars = components.svg.selectAll(".bar").data(data, function(d) { return d.xprop; }) // (data) is an array/iterable thing, second argument is an ID generator function

  bars.exit()
      .transition()
      .duration(300)
      .attr("y", components.y(0))
      .attr("height", config.height - components.y(0))
      .style('fill-opacity', 1e-6)
      .remove();

  // data that needs DOM = enter() (a set/selection, not an event!)
  bars.enter().append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("y", components.y(0))
      .attr("height", config.height - components.y(0));

  // the "UPDATE" set:
  bars.transition().duration(300).attr("x", function(d) { return components.x(d.xprop); }) // (d) is one item from the data array, x is the scale object from above
      .attr("width", components.x.rangeBand()) // constant, so no callback function(d) here
      .style("fill", "steelblue")
      .attr("y", function(d) { return components.y(d.yprop); })
      .attr("height", function(d) { return config.height - components.y(d.yprop); }); // flip the height, because y's domain is bot

  me.chart = components.svg;  
  return components.svg;  
}

function createPieChart(data, config, style, me) {
  var color = d3.scale.ordinal().range(config.colors);
      //var color = d3.scale.category10();

  var pie = d3.layout.pie()
    .value(function(d) {
      return d.yprop;
    })
    .sort(null);

  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(config.radius - 10);

  var labelArc = d3.svg.arc()
    .outerRadius(config.radius - 40)
    .innerRadius(config.radius - 40);      

  var svg = d3.select(config.el).append("svg")
    .attr("width", config.width)
    .attr("height", config.height)
    .append("g")
    .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")");

  var g = svg.selectAll('.arc')
    .data(pie(data))
    .attr('class', 'arc')
    .enter().append('g');

  g.append('path')
    .attr('d', arc)
    .style("fill", function (d) {
      return color(d.data.xprop);
    })
    .style("stroke", function (d) {
        return color(d.data.xprop);
    });

  g.append("text")
    .attr("transform", function (d) {
        return "translate(" + labelArc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.xprop;
    });
  me.chart = svg;  
  return svg;
}

function createDonutChart(data, config, style, me){
  var width = 800,
  height = 250,
  radius = Math.min(config.width, config.height) / 2;

  var color = d3.scale.ordinal()
      .range(config.colors);
  //var color = d3.scale.category10();

  var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
          return d.yprop;
      });

  var arc = d3.svg.arc()
      .outerRadius(config.radius - 10)
      .innerRadius(config.radius - 70);

  var labelArc = d3.svg.arc()
      .outerRadius(config.radius - 40)
      .innerRadius(config.radius - 40);

  var svg = d3.select(config.el).append("svg")
      .attr("width", config.width)
      .attr("height", config.height)
          .append("g")
          .attr("transform", "translate(" + config.width / 2 + 
                                      "," + config.height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
          return color(d.data.xprop);
      })
      .style("stroke", function (d) {
          return color(d.data.xprop);
      });

  g.append("text")
      .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function (d) {
          return d.data.xprop;
      });
  me.chart = svg;    
  return svg;
}


