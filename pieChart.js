function createPieChart(data) {
    var color = d3.scale.category10();
    var svg;
    
	var pie = d3.layout.pie()
		.value(function(d) { return d; })
	 	.sort(null);
	
	var arc = d3.svg.arc()
		.innerRadius(radius / 2)
		.outerRadius(radius);
    
	var arcOver = d3.svg.arc()
         .innerRadius(radius / 2)
         .outerRadius(radius + 20);
    
	var labelArc = d3.svg.arc()
         .outerRadius(radius / 2)
         .innerRadius(radius - 20);
    
	if (!svg){
         svg = d3.select("#chart").append("svg")
         .attr("width", width)
	     .attr("height", height + 50)
         .style("display", "block")
         .style("margin","auto")
	     .append("g")
	     .attr("transform", "translate(" + width / 2 + "," + height / 1.75 + ")");
	}
    

	var path = svg.selectAll("path").data(pie(data));
	
     path.enter().append("path")
     .each(function(d) {this._current = d;} )
     .attr("fill", function(d, i) { return color(i); })
	 .attr('d', arc)
     .on("mouseover", function(d) {
         d3.select(this).transition()
         .duration(500)
         .attr("d", arcOver);
         
         svg.append("text")
         .attr("transform", function() {
               d.innerRadius = 0;
               d.outerRadius = radius;
               return "translate(" + arc.centroid(d) + ")";
          })
          .style("text-anchor", "middle")
          .style("font-size", 13)
          .attr("class", "label")
          .style("opacity",100)
          .text(d.value);
         
     })
     .on("mouseout", function(d) {
         d3.select(this).transition()
         .duration(500)
         .attr("d", arc);
         
         svg.selectAll("text")
         .style("opacity",0);
     })
     .on("click", function () {
         d3.select("svg").remove();
         selected = 1;
         createBarChart(data);
     });
    
     path.transition().attrTween('d', arcTween);
    
     path.exit().remove()
	
	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
            return arc(i(t));
        };
	}
}