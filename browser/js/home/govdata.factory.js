app.factory('GovData', function($http) {
    return {
        getMembers: function() {
            return $http.get('/api/govData').then(function(res) {
                return res.data.objects
            })
        }
    }
})