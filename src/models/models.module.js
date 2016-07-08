import { UserData }          from './user-data';
import { Portfolios }        from './portfolios';
import { ErrorCodes }        from './error-codes';
import { GroupAttributes }   from './group-attributes';
import { GroupTranslations } from './group-translations';

export default angular.module('si.models', [])
  .service('UserData', UserData)
  .service('Portfolios', Portfolios)
  .service('ErrorCodes', ErrorCodes)
  .service('GroupAttributes', GroupAttributes)
  .service('GroupTranslations', GroupTranslations);