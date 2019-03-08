function D3Chart(data, dimensions, config, style){
  if(data === undefined || dimensions === undefined || config === undefined || style === undefined){  //TODO add style === undefined
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
      cleanArgumentObjs(arguments, "line");
      this.data = parseChartData(data, config);
      this.createChart = createLineChart;   //save the chart function
      //call the function which will both return the svg and save it to this.chart
      createLineChart(this.data, dimensions, config, style, this); 
      break;
    case "bar":
      cleanArgumentObjs(arguments, "bar");
      this.data = parseChartData(data, config);
      this.createChart = createBarChart;
      createBarChart(this.data, dimensions, config, style, this);
      break;
    case "donut":
      cleanArgumentObjs(arguments, "donut");
      this.data = parseChartData(data, config);
      this.createChart = createDonutChart;
      createDonutChart(this.data, dimensions, config, style, this);
      break;
    case "pie":
      cleanArgumentObjs(arguments, "pie");
      this.data = parseChartData(data, config);
      this.createChart = createPieChart;
      createPieChart(this.data, dimensions, config, style, this);
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

function cleanArgumentObjs(arguments, type){
    var defaults = {
        circularDefaults: [
            [ 

            ],{
                radius: 160,
                width: 375,
                height: 375,
            },{                        
                // xprop: "type",
                // yprop: "amnt",
                // type: "donut",
                // el: "#donut"
            },{
                backgroundColor: "blue",
                colors: ['cc0033', 'a30052', 'cc0066', '9900cc', 'ff00cc', '993366']
            }
        ],
        axesDefaults: [
            [

            ],{
                margin: {top: 20, right: 20, bottom: 50, left: 50},
                width: 400,
                height: 400,
            },{
                //timeSeries: true,
                // xTickFunc: undefined,
                // yTickFunc: undefined,
                // xLabel: undefined,
                // yLabel: "Value ($)",
                axisTicks: {x: 4, y: 4},
                // xprop: "date",
                // yprop: "value",
                // type: "line",
                // el: "#timeline"
            },{
                backgroundColor: "white",
                axis: {color: "black", opacity: 1.0, width: 2,  textSize: 7},
                line: {color: "black", width: 2},
                bar: {color: "black"}
            }
        ],
        circularConfigReq: ["xprop", "yprop", "type", "el"],
        axesConfigReq: ["timeSeries", "xprop", "yprop", "type", "el"]
    }    
    type = type.trim().toLowerCase();
    switch(type) {
        case "pie":
        case "donut":
            cleanCircularChartsArgs(arguments, type, defaults);
            break;
        case "bar":
        case "line":
            cleanAxesChartsArgs(arguments, type, defaults);
            break;
        default:
            throw new Error("Invalid type passed to cleanArgumentObjs");
    }

    function cleanCircularChartsArgs(arguments, type, defaults){ //donut and pie
      for(var i = 1; i<arguments.length; i++){
          var obj = arguments[i];
          var circConfig = defaults.circularConfigReq;
          if(i===2){
              for(var j = 0; j<circConfig.length; j++){
                  if(obj[circConfig[j]] === undefined){
                      throw new Error("Config object missing required property: "+circConfig);
                  }
              }
          }
          var defaultsObj = defaults.circularDefaults[i];
          for(var prop in defaultsObj){
              var defObj = defaultsObj[prop];
              // if(prop === "line" && type !== "line"){
              //   continue;
              // }else if(prop === "bar" && type !== "bar"){
              //   continue;
              // }
              if(obj[prop]===undefined){
                  obj[prop] = defObj;
              }else if(obj[prop].constructor === Array && obj[prop].length < 1){
                  obj[prop] = defObj;  
              }else{
                  if(obj[prop].toString() === "[object Object]"){
                      var obj2 = obj[prop];
                      for(var prop2 in defObj){
                          if(obj2[prop2]===undefined){
                              obj2[prop2] = defObj[prop2];
                          }
                      } 
                  }
              }
          }
      }
    }; 

    function cleanAxesChartsArgs(arguments, type, defaults){ //line and bar
      for(var i = 1; i<arguments.length; i++){
        var obj = arguments[i];
        var axesConfig = defaults.axesConfigReq;
        if(i===2){
            for(var j = 0; j<axesConfig.length; j++){
                if(obj[axesConfig[j]] === undefined){
                    throw new Error("Config object missing required property: "+axesConfig);
                }
            }
        }
        var defaultsObj = defaults.axesDefaults[i];
        for(var prop in defaultsObj){
            var defObj = defaultsObj[prop];
            if(prop === "line" && type !== "line"){
              continue;
            }else if(prop === "bar" && type !== "bar"){
              continue;
            }
            if(obj[prop]===undefined){
                obj[prop] = defObj;
            }else{
              if(obj[prop].toString() === "[object Object]"){
                  var obj2 = obj[prop];
                  for(var prop2 in defObj){
                      if(obj2[prop2]===undefined){
                          obj2[prop2] = defObj[prop2];
                      }
                  } 
              }
            }
        }
      }       
    }; 

}

function createLineChart(data, dimensions, config, style, me){
  
  if(config.timeSeries){
      // data/time parsing
      var parseDate = d3.time.format("%Y-%d-%m").parse;
  }

  // set the ranges by graph dimension
  var x;
  if(config.timeSeries){
      x = d3.time.scale().range([0, dimensions.width]);
  }else{
      x = d3.scale.linear().range([0, dimensions.width]);
  }
  
  
  var y = d3.scale.linear().range([dimensions.height, 0]);

  // define graph x/y axis
//   var yAxis, 
//       xAxis = d3.svg.axis()
//         .scale(x)     
//         .orient("bottom");
//     if(config.timeSeries){
//         xAxis.tickFormat(d3.time.format("%m-%d-%Y"))
//     };

  // if(config && config.axisTicks){
  var axis = config.axisTicks;
  var yticks = axis.y; // ? axis.y : 4;
  var xticks = axis.x; // ? axis.x : 4;

  xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(xticks);
  if(config.timeSeries){
      xAxis.tickFormat(d3.time.format("%m-%d-%Y"))
  };

  yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(yticks);
  if(config && typeof config.yTickFunc === "function" ){
      yAxis.tickFormat(config.yTickFunc);
  }
  // }else{

  //   xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(4);
  //   if(config.timeSeries){
  //       xAxis.tickFormat(d3.time.format("%m-%d-%Y"))
  //   };

  //   yAxis = d3.svg.axis().scale(y)
  //       .orient("left").ticks(4);
  //   if(config && typeof config.yTickFunc === "function" ){
  //       yAxis.tickFormat(config.yTickFunc);
  //   }
  // }

  var valueline = d3.svg.line()
    .x(function(d) { return x(d.xprop); })
    .y(function(d) { return y(d.yprop); });
      
  // Adds the svg canvas
  var svg;
  //if(style && style.backgroundColor){
  var backgroundColor = style.backgroundColor;
  svg = d3.select(config.el)
      .append("svg")
          .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
          .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
          .style("background-color", backgroundColor)
      .append("g")
          .attr("transform", 
              "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
  // }else{
  //       svg = d3.select(config.el)
  //           .append("svg")
  //               .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
  //               .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
  //               .style("background-color", "white")
  //           .append("g")
  //               .attr("transform", 
  //                   "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
  // }

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

  // if(data.length<6){
  //   svg.select('.x.axis').call(xAxis)
  // }else{
  //   svg.select('.x.axis').call(xAxis)
  //     .selectAll("text")
  //         .attr("y", 0)
  //         .attr("x", 8)
  //         .attr("dy", ".35em")
  //         .attr("transform", "rotate(50)")
  //         .style("text-anchor", "start");
  // }

  // Add the valueline path.
  // if(style && style.line){
  var line = style.line;
  var color = line.color ? line.color : "black";
  var width = line.width ? line.width : 2; 

  svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(data))
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", width);  
  // }else{
  //   svg.append("path")
  //       .attr("class", "line")
  //       .attr("d", valueline(data))
  //       .attr("stroke", "black")
  //       .attr("fill", "none");     
  // }

  // Add the Y Axis
  var xaxis, yaxis;
  // if(style && style.axis){
  var axis = style.axis;
  var color = axis.color ? axis.color : "black";
  var opacity = axis.opacity ? axis.opacity : 1.0;
  var width = axis.width ? axis.width : 2;
  var fontSize = axis.textSize ? axis.textSize : 8
  var ytitle = config.yLabel ? config.yLabel : "";
  //xaxis
  xaxis = svg.append("g")
      .attr("class", "x axis")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", width)
      .attr("font-size", fontSize)
      .style("opacity", opacity)
      .attr("transform", "translate(0," + dimensions.height + ")")
      .call(xAxis);
  
  if(style.rotateXLabel){
    xaxis.selectAll("text")
      .attr("y", 0)
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("transform", "rotate(50)")
      .style("text-anchor", "start");
   }

      //yaxis
  yaxis = svg.append("g")
      .attr("class", "y axis")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", width)    
      .attr("font-size", fontSize)    
      .style("opacity", opacity)
      .call(yAxis)
      .append("text") // just for the title (ticks are automatic)
          //.attr("transform", "rotate(-90)") // rotate the text!
          //.attr("font-size", fontSize)
          .attr("x", -25)
          .attr("y", -15)
          .text(ytitle);
  // }else{
  //   svg.append("g")
  //       .attr("class", "x axis")
  //       .attr("fill", "none")
  //       .attr("stroke", "black")  
  //       .attr("stroke-width", 2)  
  //       .attr("font-size", 8)
  //       .style("opacity", 1.0)
  //       .attr("transform", "translate(0," + dimensions.height + ")")
  //       .call(xAxis)    

  //   svg.append("g")
  //       .attr("class", "y axis")
  //       .attr("fill", "none")
  //       .attr("stroke", "black")  
  //       .attr("stroke-width", 2)   
  //       .style("opacity", 1.0)
  //       .attr("font-size", 8)
  //       .call(yAxis)
  //       .append("text") // just for the title (ticks are automatic)
  //           //.attr("transform", "rotate(-90)") // rotate the text!
  //           //.attr("font-size", 8)
  //           .attr("x", -25)
  //           .attr("y", -15)
  //           .text(ytitle);
  // }
  if(style.rotateYLabel){
    yaxis.selectAll("text")
      .attr("y", 0)
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
   }      
//   function customXAxis(g) {
//     //https://gist.github.com/mbostock/3371592
//     var axis = style.axis;
//     g.call(xAxis);
//     g.select(".domain").attr("fill", "none");
//     if(axis.color){
//         g.select(".domain").style("stroke", style.axis.color)
//         g.selectAll(".tick line").attr("stroke", style.axis.color);
//         g.selectAll(".tick text").attr("stroke", style.axis.color)
//     }
//     if(axis.textSize){
//         g.selectAll(".tick text").attr("font-size", style.axis.textSize);
//     }
//   }     

//   function customYAxis(g) {
//     //https://gist.github.com/mbostock/3371592
//     var axis = style.axis;
//     g.call(yAxis);
//     g.select(".domain").attr("fill", "none");
//     if(axis.color){
//         g.select(".domain").style("stroke", style.axis.color)
//         g.selectAll(".tick line").attr("stroke", style.axis.color);
//         g.selectAll(".tick text").attr("stroke", style.axis.color)
//     }
//     if(axis.textSize){
//         g.selectAll(".tick text").attr("font-size", style.axis.textSize);
//     }
//   }  

  me.chart = svg;
  return svg;
}

function createBarChart(data, dimensions, config, style, me){
  var components = {};
  var parseDate;

  dimensions.width = dimensions.width  - dimensions.margin.left - dimensions.margin.right
  dimensions.height = dimensions.height  - dimensions.margin.top - dimensions.margin.bottom
  if(config.timeSeries){
      // data/time parsing
      parseDate = d3.time.format("%Y-%d-%m").parse;
  }


  components.x = d3.scale.ordinal()
      .rangeRoundBands([0, dimensions.width], .1);
      
  components.y = d3.scale.linear()
      .range([dimensions.height, 0]);

  // D3 Axis - renders a d3 scale in SVG
//   components.xAxis = d3.svg.axis()
//       .scale(components.x)
//       .orient("bottom");
//   if(config.timeSeries){
//       components.xAxis.tickFormat(d3.time.format("%m-%d-%Y"));
//   }

//  if(config && config.axisTicks){
  var axis = config.axisTicks;
  var yticks = axis.y; // ? axis.y : 4;
  var xticks = axis.x; // ? axis.x : 4;

  components.xAxis = d3.svg.axis().scale(components.x).orient("bottom").ticks(xticks);
  if(config.timeSeries){
      omponents.xAxis.tickFormat(d3.time.format("%m-%d-%Y"))
  };

  components.yAxis = d3.svg.axis()
      .scale(components.y)
      .orient("left")
      .ticks(yticks);
  if(config && typeof config.yTickFunc === "function" ){
      components.yAxis.tickFormat(config.yTickFunc);
  }
//   }else{
//     components.xAxis = d3.svg.axis().scale(components.x).orient("bottom").ticks(4);
//     if(config.timeSeries){
//         omponents. xAxis.tickFormat(d3.time.format("%m-%d-%Y"))
//     };

//     components.yAxis = d3.svg.axis()
//         .scale(components.y)
//         .orient("left")
//         .ticks(4);
//     if(config && typeof config.yTickFunc === "function" ){
//         components.yAxis.tickFormat(config.yTickFunc);
//     }
//   }


  
  // create an SVG element (appended to body)
  // set size
  // add a "g" element (think "group")
  // annoying d3 gotcha - the 'svg' variable here is a 'g' element
  // the final line sets the transform on <g>, not on <svg>



  // Adds the svg canvas 
//   var svg;
  //if(style && style.backgroundColor){
  var backgroundColor = style.backgroundColor;
  components.svg = d3.select(config.el).append("svg")
    .attr("width", dimensions.width +dimensions. margin.left + dimensions.margin.right)
    .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
    .style("background-color", backgroundColor)
    .append("g")
      .attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
//   }else{
//     components.svg = d3.select(config.el).append("svg")
//       .attr("width", dimensions.width +dimensions. margin.left + dimensions.margin.right)
//       .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
//       .style("background-color", "white")
//       .append("g")
//         .attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
//   }

//  if(style && style.backgroundColor){
  var backgroundColor = style.backgroundColor;
  components.svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", backgroundColor);
//   }else{
//     components.svg.append("rect")
//       .attr("width", "100%")
//       .attr("height", "100%")
//       .attr("fill", "white");
//   }

  //if(style && style.axis){
  var axis = style.axis;
  var color = axis.color ? axis.color : "black";
  var opacity = axis.opacity ? axis.opacity : 1.0;
  var width = axis.width ? axis.width : "2";
  var fontSize = axis.textSize ? axis.textSize : 8
  var ytitle = config.yLabel ? config.yLabel : "";
  components.svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + dimensions.height + ")")
    .attr("stroke", color)
    .attr("stroke-width", width)   
    .attr("font-size", fontSize)
    .style("opacity", opacity)
    .attr("fill", "none")
  //   .append("text") // just for the title (ticks are automatic)
  //     //.attr("transform", "rotate(-90)") // rotate the text!
  //     .attr("x", 0 )
  //     .attr("y", -345)
  //     .text("Date"); 

  components.svg.append("g")
    .attr("class", "y axis")
     .attr("stroke", color)
     .attr("stroke-width", width)   
     .attr("font-size", fontSize)
     .style("opacity", opacity)
     .attr("fill", "none")
     .append("text") // just for the title (ticks are automatic)
         //.attr("transform", "rotate(-90)") // rotate the text!
         .attr("x", -25)
         .attr("y", -15)
         .text(ytitle);

    // d3.select('.y axis').selectAll('text')
    //     .style("opacity", opacity);
    // d3.select('.y axis').selectAll('line')
    //     .style("opacity", opacity);            
//   }else{
//     components.svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + dimensions.height + ")")
//       .attr("stroke", "black")
//       .attr("stroke-width", 2)   
//       .attr("font-size", 8)
//       .style("opacity", 1.0)
//       .attr("fill", "none")
//     //   .append("text") // just for the title (ticks are automatic)
//     //     //.attr("transform", "rotate(-90)") // rotate the text!
//     //     .attr("x", 0 )
//     //     .attr("y", -345)
//     //     .text("Date"); 

//     components.svg.append("g")
//       .attr("class", "y axis")
//       .attr("stroke", "black")
//       .attr("stroke-width", 2)   
//       .attr("font-size", 8)
//       .style("opacity", 1.0)
//       .attr("fill", "none")
//       .append("text") // just for the title (ticks are automatic)
//           //.attr("transform", "rotate(-90)") // rotate the text!
//           .attr("x", -25)
//           .attr("y", -15)
//           .text("");

//     // d3.select('.axis').selectAll('text')
//     //     .style("opacity", 1.0);
//     // d3.select('.axis').selectAll('line')
//     //     .style("opacity", 1.0);
//   }
  
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
  if(style.rotateXLabel){
      components.svg.select('.x.axis').transition().duration(300).call(components.xAxis)
        .selectAll("text")
           .attr("y", 0)
           .attr("x", 8)
           .attr("dy", ".35em")
           .attr("transform", "rotate(50)")
           .style("text-anchor", "start");
  }else{
      components.svg.select('.x.axis').transition().duration(300).call(components.xAxis);
  }


  // same for yAxis but with more transform and a title
  if(style.rotateYLabel){
    components.svg.select(".y.axis").transition().duration(300).call(components.yAxis)
      .selectAll("text")
         .attr("y", 0)
         .attr("x", 8)
         .attr("dy", ".35em")
         .attr("transform", "rotate(90)")
         .style("text-anchor", "start");
  }else{
    components.svg.select(".y.axis").transition().duration(300).call(components.yAxis);
  }


  // THIS IS THE ACTUAL WORK!
  var bars = components.svg.selectAll(".bar").data(data, function(d) { return d.xprop; }) // (data) is an array/iterable thing, second argument is an ID generator function

  bars.exit()
      .transition()
      .duration(300)
      .attr("y", components.y(0))
      .attr("height", dimensions.height - components.y(0))
      .style('fill-opacity', 1e-6)
      .remove();

  //if(style && style.bar){
  // data that needs DOM = enter() (a set/selection, not an event!)
  var bar = style.bar;
  var color = bar.color ? bar.color : "black";
  bars.enter().append("rect")
      .attr("class", "bar")
      .style("fill", color)
      .attr("y", components.y(0))
      .attr("height", dimensions.height - components.y(0));

  // the "UPDATE" set:
  bars.transition().duration(300).attr("x", function(d) { return components.x(d.xprop); }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", components.x.rangeBand()) // constant, so no callback function(d) here
    .style("fill", color)
    .attr("y", function(d) { return components.y(d.yprop); })
    .attr("height", function(d) { return dimensions.height - components.y(d.yprop); }); // flip the height, because y's domain is bot


//   }else{
//     // data that needs DOM = enter() (a set/selection, not an event!)
//     bars.enter().append("rect")
//       .attr("class", "bar")
//       .style("fill", "black")
//       .attr("y", components.y(0))
//       .attr("height", dimensions.height - components.y(0));

//       // the "UPDATE" set:
//     bars.transition().duration(300).attr("x", function(d) { return components.x(d.xprop); }) // (d) is one item from the data array, x is the scale object from above
//       .attr("width", components.x.rangeBand()) // constant, so no callback function(d) here
//       .style("fill", "black")
//       .attr("y", function(d) { return components.y(d.yprop); })
//       .attr("height", function(d) { return dimensions.height - components.y(d.yprop); }); // flip the height, because y's domain is bot

//   }

  me.chart = components.svg;  
  return components.svg;  
}

function createPieChart(data, dimensions, config, style, me) {
  var color = d3.scale.ordinal().range(style.colors);
      //var color = d3.scale.category10();

  var pie = d3.layout.pie()
    .value(function(d) {
      return d.yprop;
    })
    .sort(null);

  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(dimensions.radius - 10);

  var labelArc = d3.svg.arc()
    .outerRadius(dimensions.radius - 40)
    .innerRadius(dimensions.radius - 40);      

    // Adds the svg canvas 
  var svg;
  //if(style && style.backgroundColor){
  var backgroundColor = style.backgroundColor;
  svg = d3.select(config.el).append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", backgroundColor)
      .append("g")
      .attr("transform", "translate(" + dimensions.width / 2 + "," + dimensions.height / 2 + ")");
//   }else{
//     svg = d3.select(config.el).append("svg")
//         .attr("width", dimensions.width)
//         .attr("height", dimensions.height)
//         .style("background-color", "white")
//         .append("g")
//         .attr("transform", "translate(" + dimensions.width / 2 + "," + dimensions.height / 2 + ")");
//   }

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

function createDonutChart(data, dimensions, config, style, me){
  var width = 800,
  height = 250,
  radius = Math.min(config.width, config.height) / 2;

  var color = d3.scale.ordinal()
      .range(style.colors);
  //var color = d3.scale.category10();

  var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
          return d.yprop;
      });

  var arc = d3.svg.arc()
      .outerRadius(dimensions.radius - 10)
      .innerRadius(dimensions.radius - 70);

  var labelArc = d3.svg.arc()
      .outerRadius(dimensions.radius - 40)
      .innerRadius(dimensions.radius - 40);

  // Adds the svg canvas 
  var svg;
  //if(style && style.backgroundColor){
  var backgroundColor = style.backgroundColor;
  svg = d3.select(config.el).append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", backgroundColor)
          .append("g")
          .attr("transform", "translate(" + dimensions.width / 2 + 
                                      "," + dimensions.height / 2 + ")");
//   }else{
//     svg = d3.select(config.el).append("svg")
//         .attr("width", dimensions.width)
//         .attr("height", dimensions.height)
//         .style("background-color", "white")
//             .append("g")
//             .attr("transform", "translate(" + dimensions.width / 2 + 
//                                         "," + dimensions.height / 2 + ")");
//   }

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


