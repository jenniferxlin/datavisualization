// PLEASE SOLVE PROBLEM #8 IN THIS FILE

//async function to build the map
const sendData = async function () {
    //load europe data 
    const euroData = await d3.json("./europe.topojson");

    let svg = d3.select("#map");
    let width = svg.attr('width');
    let height = svg.attr('height');

    //pick out topographic features and build d3 helper 
    var countries = topojson.feature(euroData, euroData.objects.europe);
    var projection = d3.geoMercator().fitSize([width, height], countries);
    var path = d3.geoPath().projection(projection);

    // gini extent 
    let giniExtent = d3.extent(countries.features, d => d.properties.gini);

    //color scale
    let colorScale = d3.scaleSequential(d3.interpolatePlasma).domain([giniExtent[0], giniExtent[1]]);

    //draw shape of countries
    let shapes = svg.selectAll("path.country").data(countries.features)
        .join("path")
        .attr("class", "country")
        .attr("stroke", "none")
        .attr("d", path)
        .style("fill", d => colorScale(d.properties.gini));
    
    // mouseover / hover
    shapes.on("mouseover", function () {
        d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 3);

        let name = d3.select(this).datum().properties.NAME;
        let gini = d3.select(this).datum().properties.gini;

        // display country name
        d3.select("#country")
            .text(name);

        // display gini coefficient
        d3.select("#coeff")
            .text(gini);
    });

    // mouseout 
    shapes.on("mouseout", function () {
        d3.select(this)
            .attr("stroke", "none");
        // remove country name
        d3.select("#country")
            .text("");

        // remove gini coefficient
        d3.select("#coeff")
            .text("");
    });
}
sendData();