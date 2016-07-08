class AccordionItem {

  /* @ngInject */
  constructor($scope, $compile) {
    this.$scope   = $scope;
    this.$compile = $compile;
    //todo - once we will have translation in place we need to bind it from html and delete this line
    this.tooltip = "PlaceHolder for tooltip - need to add translation"
  }

  /**
   * Expand accordion item on title click
   * @return undefined
   */
  expand() {
    this.$scope.accordionCtrl.expandItem(this.$scope);
  };

  /**
   * Return if the accordion is expandable
   * @returns {boolean|*}
   */
  isExpandable() {
    return this.$scope.expandable;
  };

  /**
   * Return if the accordion is active
   * @return undefined
   */
  isActive() {
    return this.$scope.active;
  };

  /**
   * Expand the next accordion item if current form is valid
   * @return undefined
   */
  expandNext() {

    // In case there is form element, continue only if form is valid
      if (this.$scope.form && this.$scope.form.$invalid) {
          return;
      }

      let nextScope        = this.$scope.next;
    nextScope.expandable = true;
    this.$scope.accordionCtrl.expandItem(nextScope);
    this.$scope.accordionCtrl.onChange();

  };

}

/**
 * Dynamically require the accordion item template
 * and compile the content with the current scope
 * @param tElem - <si-accordion-item> element
 * @param tAttr <si-accordion-item> element attributes
 * @returns {{pre: pre, post: linkFn}} - the link function
 */
function compileFn(tElem, tAttr) {

  return {
    pre: function (scope, element, attributes, controller) {

      const ctrl = controller[1];                         // Get local controller
      const template = require(attributes.templateUrl);   // Dynamically load the template
      const linkFn = ctrl.$compile(template);             // Compile the template
      const content = linkFn(scope);                      // Link the compiled template with the scope

      element.append(content);
    },
    post: linkFn
  }
}

/**
 * Register each accordion item with the parent directive (<si-accordion>)
 * @param scope
 * @param element
 * @param attrs
 * @param controller
 * @returns undefined
 */
function linkFn(scope, element, attrs, controller) {

  const accordionCtrl = controller[0];
  scope.accordionCtrl = accordionCtrl;

  // Add accordion item to the list
  accordionCtrl.addItem(scope);
}

export function siAccordionItem() {

  return {
    restrict: 'E',
    bindToController: {
      title: '@',
      templateUrl: '@'
    },
    require: ['^siAccordion', 'siAccordionItem'],
    controller: AccordionItem,
    controllerAs: 'AccordionItem',
    compile: compileFn
  };

}