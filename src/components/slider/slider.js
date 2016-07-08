import template from './slider.html';

class SliderController {

  /* @ngInject */
  constructor($filter, $scope, $attrs, $element, $timeout) {

    this.$filter  = $filter;
    this.$scope   = $scope;
    this.$attrs   = $attrs;
    this.$element = $element;
    this.$timeout = $timeout;

    /**
     * callback for every slider change, called by parent
     * @param val - slider value
     */

    this.onChange = (val) => {
      var risk = this.riskLevel;
      this.onPortfolioChange({val: risk});

    };
    /**
     * init controller
     */
    this.init();
  }
  /**
   * updateLabel every time we have new advised risk
   */
  updateLabel() {
    const thumbWidth = 5;
    this.stepSize = this.$attrs.stepsAmount;
    this.slider   = this.$element.find("input");
    this.low      = angular.element(this.$element[0].querySelector('#low'));
    this.label    = angular.element(this.$element[0].querySelector('.label'))

    //initial slider and llabel values
    this.slider[0].value    = this.riskLevel;
    this.label[0].innerHTML = this.riskLevel + ' - Advised';

    let sliderWidth = this.slider[0].scrollWidth;
    let labelrWidth = this.label[0].clientWidth;
    let lowWidth    = this.low[0].clientWidth;

    /*  calculate step Percentage based on number of steps for specific slider
     for example if we have max is 10 and min is 1 - we have 9 steps and the slider
     Percentage increase for every step is 11.11% (10/9)*/

    let stepPercentage = this.max / (this.max - this.min) - 1;
    stepPercentage     = this.$filter('number')(stepPercentage, 2);

    /*lowWidth - labelrWidth / 2 is factor for slider 0 point --> width of min text - half of label width
     sliderWidth*this.riskLevel*stepPercentage is Percentage for every step * risk/step number * sliderWidth
     */
    let labelLeft = lowWidth - labelrWidth / 2 + sliderWidth * (this.riskLevel - 1) * stepPercentage + thumbWidth;

    this.label.setLabelLeft = (left) => {
      let labelLeft = left + 2 + 'px';
      this.label.css({
        left: labelLeft
      });
      return labelLeft;
    };

    this.labelLeft = this.label.setLabelLeft(labelLeft);
  }

  watchPortfolioChange() {
    // Watch portfolioData and update slider
    this.$scope.$watchCollection(
      () => this.portfolioData,
      (newVal) => {
        if (!_.isEmpty(newVal)) {
          this.$timeout(() => this.updateLabel() , 0);
        }
      }
    );

  }

  init() {
    this.watchPortfolioChange();
  }

}

export function siSlider() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    scope: {},
    bindToController: {
      min: '=',
      max: '=',
      stepsAmount: '=',
      onPortfolioChange: '&',
      riskLevel: '=',
      portfolioData: '='

    },
    controller: SliderController,
    controllerAs: 'vm',
  };
}
