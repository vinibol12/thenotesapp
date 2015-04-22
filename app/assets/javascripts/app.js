function NotesProvider(){
    this.$get= angular.noop
}
angular.module('theNotesApp',['ui.router'])
     .config(['$stateProvider',
              '$urlRouterProvider',
              function($stateProvider, $urlRouterProvider){
                  $stateProvider
                      .state('home', {
                          url: '/home',
                          //the templateUrl value is the id for the routing
                          templateUrl: '/home.html',
                          controller: 'mainCtrl',
                          resolve: {
                              notePromise: ['notesFactory', function(notesService) {
                                  return notesService.getAll();
                              }]
                          },
                          console: console.log('ello')

                      })
                      .state('navbar',{
                          url: '/navbar',
                          templateUrl: '/navbar.html',
                          controller: 'mainCtrl'
                      })
                      .state('notes', {
                          url: '/notes/{id}',
                          templateUrl: '/notes.html',
                          controller: 'notesCtrl',
                          resolve: {
                              note: ['$stateParams', 'notesFactory', function ($stateParams, notesService) {
                                  return notesService.get($stateParams.id);
                              }]
                          }
                      });
                  $urlRouterProvider.otherwise('home');
              }
     ])

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
        $scope.deleteNote = function(note) {
            notesService.delete(note.id);
            notesService.getAll();
        };
     }])

    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams', function(
            $scope,
            notesService,
            note,
            $stateParams) {
                $scope.note = note;
                $scope.title = note.title;
                $scope.body = note.body;
                $scope.updateNote = function() {
                    notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                    notesService.getAll();
                }
     }])

