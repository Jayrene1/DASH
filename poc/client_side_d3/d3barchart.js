


//var d3 = require("./greetings.js");

// // set graph dimensions
// var margin = {top: 30, right: 20, bottom: 80, left: 50},
//     width = 1200 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;
//    var config =  {
//         margin: {top: 30, right: 20, bottom: 30, left: 50},
//         width: 375,
//         height: 375,
//         timeSeries: true,
//         el: "#bar"
//     }

var components = {};
var parseDate;

function createBarChart(data, config){
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
    
    updateBarChart(data, config);
}

function updateBarChart(data, config) {
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
  }
