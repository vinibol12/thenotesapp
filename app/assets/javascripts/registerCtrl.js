angular.module('theNotesApp')
    .controller('registerCtrl', ['$scope','Auth', '$state', '$http', 'notesFactory', function($scope, Auth, $state, $http, notesService ){
        $scope.register = function() {
            Auth.register($scope.user).then(function () {
                $http.get('/notes.json').success(function(data){
                    $scope.notes = data;
                    if( $scope.notes.length === 0){
                        notesService.create({
                                title: 'Untitled',
                                body: ''
                            }
                        ).success(function(note){
                                $state.go('notes', note)
                            });
                    }
                    else {
                        var arraySize = $scope.notes.length - 1;
                        var lastNote = $scope.notes[arraySize];
                        $state.go('notes', lastNote);
                    }
                });
            });
        };
    }]);