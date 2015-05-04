angular.module('theNotesApp')
    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams',
        '$state', function($scope, notesService, note, $stateParams, $state) {
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;
            $scope.updateNote = function() {
                notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                notesService.getAll();
            };

            $scope.deleteNote = function(note) {
                notesService.delete(note.id);
                $state.go('home');
                alert('Your note has been deleted!')
                notesService.getAll();

            };

        }])