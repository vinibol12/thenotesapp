angular.module('theNotesApp')
    //read GOF factory pattern
    //a factory is a factory of objects
    //when a factory is injected the injected element is the result of the factory, what it returns,
    //while when you inject a controller the controller itself is injected

    .controller('mainCtrl',['$scope', 'notesFactory', function($scope, notesService){

        $scope.notes = notesService.notesObjectInService;

        notesService.getAll();

        $scope.addNote = function(){
            if ($scope.title === "" ) {
                return;
            }
            notesService.create({
                title: $scope.title,
                body:$scope.body
            });
            $scope.title= '';
            $scope.body= '';
        };
    }])
