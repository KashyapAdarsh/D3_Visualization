function forceDirected(distance) {
    if (selected == 2) {
        selected = 1;
        d3.select("svg").remove();
        d3.select("#dropDown")
        .style("visibility", function (d) {
                return "visible";
        })
        document.getElementById("PText").innerHTML = "Slide left to reduce bin size and right to increase bin size";
        document.getElementById("force").innerHTML = "Force Directed Graph";
        
        d3.select("#sliderBar").remove();
        
        d3.select("#rangeDiv")
        .append("input")
        .attr("type","range")
        .attr("id","sliderBar")
        .attr("onclick","binUpdate(this.value)")
        .attr("step", "1")
        .attr("max", "10")
        .attr("min", "1")
        .attr("value", binSize);
        
        createBarChart(getData());
    }
    else {
        selected = 2;
        d3.select("svg").remove();
        d3.select("#dropDown")
        .style("visibility", function (d) {
                return "hidden";
        })
        
        document.getElementById("force").innerHTML = "Exit Force directed graph";
        document.getElementById("PText").innerHTML = "Slide left to decrease length and right to increase length";
        
        var data = {
	           nodes: [
	                    { node1: 1 },
	   				    { node2: 2 },
	   				    { node3: 3 },
                        { node4: 4 },
	           ],
	           links: [
	   				    { source: 0, target: 1 },
                        { source: 0, target: 3 },
                        { source: 0, target: 2 },
	   				    { source: 1, target: 0 },
                        { source: 1, target: 2 },
                        { source: 1, target: 1 },
                        { source: 2, target: 1 },
                        { source: 2, target: 3 },
                        { source: 2, target: 2 },
                        { source: 3, target: 0 },
                        { source: 3, target: 2 },
                        { source: 3, target: 1 },
	           ]
	   };
    
	   var svg = d3.select("#chart")
	               .append("svg")
                   .style("display", "block")
                   .style("margin-left","auto")
                   .style("margin-right","auto")
	               .attr("width", width)
	               .attr("height", height);
    
	   var col = d3.scale.category10();
         
	   var force = d3.layout.force()
                       .links(data.links)
                       .nodes(data.nodes)
                       .size([width, height])
                       .linkDistance([distance])        
                       .charge([-50])            
                       .start();
       var graphNode = svg.selectAll("circle")
	                   .data(data.nodes)
	                   .enter()
	                   .append("circle")
	                   .attr("r", 20)
	                   .style("fill", function(d, i) {
	                       return col(i);
	                   })
	                   .call(force.drag);
	   var graphEdge = svg.selectAll("line")
	                   .data(data.links)
	                   .enter()
	                   .append("line")
    
	                   force.on("tick", function() {
	                   graphEdge.attr("x1", function(d) { return d.source.x; })
	   			                .attr("x2", function(d) { return d.target.x; })
	   			                .attr("y1", function(d) { return d.source.y; })
	   			                .attr("y2", function(d) { return d.target.y; });
    
	                   graphNode.attr("cx", function(d) { return d.x; })
	   			                .attr("cy", function(d) { return d.y; });
    
	   		 });
    }
}