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

//   d3.json(dataUrl).then(function(data){
    
//       const features = data.features;
//       const  mag = features.map( feature =>{
//           return L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(myMap);

//       });
//     //   console.log(features.properties);
//   })

  d3.json(dataUrl).then(function(data){
    
    const features = data.features;
    const  earthquakeData = features.map( feature =>{
        const magnitude = feature.properties.mag;
        const place = feature.properties.place;
        const time = feature.properties.time;
        //convert timestamp into readable date and time 
        const newTime = new Date(time);
        const significance = feature.properties.sig
        function getMinSig(){
          const minSig = feature.properties.reduce((min, p) => p.sig < min ? p.sig : min,
          feature.properties[0].sig);
          // console.log(minSig);
        }
        // console.log(minSig);
        // console.log(Math.max(significance));
        //  console.log(significance);
         const maxSig = Math.max.apply(null,[feature.properties.sig]);
        // console.log(maxSig);
        // console.log(newTime);
        // features.forEach
        // let color = ''
        // if 

        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
        fillOpacity:0.75,
        color:"pink",
        fillColor:"pink",
        radius: magnitude * 5000

        }).bindPopup(`<h3>Earthquake: ${place}</h3> <hr>
        <h3>Time: ${newTime}</h3> <hr><h3>Magnitude: ${magnitude}</h3> <hr> 
        <h3>Significance: ${significance}</h3>`).addTo(myMap)
    });
  //   console.log(features.properties);
})

//   L.cirlce(features.geometry.coordinates,{
//       fillOpacity:0.75,
//       color:"white",
//       radius:features.properties.mag * 1


//   }).addTo(myMap);