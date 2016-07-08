import template from './investment-info.html';

class controller {

  /* @ngInject */
  constructor() {


  }

}

export function siInvestmentInfo() {
  return {
    restrict: 'E',
    template: template,
    bindToController: {
      riskLevel : '=',
      onPortfolioChange: '&',
      portfolioData : '='
    },
    scope: {},
    replace: true,
    controller: controller,
    controllerAs: 'vm'
  };
}
