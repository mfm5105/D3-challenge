// D3 Homework starter file

// Section 1: Pre-Data Setup
// ===========================
// Before we code any data visualizations, we need to at least set up the width, height and margins of the graph.
var svgWidth=900;
var svgHeight=500;
// Grab the width of the containing box
var width = parseInt(d3.select("#scatter").style("width"));

// Designate the height of the graph
var height = width - width / 3.9;

// Margin spacing for graph
var margin = 20;

// space for placing words
var labelArea = 110;

// padding for the text at the bottom and left axes
var tPadBot = 40;
var tPadLeft = 40;

// Create the actual SVG canvas for the graph
// ====================================
var svg= d3.select("body")
  .append("svg")
  .attr("width",svgWidth)
  .attr("height",svgHeight)
  .attr("class","chart");

//adding chart group ('g')
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin + tPadLeft}, ${margin - tPadBot})`);

// Section 2:  Import the .csv file.
// ====================================
// This data file includes state-by-state demographic data from the US Census and measurements from health risks obtained by the 
//        Behavioral Risk Factor Surveillance System.
// Import our CSV data with d3's .csv import method.
d3.csv("assets/data/data.csv").then(function(data) {
  //casting
    data.forEach(function(d) {
     d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;})
//visualizing the data
    //console.log(health);
  console.log(data);
  visualize(data);
//});
});
// Section 3. Create our visualization function
// ====================================
function visualize(theData) {
// We called a "visualize" function on the data obtained with d3's .csv method.

  // 3.1 Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);


  // 3.2 Create axis functions. Use 6-D3\2\Activities\06-Stu_Complete_Bar_Chart\ for reference.
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale); 

  // 3.3 Append Axes to the chart
  // ==============================
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);
  // 3.4 Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(theData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", 10)
  .attr("fill", "lightblue")
  .attr("opacity", ".5")
  .attr("stroke", "white");    

  chartGroup.append("text")
  .style("text-anchor", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "8px")
  .selectAll("tspan")
  .data(theData)
  .enter()
  .append("tspan")
  .attr("x", function(data) {
      return xLinearScale(data.poverty);
  })
  .attr("y", function(data) {
      return yLinearScale(data.healthcare -.02);
  })
  .text(function(data) {
      return data.abbr
  });

  // 3.4.1 Code here to add abbrevations to the circles
  // ===================================================
  // With the circles on our graph, we need matching labels. Let's grab the state abbreviations from our data
  // and place them in the center of our dots.

  // 3.5 Tool tip and tool tip event listeners
  // ==============================
// initialize tool tip
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip",true);

// calling tool tip 
    
// Add an onmouseover event to display a tooltip   
  circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })

    // Add an on mouseout    
  .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });
  // 3.6 Create axes labels
  // ==============================
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - tPadLeft - 5)
  .attr("x", 0 - (height / 1.30))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2.5}, ${height + tPadBot + 30})`)
  .attr("class", "axisText")
  .text("In Poverty (%)");
}