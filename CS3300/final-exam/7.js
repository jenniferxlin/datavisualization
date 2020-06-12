
// Create a dataset where saturation and lightness vary across a grid
let data = [];
for (let sat = 0; sat <= 100; sat = sat + 10) {
  for (let lgt = 0; lgt <= 100; lgt = lgt + 10) {
    data.push( { saturation: sat, lightness: lgt } );
  }
}
// Scales to use with the dataset - x for lightness, y for saturation
let lightScale = d3.scaleLinear().domain([0,100]).range([16,326]);
let satScale = d3.scaleLinear().domain([0,100]).range([326,16]); // start in lower left not upper left



// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----

let wrapper = d3.select("#circleWrapper");
let canvas = wrapper.append("canvas")
                    .attr("id","colors")
                    .attr("width","342px")
                    .attr("height","342px");
let width = Number(canvas.style("width").replace("px",""));
let height = Number(canvas.style("height").replace("px",""));

// This function is triggered every move of the slider
// Hue is passed in as a number between 0 and 360
function showCircles(hue) {
    const context = canvas.node().getContext('2d');   // sets context of drawing to 2D
    context.clearRect(0, 0, width, height);           // clears the specified pixels within a given rectangle
    context.globalAlpha = 0.6;                        // returns the current transparency value of the drawing
  
  // Loop through and add the circles to the now empty canvas
  data.forEach( d => {
    
    let x = lightScale(d.lightness);
    let y = satScale(d.saturation);
    let color = d3.hsl(hue, d.saturation/100, d.lightness/100);
    let radius = 15; 

    context.fillStyle = color; 
    context.strokeStyle = "#888";
    context.beginPath();
    context.arc(x,y,radius, 0, 2*Math.PI);
    context.lineWidth = 1;
    context.fill();
    context.stroke();
  });
}

// ----- MAKE YOUR CHANGES BETWEEN THESE LINES -----



// Start with a populated board
showCircles(  d3.select("#hueSlider").property("value") ); // set w/default slider value
// Configure event handler
d3.select("#hueSlider").on("input", function() {
  showCircles(this.value);
});
