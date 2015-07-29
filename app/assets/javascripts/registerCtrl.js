angular.module('theNotesApp')
    .controller('registerCtrl', ['$scope','Auth', '$state', '$http', function($scope, Auth, $state, $http ){
        $scope.register = function() {
            Auth.register($scope.user).then(function () {
                $http.get('/notes.json').success(function(data){
                    $scope.notes = data;
                    var arraySize = $scope.notes.length-1;
                    var lastNote = $scope.notes[arraySize];
                    $state.go('notes', lastNote);
                });
            });
        };
    }])