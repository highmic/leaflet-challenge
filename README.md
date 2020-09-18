# leaflet-challenge
The primary objective of this homework is to demostrate data visualization skills with eathquake data from United States Geological Survey USGS 

## Languages and Tools
*  Leaflet JavaScript
*  HTML

## Data Sources 
1. Level 1 or Basic Visualization https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson
2. Level 2 or More Data: Provided in the static/data folder

## Level 1 or Basic Visualization
*  A Leaflet maps that plots all of level 1 data sets based on their longitude and latitude
*  Markers reflect magnitude of earthquake in their size and significance of the earthquake in their color with eathquakes with higher magnitude larger in size and those with higher significance appear darker in color
*  Pop-ups that provided additional information when a marker is clicked and a legend that provided more context for the map data

![alt text](https://github.com/highmic/leaflet-challenge/blob/master/images/level1_basic.png "Basic Visualization no Popup")
![alt text](https://github.com/highmic/leaflet-challenge/blob/master/images/level1_basicpopUp.png "Basic Visualization with Popup")



## Level 2 or More Data Visualization 
*  I plotted level 2 dataset on the map created in level 1. I added only fault-lines with slip_rate values 'Greater than 5.0mm/yr' and 'Between 1.0 and 5.0 mm/yr'
*  Higher stroke indicates fault lines with higher slip_rate
*  I added two base maps to choose from (Light or Dark) and the two data sets separated as overlays that can be turned on and off independently. A layer control added to the top right corner provided the user interactive interface for the base maps and the overlays
*  I added additional pop-up for the faultlines with information on the fault

![alt text](https://github.com/highmic/leaflet-challenge/blob/master/images/level2_dark_popup.png "Level2 Visualization DarkMap")
![alt text](https://github.com/highmic/leaflet-challenge/blob/master/images/level2_street.png "Level2 Visualization StreetMap")
![alt text](https://github.com/highmic/leaflet-challenge/blob/master/images/level2_faultline_popup.png "Level2 Visualization faultOnly")
