// code for creating Basic Map (Level 1)
const myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 4
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
// function markerSize(magnitude){
//     return magnitude
// }
  // Use this link to get the geojson data.
//   const dataUrl= "static/data/qfaults_latest_quaternary.geojson";
  const dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

  d3.json(dataUrl).then(function(data){
    
    const features = data.features;
    const  earthquakeData = features.map( feature =>{
        const magnitude = feature.properties.mag;
        const place = feature.properties.place;
        const time = feature.properties.time;
        //convert timestamp into readable date and time 
        const newTime = new Date(time);
        const significance = feature.properties.sig
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
        fillOpacity:0.95,
        color:"white",
        fillColor: getColor(significance),
        radius: magnitude * 5000

        }).bindPopup(`<h3>Earthquake: ${place}</h3> <hr>
        <h3>Time: ${newTime}</h3> <hr><h3>Magnitude: ${magnitude}</h3> <hr> 
        <h3>Significance: ${significance}</h3>`).addTo(myMap)
    });
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    const div = L.DomUtil.create('div', 'info legend'),
        significance= [0, 250, 500, 750, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < significance.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(significance[i] + 1) + '"></i> ' +
            significance[i] + (significance[i + 1] ? '&ndash;' + significance[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

})

function getColor(c) {
  return c > 1000 ? '#800026' :
         c > 750  ? '#BD0026' :
         c > 500  ? '#E31A1C' :
         c > 250  ? '#FC4E2A' :
                    '#FFFFFF';
}
