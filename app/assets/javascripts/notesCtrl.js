angular.module('theNotesApp')
    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams',
        '$state',
        'Flash',
        '$interval',
        function($scope, notesService, note, $stateParams, $state, Flash, $interval) {
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;

            console.log($state.is('notes'))

            var contentChanged = false;

            $scope.$watchGroup(['title', 'body'], function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    contentChanged = true;
                }
            });

            function checkForChangeAndSave() {
                if(contentChanged) {
                    updateNote();
                    contentChanged = false;
                }
            }

            $interval(checkForChangeAndSave, 5000);


            function updateNote() {
                notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                notesService.getAll();
            };

            function deletedNotice() {
                var message = '<strong> Success!!</strong>  Your note has been deleted!';
                Flash.create('success', message, 'custom-class');
            };

            $scope.deleteNote = function(note) {
                notesService.delete(note.id);
                $state.go('home');
                deletedNotice();
                notesService.getAll();
            };

        }])

