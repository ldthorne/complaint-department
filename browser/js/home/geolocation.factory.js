app.factory('PromiseGeolocation', function($geolocation) {
    return {
        getLocation: function() {
            return $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(position) {
                return position;
            });
        }
    }
})