// PLEASE SOLVE PROBLEM #6 IN THIS FILE
const requestData = async function () {

    // call diamond data
    var data = await d3.csv("./diamond_counts.csv");

    // convert string into integers
    data.forEach((d, i) => {
        d['carat'] = Number(d['carat']);
        d['count'] = Number(d['count']);
    });

    // clean data by filtering NaN values
    data = data.filter(d => {
        return !isNaN(d['carat']) && !isNaN(d['count'])
    });

    
    let svg = d3.select('#bars');
    let width = svg.attr('width');
    let height = svg.attr('height');
    let margin = { top: 100, right: 10, bottom: 100, left: 0 };

    // g elements for chart and axes
    let chartArea = svg.append('g').attr('class', 'chart');
    let axisArea = svg.append('g').attr('class', 'axis')
        .attr("transform", "translate(" + margin.right + "," + margin.top + ")");

    // x scale 
    const caratExtent = d3.extent(data, d => d['carat']);
    const caratScale = d3.scaleLinear().domain(caratExtent).range([10, 490]);

    // y scale
    const countExtent = d3.extent(data, d => d['count']);
    const countScale = d3.scaleLinear().domain(countExtent).range([100, 0]);

    // x axis
    let bottomAxis = d3.axisBottom(caratScale);
    axisArea.call(bottomAxis);

    // charting bars
    chartArea.selectAll('rect').data(data)
           .join('rect')
           .attr('class', 'bar')
           .attr('x',  d => {return caratScale(d['carat'])})
           .attr('y', d => {return countScale(d['count'])})
           .attr('width', 6)
           .attr('height',  d => {return 100 - countScale(d['count'])})
           .attr('fill', 'steelblue')
           .attr('stroke','none');
}
requestData();