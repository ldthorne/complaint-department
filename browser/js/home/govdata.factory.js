app.factory('Entries', function($http) {
    return {
        getEntries: function() {
            return $http.get('/api/govData/entries')
            .then(function(res) {
                return res.data;
            })
        }
    }
})