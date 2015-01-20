function initialize() {

        // Assign varibales and options
        var mapOptions = {
            center: {
                lat: 28.613,
                lng: 77.209
            },
            zoom: 11
        };
        var infowindow = new google.maps.InfoWindow();
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        // Overalapping marker Assign
        var oms = new OverlappingMarkerSpiderfier(map);

        oms.addListener('click', function(marker, event) {
            infowindow.setContent(marker.content);
            infowindow.open(map, marker);
        });

        oms.addListener('spiderfy', function(markers) {
            infowindow.close();
        });




        var sheets = {
            "1": {
                "name": "type1",
                "marker": "http://www.google.com/mapfiles/markerA.png"
            },
            "2": {
                "name": "Lab",
                "marker": "http://www.google.com/mapfiles/markerB.png"
            },
            "3": {
                "name": "Co.owned PSC",
                "marker": "http://www.google.com/mapfiles/markerC.png"
            },
            "4": {
                "name": "collection center",
                "marker": "http://www.google.com/mapfiles/markerD.png"
            },
            "5": {
                "name": "test2",
                "marker": "http://www.google.com/mapfiles/markerE.png"
            },
            "6": {
                "name": "HLM-M&A",
                "marker": "http://www.google.com/mapfiles/markerF.png"
            },
            "7": {
                "name": "Pick up Points",
                "marker": "http://www.google.com/mapfiles/markerG.png"
            }
        };

        for (var key in sheets) {
            //console.log(sheets[key].marker)



            var ds = new Miso.Dataset({
                importer: Miso.Dataset.Importers.GoogleSpreadsheet,
                parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
                key: "1Le0fp1BbyejDQhAIxgyJvl1ON_sa8tkIVKsii4fZ_ro",
                worksheet: key
            });

            ds.fetch({
                success: function() {
                    this.each(function(row) {
                        loadMarker(row, key);
                    });

                },
                error: function() {
                    console.log("Are you sure you are connected to the internet?");
                }
            });
        }



        /* var ds2 = new Miso.Dataset({
      importer: Miso.Dataset.Importers.GoogleSpreadsheet,
      parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
      key: "1Le0fp1BbyejDQhAIxgyJvl1ON_sa8tkIVKsii4fZ_ro",
      worksheet: "5"
    });

    ds2.fetch({
      success: function() {
        this.each(function(row) {
          loadMarker(row, "http://www.google.com/mapfiles/markerB.png");
        });
      },
      error: function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });
*/

        function loadMarker(tcenter, key) {
          console.log(tcenter);
          markericon="http://www.google.com/mapfiles/markerG.png";
            var myLatlng = new google.maps.LatLng(tcenter.Latitude, tcenter.Longitude);

            function contentString() {
                var content = '';
                for (var key in tcenter) {
                    if (key != "_id")
                        content += '<dt>' + key + '</dt><dd>' + tcenter[key] + '</dd>';
                }
                return content
            }
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h3>' + tcenter['Name'] + '</h3>' +
                '<dl class="dl-horizontal">' + contentString() + '</dl>' +
                '</div>' +
                '</div>';


            // Add Markers
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                content: contentString,
                icon: "assets/img/markers/"+tcenter.Marker
            });
            oms.addMarker(marker);
            
            
        }

    } // initialize
var map = google.maps.event.addDomListener(window, 'load', initialize);







// jQuery(document).ready(function($) {
//   var oms;

//   var MarkerData = {
//     "lat": 0,
//     "lng": 0,
//     "data": "Overlay text here."
//   };

//   $('#selector').gmap3({
//     action: 'init',
//     options: {
//       scaleControl: false,
//       center: [52.132633, 5.291266],
//       zoom: 7,
//       mapTypeControl: false,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     },
//     callback: function(map) {
//       oms = new OverlappingMarkerSpiderfier(map, {
//         markersWontMove: true,
//         markersWontHide: true,
//         keepSpiderfied: true,
//         nearbyDistance: 10,
//         legWeight: 5
//       });
//     }
//   }, {
//     action: 'addMarkers',
//     markers: MarkerData,
//     marker: {
//       options: {
//         icon: new google.maps.MarkerImage('http://www.example.com/icon.png')
//       }
//     },
//     callback: function(markers) {
//       $.each(markers, function(i, marker) {
//         marker.data = MarkerData[i].data;

//         oms.addMarker(marker);
//       });
//     }
//   });

//   oms.addListener('click', function(marker) {
//     $('#selector').gmap3({
//       action: 'clear',
//       name: 'overlay'
//     }, {
//       action: 'addOverlay',
//       latLng: marker.getPosition(),
//       content: '<div class="map-overlay">' + marker.data + '</div>',
//       offset: {
//         x: -30,
//         y: 0
//       }
//     }, {
//       action: 'panTo',
//       args: [marker.position]
//     });
//   });
// });
