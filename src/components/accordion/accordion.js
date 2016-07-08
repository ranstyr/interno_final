import template from './accordion.html';

/* @ngInject */
function siAccordionController($scope, $localStorage) {

    this.$localStorage = $localStorage;
    this.accordionItems = [];

    /**
     * Select accordion tab (pragmatically or manually)  
     * @param selectSection - the scope of the tab to expand/select
     */
    this.expandItem = (scope) => {

        if (!scope.expandable)
            return;

        this.accordionItems.forEach((section) => {

            if (section.scope === scope) {
                section.scope.active = !section.scope.active;
            } else
                section.scope.active = false;
        });
    };

    /**
     * Register the <si-accordion-tab> in this.sections array and initialize default settings
     * @param sectionScope - the tab to register
     */
    this.addItem = (itemScope) => {

        this.accordionItems.push({scope: itemScope});

        // Create linked list
        if (this.accordionItems.length > 1) {
            let prev = this.accordionItems[this.accordionItems.length - 2].scope;
            let next = this.accordionItems[this.accordionItems.length - 1].scope;
            prev.next = next;
        }

        // Expand the first item
        if (this.accordionItems.length === 1) {
            this.accordionItems[0].scope.active = true;
            this.accordionItems[0].scope.expandable = true;
        }
    };

    /**
     * Collapse all accordion items
     */
    this.collapseAll = () => {

        this.accordionItems.forEach((item) => {
            item.scope.active = false;
        });
    };
}

export function siAccordion() {

    return {
        restrict: 'EA',
        replace: true,
        template: template,
        controller: siAccordionController,
        scope: {},
        bindToController :{
            items: '=',
            onChange: '&'
        },
        controllerAs: 'Accordion'
    };
}