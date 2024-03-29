var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var nodes = [
    { id: 1, x: width / 3, y: height / 6 },
    { id: 2, x: 2 * width / 3, y: height / 6 },
    { id: 3, x: width / 2, y: height / 3 },
    { id: 4, x: 3 * width / 4, y: height / 2}
];

var links = [
    { source: 1, target: 2 },
    { source: 3, target: 4 },
    { source: 1, target: 3 },
    { source: 2, target: 3 }
];

// Adjust the links data to directly reference the node objects
links.forEach(function(link) {
    link.source = nodes.find(node => node.id === link.source);
    link.target = nodes.find(node => node.id === link.target);
});

// Now create the lines for links
var link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("id", function(d) { return "link-" + d.source.id + "-" + d.target.id; })
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; })
    .style("stroke", "#333")
    .style("stroke-width", "2px");


var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g");  // Create a group element for each node

node.append("circle")
    .attr("class", "node")
    .attr("r", 25)  // Node radius
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

node.append("text")
    .attr("dx", function(d) { return d.x; })
    .attr("dy", function(d) { return d.y + 5; }) // Adjust this value to position the text vertically
    .attr("text-anchor", "middle") // Centers the text on the node
    .text(function(d) { return d.id; })
    .style("fill", "black") // Text color
    .style("font-size", "12px"); // Text size

    node.selectAll("circle").on("mouseover", function(event, d) {
        // Highlight connected edges
        svg.selectAll(".link")
           .style("stroke", function(link_d) { 
               return link_d.source.id === d.id || link_d.target.id === d.id ? "orange" : "#333"; 
           })
           .style("stroke-width", function(link_d) { 
               return link_d.source.id === d.id || link_d.target.id === d.id ? "4px" : "2px"; 
           });
    }).on("mouseout", function(event, d) {
        // Revert edge styles
        svg.selectAll(".link")
           .style("stroke", "#333")
           .style("stroke-width", "2px");
    });
    
