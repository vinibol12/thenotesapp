angular.module('theNotesApp')
    .controller('mainCtrl',['$scope', 'notesFactory', function($scope, notesService){

        var notes = notesService.notesObjectInService;
        $scope.$watch('notes',function(newValue, oldValue) {
            if(newValue !== oldValue) {

            console.log(newValue);
            console.log(oldValue);
            }
        });
        $scope.notes = notes;
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
            $scope.body=  '';
        };
    }])

    //read GOF factory pattern
    //a factory is a factory of objects
    //when a factory is injected the injected element is the result of the factory, what it returns,
    //while when you inject a controller the controller itself is injected
