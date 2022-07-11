//***** Google Maps Initialization  *****/
const initMap = () => {

    //***** Map creation *****/
    const map = new google.maps.Map(document.querySelector('.map'), { zoom: 15 });

    //***** Geocoder initialization *****/
    const geocoder = new google.maps.Geocoder();

    const address = document.querySelector('.address').innerHTML;

    geocoder.geocode({ address: address}, (results, status) => {
        if(status == 'OK') {
            console.log(results);
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
    });
}

window.initMap = initMap;