var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 7,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    // Use geocoding service instead of external API call
    var geocoder = new google.maps.Geocoder();
    var addresses = ['New York'];

    for (var x = 0; x < addresses.length; x++) {
        geocoder.geocode({
            'address': addresses[x]
        }, function(results, status) {
            if (status === 'OK' && results[0]) {
                var location = results[0].geometry.location;
                new google.maps.Marker({
                    position: location,
                    map: map,
                    icon: 'images/loc.png'
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
                // Fallback: add marker at default location
                new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: 'images/loc.png'
                });
            }
        });
    }
    
}

// Check if Google Maps API is loaded before initializing
function initializeMap() {
    if (typeof google !== 'undefined' && google.maps) {
        init();
    } else {
        console.log('Google Maps API not loaded');
        // Hide the map container if API fails to load
        var mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.style.display = 'none';
        }
    }
}

google.maps.event.addDomListener(window, 'load', initializeMap);