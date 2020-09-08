# leaflet-challenge
files for leaflet homework 


Level 1: Basic Visualization:

The USGS provides earthquake data in a number of different formats, updated every 5 minutes.
Use the following dataset to plot earthquakes on your map,
Past 30 Days M1.0+ Earthquakes
You can visit the USGS GeoJSON Feed page and study the important fields in the geoJSON under the Output section,
(You will need to study the fields mag, sig and time under the keys features -> properties)


Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


Your data markers should reflect the magnitude of the earthquake in their size and and the significance of earthquake in their color. Earthquakes with higher magnitudes should appear larger and those with higher significance should appear darker in color.


Include popups that provide additional information about the earthquake when a marker is clicked.

Create a legend that will provide context for your map data as shown in the map above


Your visualization should look something like the map above.

The JavaScript code solution for level 1 is level1.js




Level 2: More Data (Optional)

The USGS wants you to plot a second data set on your map to illustrate the relationship between earthquakes and fault-lines. You will need to pull in a second data set and visualize it along side your original set of data. Fault data has already been provided in the static/data folder.
In this step we are going to..


Plot a second data set on our map.


Only plot the fault-lines which have the following slip_rate values,
Greater than 5.0 mm/yr and Between 1.0 and 5.0 mm/yr


Use a higher stroke-weight for fault-lines with higher slip_rate


Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.


Add layer controls to our map as shown in map above.


Include popups that provide additional information about the fault when a fault-line is clicked.


The JavaScript code solution for level 2 is level2.js
