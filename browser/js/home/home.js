app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	location: function(PromiseGeolocation){
        		return PromiseGeolocation.getLocation();
        	},
            entries: function(Entries){
                return Entries.getEntries();
            }

        }
    });
});