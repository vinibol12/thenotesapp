angular.module('theNotesApp')
    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams',
        '$state',
        'Flash',
        function($scope, notesService, note, $stateParams, $state, Flash) {
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;

            function deletedNotice() {
                var message = '<strong> Success!!</strong>  Your note has been deleted!';
                Flash.create('success', message, 'custom-class');
            };


            $scope.updateNote = function() {
                notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                notesService.getAll();
                $state.go('home');
                $state.go('note/{id}');

            };

            $scope.deleteNote = function(note) {
                notesService.delete(note.id);
                $state.go('home');
                deletedNotice();
                notesService.getAll();

            };

        }])

