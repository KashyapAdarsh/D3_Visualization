/* This function creates bar chart */		
function createBarChart(data) {
	var svg = d3.select("#chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style("display", "block")
        .style("margin-left","auto")
        .style("margin-right","auto")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    y.domain([0, d3.max(data)]);
    x.domain(data.map(function(d, i){return bins[i];}));
    
    var scaleHeight = (height / d3.max(data));
	svg.call(tip);		

	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")

	svg.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("x", function(d, i) {
            return i * (width / data.length) + 30;
     })
	.attr("width", function(d) {return (width / binSize) - 15; })
	.attr("y", function(d) {
            return height - (d * scaleHeight);
     })
	.attr("height", function(d) { return d * scaleHeight; })
	.on("mouseover", function(d, i) {
		tip.show(d);
		d3.select(this).transition()
		.duration(0)
		.attr("width", function(d) { return (width / binSize) - 15 + 8;})
        .attr("x", function(d) {
            return i * (width / data.length) + 30 - 5;
        })
		.attr("height", function(d) { return parseInt(d3.select(this).attr("height")) + 8;})
		.attr("y", function(d) { return d3.select(this).attr("y") - 8; })
	})
	.on("mouseout", function(d, i) {
		tip.hide(d);
		d3.select(this).transition()
		.duration(0)
		.attr("width", function(d) { return (width / binSize) - 15;})
        .attr("x", function(d) {
            return i * (width / data.length) + 30;
        })
		.attr("height", function(d) { return d * scaleHeight; })
		.attr("y", function(d) {  return height - (d * scaleHeight); })
	})
    .on("click", function (d) {
        d3.select("svg").remove();
        tip.hide(d);
        selected = 0;
        createPieChart(data);
    });
}