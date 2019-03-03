
function createLineChart(data, config){

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
};

//createLineChart(datanottime);
