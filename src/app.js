// Vendor libraries:
import 'expose?jQuery!expose?$!jquery/dist/jquery.min';
import 'npm-font-open-sans';

// Application assets:
import 'assets/scss/main.scss';

// Angular and 3rd party modules:
import angular                  from 'angular';
import ngAnimate                from 'angular-animate';
import momentJS                 from 'expose?moment!moment/moment';
import lodash                   from 'lodash';
import uiRouter                 from 'angular-ui-router';
import ngCurrency               from 'ng-currency';
import ngStorage                from 'ngStorage';
import ngTranslate              from 'angular-translate';

// Application modules:
import siCommon        from 'common/common.module';
import siModels        from 'models/models.module';
import siComponents    from 'components/components.module';
import siHome          from 'states/home.module';
import siManagers      from 'managers/managers.module';

let modules = [
  ngAnimate,
  uiRouter,
  ngCurrency,
  ngTranslate,
  ngStorage.name,
  siCommon.name,
  siModels.name,
  siManagers.name,
  siComponents.name,
  siHome.name,
  'foundation',
  'mm.foundation'
];

angular.module('interno', modules);

// Bootstrap in strictDI mode
angular.bootstrap(document, ['interno'], {
  strictDi: true
});
