//map 
mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aWNoZXIiLCJhIjoiY2t1ZnNveHV0MXVoYTJ2bXh4djZxYzg2eiJ9.1WUtgsDkcqXj7MUijYa4Iw';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.337519864510677, 48.86060618869818],
});



const camera = map.getFreeCameraOptions();

const position = [2.3364433340255175, 48.86116284407971];
const altitude = 850;

camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
camera.lookAtPoint([2.3364433340255175, 48.86116284407971]);
// Apply camera changes
map.setFreeCameraOptions(camera);

const nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
});
map.addControl(nav, 'top-right');

// Create a new marker.
const marker1 = new mapboxgl.Marker({
    color: '#121212',
})
    .setLngLat([2.336368410112811, 48.860938218071325])
    .addTo(map);

const marker2 = new mapboxgl.Marker({
    color: '#626262',
})
    .setLngLat([2.3396649202213715, 48.86072613561548])
    .addTo(map);

const marker3 = new mapboxgl.Marker({
    color: '#626262',
})
    .setLngLat([2.3363525678617747, 48.86246741324038])
    .addTo(map);

const marker4 = new mapboxgl.Marker({
    color: '#626262',
})
    .setLngLat([2.33326094678358, 48.86020467250646])
    .addTo(map);

const marker5 = new mapboxgl.Marker({
    color: '#626262',
})
    .setLngLat([2.333008926868113, 48.86192297056932])
    .addTo(map);
