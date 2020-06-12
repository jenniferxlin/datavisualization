
// Set up the initial line chart
// Scales are configured so that 1px = 10cm in the simulation -- leave them alone
let lineChart = d3.select("#line");
let xScale = d3.scaleLinear().domain([0, 36]).range([20, 380]);
let yScale = d3.scaleLinear().domain([0, 30]).range([300, 0]);


// ----- MAKE YOUR ADDITIONS BETWEEN THESE LINES -----
function plotTrajectory(trajectoryData, color) {

  //calls trajectoryData
  console.log(trajectoryData);
  
  //creates d3 line generator 
  var lineGen = d3.line()
  .x(d => xScale(d.xPos))
  .y(d => yScale(d.yPos))
  .curve(d3.curveMonotoneX);

  //uses d3 datum join to append the path with lineGen
  lineChart.append("path")
    .datum(trajectoryData)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1)
    .attr("d", lineGen);
}
// ----- MAKE YOUR ADDITIONS BETWEEN THESE LINES FOR #5 -----


// Function that computes the trajectory of a projectile using finite approximation
// Returns an array of points, all of which are approximate locations at 0.05s intervals
function trajectory(velocity, angleInDegrees) {
  // Initialize the simulation
  let angle = (angleInDegrees * Math.PI) / 180.0
  let ground = 0;
  let timeStep = 0.05;
  let traj = [];
  traj.push({
    ground: ground,
    xPos: 0,
    yPos: ground,
    xVelocity: velocity * Math.cos(angle),
    yVelocity: velocity * Math.sin(angle),
    xAcceleration: 0,
    yAcceleration: -3.71 * timeStep
  });

  // Begin looping until we hit the ground
  do {
    let last = traj[traj.length - 1];
    let xAcc = last.xAcceleration;
    let yAcc = last.yAcceleration;
    let xVel = last.xVelocity + xAcc;
    let yVel = last.yVelocity + yAcc;
    let nx = last.xPos + (xVel * timeStep);
    let ny = last.yPos + (yVel * timeStep);
    let nxt = {
      ground: ground,
      xPos: nx,
      yPos: ny,
      xVelocity: xVel,
      yVelocity: yVel,
      xAcceleration: xAcc,
      yAcceleration: yAcc
    };
    traj.push(nxt)
  }
  while (traj[traj.length - 1].ground < traj[traj.length - 1].yPos)
  return traj.map((d) => { return { xPos: d.xPos, yPos: d.yPos } });
}


// Assuming you have correctly made your function, all of these lines should work without throwing exceptions
plotTrajectory(trajectory(14, 70), "blue");
plotTrajectory(trajectory(7, 30), "red");
plotTrajectory(trajectory(16, 45), "#721088"); // runs off of canvas, should be clipped
plotTrajectory(trajectory(11, 60), "#00CC00");
