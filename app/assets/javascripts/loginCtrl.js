angular.module('theNotesApp')
    .controller('loginCtrl', ['$scope','Auth', '$state', '$http', function($scope, Auth, $state, $http ){

        $scope.login = function() {
            Auth.login($scope.user).then(function () {
                $http.get('/notes.json').success(function(data){
                    $scope.notes = data;
                var arraySize = $scope.notes.length-1;
                var lastNote = $scope.notes[arraySize];
                    $state.go('notes', lastNote)
                });
            });
        };
    }]);


