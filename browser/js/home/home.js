app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	members: function(GovData){
        		return GovData.getMembers()
        		.then(function(res){
        			return res;
        		})
        	},
        	location: function(PromiseGeolocation){
        		return PromiseGeolocation.getLocation();
        	}

        }
    });
});