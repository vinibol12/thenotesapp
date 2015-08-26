angular.module('theNotesApp')
    .controller('mainCtrl',['$scope', 'notesFactory', '$interval', '$state', function($scope, notesService, $interval, $state){



        $scope.notes = notes;
        notesService.getAll();

        //Watches for changes in the value of note and if there is a change it moves to the just created note's state
        $scope.$watch(function() { return notesService.newNote; }, function(newVa, oldVa) {
            if (newVa !== oldVa) {
                $state.go('notes', newVa)
            }
        }, true);
    }])

    //read GOF factory pattern
    //a factory is a factory of objects
    //when a factory is injected the injected element is the result of the factory, what it returns,
    //while when you inject a controller the controller itself is injected
