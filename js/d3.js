/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
d3.csv('./data/POC.CSV').then(function (seta) {
  var outlet =""

    arranging(seta, "Port_Name", ).forEach(ele => {
        // console.log(ele[0].replace(/\s/g,''))
        outlet = outlet + `<option  value=${ele[0].replace(/\s/g, '')}>${ele[0]}</option>`
    });
    $("#thirdSelect").append(outlet)


console.log("erzxr")
var data = arranging (seta , "Country_Name_EN")
var AscendingOrder = []
var sum = 0
data.forEach((ele , i) => {
    if ( i < 9){
        AscendingOrder.push(ele)
    }
    else{
        sum = ele[1] + sum

    }

});

var pusg = ["rest contry" ,sum ]
AscendingOrder.push(pusg)
 data = AscendingOrder


var t = d3.transition().duration(750);

var margin = { left:80, right:20, top:50, bottom:100 };

var width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// X Label aquamarine
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("fill", "aquamarine")
    .text("الواردات");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("fill", "aquamarine")
    .text("الدول");
    

    // console.log(data);

    // Clean data
  

    // X Scale
    var x = d3.scaleLinear()
        .domain([25 , 0])
        .range([width, 0]);

    // Y Scale
    var y =  d3.scaleBand()
    .domain(data.map(function(d){ return d[0] }))
    .range([0, height])
    .padding(0.2)
    

    // X Axis
    // var xAxisCall = d3.axisBottom(x);
    // g.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height +")")
    //     .attr("fill", "aquamarine")
    //     .call(xAxisCall);

    // Y Axis
    // var yAxisCall = d3.axisLeft(y)
    //     .tickFormat(function(d){ return  d; });
    // g.append("g")
    //     .attr("class", "y axis")
    //     .attr("fill", "aquamarine")
    //     .call(yAxisCall);
       


    // Bars
    var rects = g.selectAll("rect")
        .data(data)
        
    rects.enter()
        .append("rect")
            .attr("x",5)
            .attr("y", function(d){ return y(d[0]) })
            .attr("height", y.bandwidth )
            .attr("width", function(d){ return  x(d[1]) })
            .attr("fill", "aquamarine")
            // .append("text")
            

            var xG = g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0 , " + height + ")")
        
        var yG = g.append("g")
            .attr("class", "y-axis")



d3.interval(function () {
    //your cod here 
  
    update(seta  , $("#thirdSelect").val())
    
} , 1000)

function update( seta , port) {
    
    var q = []
    seta.forEach(ele => {
        if (ele.Port_Name.replace(/\s/g, '') == port) {
            q.push(ele)
        }
        else if ("all" == port) {
            q = seta
        }
    });
    console.log(q)
    var data = arranging (q , "Country_Name_EN","")
    var AscendingOrder = []
    var sum = 0
    data.forEach((ele , i) => {
        if ( i < 9){
            AscendingOrder.push(ele)
        }
        else{
            sum = ele[1] + sum
    
        }
    
    });
    
    var pusg = ["rest contry" ,sum ]
    AscendingOrder.push(pusg)
     data = AscendingOrder
console.log(q)

    y.domain(data.map(function(d){ return d[0] }))

    var bottomAxis = d3.axisBottom(x)
    xG.transition(t)
    .call(bottomAxis).selectAll("text")
        .attr('y', `10`)
        .attr('x', `-5`)
        .attr('text-anchor', `start`)

    var leftAxis = d3.axisLeft(y)
    yG.transition(t)
    .call(leftAxis);

    


    var rects = g.selectAll('rect')
        .data(data)
    // exit old ele not present 
    // yAxisCall.exit().remove();
    // xAxisCall.exit().remove();
    rects.exit()
    .attr("fill" , "red")
    .transition(t)
    .attr("y" , 0)
    .attr("height" ,0)
    .remove();
    // update old ele present in new one 
    rects.transition(t)
        .attr("x",5)
        .attr("y", function (d) {
            return y(d[0])
        })
        .attr("width", function(d){ return  x(d[1]) })
        .attr("height", y.bandwidth)
        .attr("fill", function (d) {
            return "aquamarine"
        })

// enter new ele present in new date 

rects.enter()
    .append("rect")
    .attr("x",5)
    .attr("y", function(d){ return y(d[0]) })
    .attr("height", y.bandwidth )
    .attr("fill", "aquamarine")
    .attr("y" , 0)
    .transition(t)
    .attr("width", function(d){ return  x(d[1]) })


}
})