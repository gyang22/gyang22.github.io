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

// Create lines for links with class and id for targeting
var link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("id", function(d) { return "link-" + d.source + "-" + d.target; })
    .style("stroke", "#333")
    .style("stroke-width", "2px");

// Create circles for nodes
var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .on("mouseover", function(event, d) {
        // Highlight connected edges
        svg.selectAll(".link")
           .style("stroke", function(link_d) { 
               return link_d.source === d.id || link_d.target === d.id ? "orange" : "#333"; 
           })
           .style("stroke-width", function(link_d) { 
               return link_d.source === d.id || link_d.target === d.id ? "4px" : "2px"; 
           });
    })
    .on("mouseout", function(event, d) {
        // Revert edge styles
        svg.selectAll(".link")
           .style("stroke", "#333")
           .style("stroke-width", "2px");
    });
