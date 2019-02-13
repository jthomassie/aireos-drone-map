"use strict"
//
const mbToken = 'pk.eyJ1Ijoiam9obm55cmljaDAwNyIsImEiOiJjanJqZXc1ZzAwMjR5NDRucjh6NmIwbzV2In0.csQwzQfDjsZuKrFjFAYtaw';
const mbStyle = 'mapbox://styles/johnnyrich007/cjs0pkzzk05vf1fqhos33nipa';

//
mapboxgl.accessToken = mbToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: mbStyle,
  center: [-45.0,30.0],
  zoom: 1.4
});
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});

const showLocationContext = e => {
  console.log('lat',e.result.center[1], 'lon',e.result.center[0]);
  let breadCrumbs = '';
  let ctx = e.result.context.reverse();
  //
  let i = 0;
  for ( let value of ctx ) {
    breadCrumbs +=`<button type="button" id="btn${i}" class="btn btn-xs btn-outline-primary">${ value.text }</button>`;
    i++;
  }
  $('#crumbs').html(breadCrumbs);
  //
  // i = 0;
  // for ( let value of ctx ) {
  //   let q = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ value.text }.json?access_token=${ mbToken }`;
  //   //
  //   $('#btn'+i).on('click', function (e) {
  //     e.preventDefault();
  //     console.log(i, q);
  //   });
  //   i++;
  // }
};

map.addControl(geocoder);
$('.mapboxgl-ctrl-geocoder').appendTo($('#search'));

map.on('load', function() {
  //
  map.addSource('white-point', {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": []
    }
  });
  map.addLayer({
    "id": "point",
    "source": "white-point",
    "type": "circle",
    "paint": {
      "circle-radius": 8,
      "circle-color": "#fff"
    }
  });
  geocoder.on('result', function(e) {
    showLocationContext(e);
    map.getSource('white-point').setData(e.result.geometry);
  });
});
