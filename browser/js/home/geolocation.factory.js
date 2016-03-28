app.factory('PromiseGeolocation', function($geolocation, $http) {
    return {
        getLocation: function() {
            return $geolocation.getCurrentPosition({
                timeout: 6000
            }).then(function(position) {
                return position;
            }).then(null, function(err){
            	alert('We couldn\'t get your exact location, so we estimated.');
            	return $http.get('http://ip-api.com/json')
            	.then(function(res){
            		const location = {
            			coords: {
            				latitude: res.data.lat,
            				longitude: res.data.lon
            			}
            		}
            		return location;
            	})
            })
        }
    }
})