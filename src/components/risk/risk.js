import template from './risk.html';

class RiskController {

  /* @ngInject */
  constructor($compile, $filter) {
    this.$compile  = $compile;
    //todo - once we will have translation in place we need to bind it from html and delete this line
    this.tooltip = "PlaceHolder for tooltip - need to add translation"
    this.setRisk = (risk) => {
      this.riskLevel = risk;
    };
  }

}

function link(scope, element, attrs, ctrl) {

}

export function siRisk() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    scope: {},
    bindToController: {
      values: '=',
      onPortfolioChange: '&',
      onRiskChange: '&',
      riskLevel: '=',
      portfolioData : '='
    },
    controller: RiskController,
    controllerAs: 'vm',
    link: link
  };
}
