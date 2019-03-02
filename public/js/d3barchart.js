


//var d3 = require("./greetings.js");


var parseDate = d3.time.format("%d-%b-%y").parse;

// set graph dimensions
var margin = {top: 30, right: 20, bottom: 80, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
   var config =  {
        margin: {top: 30, right: 20, bottom: 30, left: 50},
        width: 375,
        height: 375,
        timeSeries: true,
        el: "#bar"
    }

var x;
var y;
var xAxis;
var yAxis;
var svg;

function createBarChart(data, config){
    // config.width = config.width - config.margin.left - config.margin.right,
    // config.height = config.height - config.margin.top - config.margin.bottom;

    x = d3.scale.ordinal()
        .rangeRoundBands([0, config.width], .1);
        
    y = d3.scale.linear()
        .range([config.height, 0]);

    // D3 Axis - renders a d3 scale in SVG
    xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    if(config.timeSeries){
        xAxis.tickFormat(d3.time.format("%Y-%m-%d"));
    }


    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);
    if(config.yDataVal && config.yDataVal === "%"){
        yAxis.tickFormat(d => Math.round(d*100/d3.max(data)) + "%");
    }else if(config.yDataVal && config.yDataVal === "%"){
        yAxis.tickFormat(d =>  "$" + d3.format(",.2f")(ddata) );
    }

    // create an SVG element (appended to body)
    // set size
    // add a "g" element (think "group")
    // annoying d3 gotcha - the 'svg' variable here is a 'g' element
    // the final line sets the transform on <g>, not on <svg>
    svg = d3.select(config.el).append("svg")
        .attr("width", config.width +config. margin.left + config.margin.right)
        .attr("height", config.height + config.margin.top + config.margin.bottom)
    .append("g")
        .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + config.height + ")")

    svg.append("g")
        .attr("class", "y axis")
    .append("text") // just for the title (ticks are automatic)
        .attr("transform", "rotate(-90)") // rotate the text!
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");
    
    updateBarChart(data);
}

function updateBarChart(data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
    // measure the domain (for x, unique letters) (for y [0,maxFrequency])
    // now the scales are finished and usable
    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // another g element, this time to move the origin to the bottom of the svg element
    // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
    //   for everything in the selection\
    // the end result is g populated with text and lines!
    if(data.length<5){
        svg.select('.x.axis').transition().duration(300).call(xAxis)
    }else{
        svg.select('.x.axis').transition().duration(300).call(xAxis)
            .selectAll("text")
                .attr("y", 0)
                .attr("x", 9)
                .attr("dy", ".35em")
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start");
    }


    // same for yAxis but with more transform and a title
    svg.select(".y.axis").transition().duration(300).call(yAxis)

    // THIS IS THE ACTUAL WORK!
    var bars = svg.selectAll(".bar").data(data, function(d) { return d.date; }) // (data) is an array/iterable thing, second argument is an ID generator function

    bars.exit()
        .transition()
        .duration(300)
        .attr("y", y(0))
        .attr("height", height - y(0))
        .style('fill-opacity', 1e-6)
        .remove();

    // data that needs DOM = enter() (a set/selection, not an event!)
    bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("y", y(0))
        .attr("height", height - y(0));

    // the "UPDATE" set:
    bars.transition().duration(300).attr("x", function(d) { return x(d.date); }) // (d) is one item from the data array, x is the scale object from above
        .attr("width", x.rangeBand()) // constant, so no callback function(d) here
        .style("fill", "steelblue")
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); }); // flip the height, because y's domain is bot
  }

//createBarChart(data4);
// setTimeout(function(){
//     updateBarChart(data2);
// }, 5000);
// setTimeout(function(){
//     updateBarChart(data3);
// }, 10000);
// setTimeout(function(){
//     updateBarChart(data4);
// }, 15000);