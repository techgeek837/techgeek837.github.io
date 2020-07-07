    //import * as d3 from 'd3'

const height = window.innerHeight-50
const width = window.innerWidth-10

d3.select('.map')
    .append('svg')
        .attr('width', width)
        .attr('height', height)
    .append('g')

const cases = {
    Srikakulam:329,
    Vizianagaram:269,
    Visakhapatnam:945,
    Krishna:1898,
    Guntur:2262,
    East_Godavari:1890,
    WestGodavari:1319,
    Prakasam:767,
    Kurnool:2671,
    Anantapur:2481,
    Nellore:810,
    Kadapa:1369,
    Chittoor:1510,
}
let max= 0
for (const key in cases) {
    max = (max<cases[key]) ? cases[key] : max
}


let color = d3.scaleSequential()
  .domain([0, max+300])
  .interpolator(d3.interpolateReds)


function plotTopoDist(fileURL){
    d3.json(fileURL).then(
        data=>{
            //console.log(data)
            
            let projection = d3.geoMercator()
            let pathGen = d3.geoPath()
                            .projection(projection)
            
            let geoJson = topojson.feature(data, data.objects.andhrapradesh_district)
            //console.log(geoJson);
            
            const bounds = pathGen.bounds(geoJson)
            const scale = 0.95 / Math.max( ( (bounds[1][0]-bounds[0][0]) / width), ( (bounds[1][1]-bounds[0][1]) / height) )        
            const translate = [(width-(scale*(bounds[1][0]+bounds[0][0])))/2,(height-(scale*(bounds[1][1]+bounds[0][1])))/2]

            //console.log("Bounds: ",bounds,"\nScale: ",scale,"\nTranslate: ",translate)

            d3.select('g')
                .selectAll('path')
                .data(geoJson.features)
                .join('path')
                    .attr('d',data=>pathGen(data))
                    .attr('stroke-width','0.02')
                    .attr("fill", d=>color(cases[d.properties.district]))
                    .attr("stroke", "#222")
                    .attr('transform',`translate(${translate[0]},${translate[1]}),scale(${scale})`)
                    .on('mousemove',function(d){
                        d3.select(this)
                        .attr('fill',d=>color(cases[d.properties.district]+200))
                        let name = d.properties.district
                        if(name){
                            d3.select('#tooltip')
                            .html(`${name}<p>${cases[name]}</p>`)
                            .style("left", (d3.event.pageX + 10) + "px")
                            .style("top", (d3.event.pageY - 15) + "px");
                        }
                    })
                    .on('mouseout',function(){
                        d3.select(this).attr('fill',d=>color(cases[d.properties.district]))
                        d3.select('#tooltip')
                            .text("")
                    })
        }
    )
}


function plotTopoIndia(fileURL){
    d3.json(fileURL).then(
        data=>{
            let projection = d3.geoMercator()
            let pathGen = d3.geoPath()
                            .projection(projection)
            
            let districtsGeoJson = topojson.feature(data, data.objects.india_districts_2019_734)
            let statesGeoJson = topojson.feature(data, data.objects.india_states)
            
            
            const bounds = pathGen.bounds(statesGeoJson)
            const scale = 0.95 / Math.max( ( (bounds[1][0]-bounds[0][0]) / width), ( (bounds[1][1]-bounds[0][1]) / height) )        
            const translate = [(width-(scale*(bounds[1][0]+bounds[0][0])))/2,(height-(scale*(bounds[1][1]+bounds[0][1])))/2]

            //console.log("Bounds: ",bounds,"\nScale: ",scale,"\nTranslate: ",translate)

            let features = [...districtsGeoJson.features,...statesGeoJson.features]
            console.log(districtsGeoJson,statesGeoJson)
            d3.select('g')
                .selectAll('path')
                .data(features)
                .join('path')
                    .attr('d',data=>pathGen(data))
                    .attr('stroke-width',d=>d.properties.hasOwnProperty('district')?'0.1':'0.2')
                    .attr("fill", d=>d.properties.hasOwnProperty('district')?'#85c3c0':'none')
                    .attr("stroke", d=>d.properties.hasOwnProperty('district')?'rgba(45,45,45,0.3)':'rgba(22,22,22,1')
                    .attr('transform',`translate(${translate[0]},${translate[1]}),scale(${scale})`)
                    .on('mousemove',function(d){
                        d3.select(this)
                        .attr('fill',d=>d.properties.hasOwnProperty('district')?'pink':'none')
                        let name = d.properties.district
                        if(name){
                            d3.select('#tooltip')
                            .text(`${name}`)
                            .style("left", (d3.event.pageX + 10) + "px")
                            .style("top", (d3.event.pageY - 15) + "px");
                        }
                    })
                    .on('mouseout',function(){
                        d3.select(this).attr('fill',d=>d.properties.hasOwnProperty('district')?'#85c3c0':'none')
                        d3.select('#tooltip')
                            .text("")
                    })
        }
    )
}

function plotTopoWorld(fileURL){
    d3.json(fileURL).then(
        data=>{
            //console.log(data)
            
            let projection = d3.geoMercator()
            let pathGen = d3.geoPath()
                            .projection(projection)
            
            let geoJson = topojson.feature(data, data.objects.countries)
            //console.log(geoJson);
            
            const bounds = pathGen.bounds(geoJson)
            const scale = 0.95 / Math.max( ( (bounds[1][0]-bounds[0][0]) / width), ( (bounds[1][1]-bounds[0][1]) / height) )        
            const translate = [(width-(scale*(bounds[1][0]+bounds[0][0])))/2,(height-(scale*(bounds[1][1]+bounds[0][1])))/2]

            //console.log("Bounds: ",bounds,"\nScale: ",scale,"\nTranslate: ",translate)

            d3.select('g')
                .selectAll('path')
                .data(geoJson.features)
                .join('path')
                    .attr('d',data=>pathGen(data))
                    .attr('stroke-width','1.3')
                    .attr("fill", "#9e1fde")
                    .attr("stroke", 'white')
                    .attr('transform',`translate(${translate[0]},${translate[1]+50}),scale(${scale})`)
                    .on('mousemove',function(d){
                        d3.select(this)
                        .attr('fill','blue')
                    })
                    .on('mouseout',function(){
                        d3.select(this).attr('fill','#9e1fde') 
                    })
        }
    )
}


plotTopoDist('./Maps/TopoJson/andhrapradesh.topo.json')