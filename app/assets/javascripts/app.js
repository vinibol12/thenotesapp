angular.module('theNotesApp', ['ui.router', 'templates', 'Devise'])
     .config(['$stateProvider',
              '$urlRouterProvider',
              function($stateProvider, $urlRouterProvider){
                  $stateProvider
                      .state('home', {
                          url: '/home',
                          //the templateUrl value is the id for the routing
                          templateUrl: 'home.html',
                          controller: 'mainCtrl',
                          resolve: {
                              notePromise: ['notesFactory', function(notesService) {
                                  return notesService.getAll();
                              }]
                          }
                      })
                      .state('navbar',{
                          url: '/navbar',
                          templateUrl: 'navbar.html',
                          controller: 'mainCtrl'
                      })
                      //Task: implement state in case note is empty go back to home state.

                      .state('notes', {
                          url: '/note/{id}',
                          templateUrl: 'note.html',
                          controller: 'notesCtrl',
                          resolve: {
                              note: ['$stateParams', 'notesFactory', function ($stateParams, notesService) {
                                  return notesService.get($stateParams.id);
                              }]
                          }
                      })
                      .state('login', {
                          url: '/login',
                          templateUrl: 'login.html',
                          controller: 'authCtrl'
                      })
                      .state('register', {
                          url: '/register',
                          templateUrl: 'register.html',
                          controller: 'authCtrl'
                      });
                  $urlRouterProvider.otherwise('home');
              }
     ])




