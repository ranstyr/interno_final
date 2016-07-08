import { HomeController } from './home';
import homeTemplate       from './home.html';
import login             from './login/login.module';


/* @ngInject */
function appRoutes($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      template: homeTemplate,
      controller: 'HomeController',
      controllerAs: 'Home'
    });

  $urlRouterProvider.otherwise('/home');
}

export default angular.module('interno.app', [
    login.name
  ])
  .controller({HomeController})
  .config(appRoutes)