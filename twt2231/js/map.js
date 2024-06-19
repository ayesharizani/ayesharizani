var OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var OSM_ATTRIB = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var osmLayer = L.tileLayer(OSM_URL, { attribution: OSM_ATTRIB });

var map = L.map('map').setView([10, 111], 5);
var WAQI_URL = "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=8fe6459393e7075dc0f12eaf7ef7d9c71cfce641";
var WAQI_ATTR = 'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>';
var waqiLayer = L.tileLayer(WAQI_URL, { attribution: WAQI_ATTR });

map.addLayer(osmLayer).addLayer(waqiLayer);

// Function to get current location AQI
function getCurrentLocationAQI() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var aqiURL = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=8fe6459393e7075dc0f12eaf7ef7d9c71cfce641`;

      fetch(aqiURL)
        .then(response => response.json())
        .then(data => {
          var aqi = data.data.aqi;
          var city = data.data.city.name;
          document.getElementById('current-location-aqi').innerHTML = `Current location (${city}): AQI ${aqi}`;
        })
        .catch(error => {
          console.error('Error fetching AQI:', error);
        });
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

getCurrentLocationAQI();