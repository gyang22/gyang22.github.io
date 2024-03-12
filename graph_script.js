var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var nodes = [
    { id: 1, x: width / 3, y: height / 2 },
    { id: 2, x: 2 * width / 3, y: height / 2 }
    // Add more nodes here
];

var links = [
    { source: 1, target: 2 }
    // Add more links here
];

var link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
