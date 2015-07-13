angular.module('theNotesApp')
    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams',
        '$state',
        'Flash',
        '$timeout',
        function($scope, notesService, note, $stateParams, $state, Flash, $timeout) {
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;
            //console.log(note);
            //console.log(note.title);
            //console.log(note.body);
            function updateNote() {
                notesService.update($stateParams.id, {title: $scope.title});
                notesService.getAll();
            };

            function deletedNotice() {
                var message = '<strong> Success!!</strong>  Your note has been deleted!';
                Flash.create('success', message, 'custom-class');
            };

            $scope.$watch('title',function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    $timeout( updateNote , 5000);
                };
            });

            $scope.deleteNote = function(note) {
                notesService.delete(note.id);
                $state.go('home');
                deletedNotice();
                notesService.getAll();
            };

        }])

