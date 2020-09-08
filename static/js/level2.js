

// Define arrays to hold created earthquake and faultline markers
const earthquakeMap = new L.layerGroup
const faultlineMap = new L.layerGroup

const dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

d3.json(dataUrl).then(function (data) {

    const features = data.features;
    const earthquakeData = features.map(feature => {
        const magnitude = feature.properties.mag;
        const place = feature.properties.place;
        const time = feature.properties.time;
        //convert timestamp into readable date and time 
        const newTime = new Date(time);
        const significance = feature.properties.sig
        //add circle markers to map based on location coordinates 

        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillOpacity: 0.95,
            color: getColor(significance),
            fillColor: getColor(significance),
            radius: magnitude ** 3 * 1000

        }).bindPopup(`<h3>Earthquake: ${place}</h3> <hr>
          <h3>Time: ${newTime}</h3> <hr><h3>Magnitude: ${magnitude}</h3> <hr> 
          <h3>Significance: ${significance}</h3>`).addTo(earthquakeMap)
    });
    //create legend 
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (myMap) {
        const div = L.DomUtil.create('div', 'info legend');
        labels = ['<strong>EQ Significance</strong>'],
            significance = [0, 250, 500, 750, 1000];
        // loop through earthquake significance intervals and generate a label with a colored square for each interval
        for (var i = 0; i < significance.length; i++) {
            div.innerHTML +=
                labels.push(
                    '<i style="background:' + getColor(significance[i] + 1) + '"></i> ' +
                    significance[i] + (significance[i + 1] ? '&ndash;' + significance[i + 1] + '<br>' : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(myMap);
})

//create function to add color based on earthquake significance 
function getColor(c) {
    return c > 1000 ? '#800026' :
        c > 750 ? '#BD0026' :
            c > 500 ? '#E31A1C' :
                c > 250 ? '#FC4E2A' :
                    '#FFFFFF';
}

const faultlineData = 'static/data/qfaults_latest_quaternary.geojson';

d3.json(faultlineData).then(data => {
    const faultFeatures = data.features;
    // console.log(faultFeatures); //39200records 
    //filter data to required slip rate values 

    const plottedSpliprates = faultFeatures.filter(data => data.properties.slip_rate == 'Greater than 5.0 mm/yr'
        || data.properties.slip_rate == 'Between 1.0 and 5.0 mm/yr');
    // const slipRatesData = plottedSpliprates.map(feature => {
    //     const slipRates = feature.properties.slip_rate
    //     const fault = feature.properties.fault_name
    // console.log(fault);
    // console.log(plottedSpliprates); //18799 records 

    L.geoJson(plottedSpliprates, {
        valueProperty: 'slip_rate',
        style: function (feature) 
            {
                return strokeWeight(feature.properties.slip_rate);
            }
            // onEachFeature: function(feature, layer) {

            //         layer.bindPopup(`<h3>Fault: ${fault}</h3> <hr><h3>Slip Rate: ${slipRates}</h3> <hr>
            // <h3>Slip Rate:`)
                // }
        }).addTo(faultlineMap);
    // })
});

//craete function to add higher stroke-weight to lines with higher slip_rate
function strokeWeight(slip_rate){
    let weight;
    switch(slip_rate){
        case 'Greater than 5.0 mm/yr':
            weight = 5;
            color = 'green';
            break;
        case 'Between 1.0 and 5.0 mm/yr':
            weight = 3;
            color = 'green'
    }
    return{
        'weight': weight,
        'color': color
    }
}
// Create base layers

// Streetmap Layer
const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// Create two separate layer groups: one for cities and one for states
// const earthquakeMap = new L.layerGroup
// const faultlineMap = new L.layerGroup
// const earthquakeMap = L.layerGroup(earthquakeMarkers);
// const faultlineMap = L.layerGroup(faultlineMarkers);


// Create a baseMaps object
const baseMaps = {
    "Light": streetmap,
    "Dark": darkmap
};

// Create an overlay object
const overlayMaps = {
    "Earthquakes": earthquakeMap,
    "Faults": faultlineMap
};

// Define a map object
const myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [darkmap, earthquakeMap,faultlineMap]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);


