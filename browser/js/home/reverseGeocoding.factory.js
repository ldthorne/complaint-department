app.factory('ReverseGeocoding', function() {
    return {
        getAddressFromCoords: function(location) {
            console.log(location)
            // return $http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&zoom=18&addressdetails=1')
            // .then(function(res) {
            //     return res;
            // })
        }
    }
})