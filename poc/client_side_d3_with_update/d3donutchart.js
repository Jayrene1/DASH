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

var pie;
var arc;
var labelArc;
var svg;

function createDonutChart(data){
    var width = 800,
    height = 250,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
    .range(["#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"]);
    //var color = d3.scale.category10();

    pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
        return d.amnt;
    });

    arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

    labelArc = d3.svg.arc()
	.outerRadius(radius - 40)
	.innerRadius(radius - 40);

    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data.type);
        })
        .style("stroke", function (d) {
            return color(d.data.type);
        });

    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.type;
        });
}

function updateDonutChart(data) {
var g = svg.selectAll('.arc')
    .data(pie(data.amnt))
    .attr('class', 'arc')
    .enter().append('g');


  g.append('path')
    .attr('d', arc)
    .style('fill', function(d, num, group) {
      return config.colors[num];
    });
}

createDonutChart(data1);
setTimeout(function(){
    updateDonutChart(data2);
}, 5000);