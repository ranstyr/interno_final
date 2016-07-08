import { Auth }     from './auth';
import { Signup }   from './sign-up';
import { Network }  from './network';
import { AppState } from './app-state';
import { Password } from './password';

//Factories
import  { translationLoader } from './translation-loader'

export default angular.module('si.services', [])
  .service('Auth', Auth)
  .service('Signup', Signup)
  .service('Network', Network)
  .service('AppState', AppState)
  .service('Password', Password)

  //Factories
  .factory('translationLoader', translationLoader);