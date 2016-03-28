app.controller('HomeCtrl', function($http, $scope, location, entries) {
	$scope.entries = entries.slice(0,4);
    const userLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
    }
    $scope.send = function(data){
    	return $http.post('/api/govData/entry', data)
    	.then(function(res){
    		$scope.entries = res.data.slice(0,4)
    	})
    }

    $scope.sendAddress = function(address){
    	return $http.post('/api/govData/customAddress', address)
    	.then(function(res){
			$scope.cityCouncilpeople = res.data.cityCouncilmen;
	        $scope.representatives = res.data.representatives;
	        $scope.senators = res.data.senators
    	})
    }
    return $http.post('/api/govData', userLocation)
    .then(function(res) {
        $scope.cityCouncilpeople = res.data.cityCouncilmen;
        $scope.representatives = res.data.representatives;
        $scope.senators = res.data.senators
    })
})
