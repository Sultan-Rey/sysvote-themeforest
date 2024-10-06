// Initialize Leaflet map in HOME Page
function homeMap() {
    var homemap = L.map('homemap').setView([37.8, -96], 4); // Center USA
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(homemap);
  
    // Define coordinates for the states and their colors
    var statesCoordinates = {
      "Alabama": { coords: [32.806671, -86.791130], color: '#EF4444' }, // Red
      "California": { coords: [36.778259, -119.417931], color: '#1E3A8A' }, // Blue
      "Florida": { coords: [27.994402, -81.760254], color: '#EF4444' }, // Red
      "Illinois": { coords: [40.633125, -89.398529], color: '#EF4444' }, // Red
      "Nebraska": { coords: [41.492538, -99.901810], color: '#EF4444' }, // Red
      "New York": { coords: [40.712776, -74.005974], color: '#1E3A8A' }, // Blue
      "Texas": { coords: [31.968599, -99.901810], color: '#EF4444' }, // Red
      "Virginia": { coords: [37.431573, -78.656891], color: '#1E3A8A' }, // Blue
      "Washington": { coords: [47.751076, -120.740135], color: '#1E3A8A' } // Blue
    };
  
    // Event listener for the select dropdown
    const stateSelect = document.getElementById('state-select');
    stateSelect.addEventListener('change', function () {
      var selectedState = this.value;
  
      if (selectedState === "All United States") {
        homemap.setView([37.8, -96], 4); // Reset to center USA view
      } else if (statesCoordinates[selectedState]) {
        var stateData = statesCoordinates[selectedState];
        var coords = stateData.coords;
        var color = stateData.color;
  
        homemap.setView(coords, 6); // Zoom in on the selected state
        L.circleMarker(coords, {
          radius: 10,
          fillColor: color, // Use specified color for the state
          color: color,
          weight: 2,
          fillOpacity: 0.5,
        }).addTo(homemap).bindPopup(selectedState).openPopup();
      }
    });
  }
  
  


function distictsMap(){
      // Initialize Leaflet map for District module
 var districtmap = L.map('us-districts-map').setView([37.8, -96], 4);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; OpenStreetMap contributors'
 }).addTo(districtmap);

 // Example district markers
 var districtMarkers = [
   { name: "District 1 (Los Angeles)", coords: [34.0522, -118.2437] },
   { name: "District 2 (New York)", coords: [40.7128, -74.0060] },
   { name: "District 3 (Chicago)", coords: [41.8781, -87.6298] }
 ];

 districtMarkers.forEach(function(district) {
   L.marker(district.coords).addTo(districtmap)
     .bindPopup('<strong>' + district.name + '</strong>');
 }); 
}

 


function callResultMap(){
  
          // Initialiser chorophlete Map in Ballot Module
          var resultmap = L.map('us-map').setView([37.8, -96], 4);
      
          // Fond de carte avec Stamen Toner Lite
          L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://maps.stamen.com/">Stamen Design</a> & contributors'
          }).addTo(resultmap);
      
          // Fonction pour définir les couleurs en fonction des résultats
          function getColor(d) {
              return d > 80 ? '#800026' :
                     d > 60 ? '#BD0026' :
                     d > 40 ? '#E31A1C' :
                     d > 20 ? '#FC4E2A' :
                     d > 10 ? '#FD8D3C' :
                     d > 5  ? '#FEB24C' :
                              '#FFEDA0';
          }
      
          // Style de chaque état
          function style(feature) {
              return {
                  fillColor: getColor(feature.properties.density),  // Propriété personnalisée "density"
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7
              };
          }
      
          // Ajout d'infobulles interactives
          function highlightFeature(e) {
              var layer = e.target;
              layer.setStyle({
                  weight: 5,
                  color: '#666',
                  dashArray: '',
                  fillOpacity: 0.7
              });
      
              if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                  layer.bringToFront();
              }
      
              info.update(layer.feature.properties);
          }
      
          function resetHighlight(e) {
              statesLayer.resetStyle(e.target);
              info.update();
          }
      
          function zoomToFeature(e) {
            resultmap.fitBounds(e.target.getBounds());
          }
      
          function onEachFeature(feature, layer) {
              layer.on({
                  mouseover: highlightFeature,
                  mouseout: resetHighlight,
                  click: zoomToFeature
              });
          }
      
          // Ajouter des états sur la carte
          var statesLayer = L.geoJson(statesData, {
              style: style,
              onEachFeature: onEachFeature
          }).addTo(resultmap);
      
          // Ajouter une infobulle pour afficher des informations
          var info = L.control();
      
          info.onAdd = function (map) {
              this._div = L.DomUtil.create('div', 'info');
              this.update();
              return this._div;
          };
      
          info.update = function (props) {
              this._div.innerHTML = '<h4>Electorals Results</h4>' +  (props ?
                  '<b>' + props.name + '</b><br />' + props.density + ' votes / km²'
                  : 'Hover over states');
          };
      
          info.addTo(resultmap);
      
          // Légende
          var legend = L.control({position: 'bottomright'});
      
          legend.onAdd = function (map) {
              var div = L.DomUtil.create('div', 'info legend'),
                  grades = [0, 5, 10, 20, 40, 60, 80],
                  labels = [];
      
              for (var i = 0; i < grades.length; i++) {
                  div.innerHTML +=
                      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
              }
      
              return div;
          };
      
          legend.addTo(resultmap);
}
    