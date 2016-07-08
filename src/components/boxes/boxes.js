import template from './boxes.html';


class BoxesController {

    /* @ngInject */
    constructor(GroupAttributes, $compile, $scope) {

    }

    /**
     * Set risk value on click
     * @param {number} value - the selected value
     * @return undefined
     */
    setRisk(value) {
        this.risk = value;
    }

    /**
     * Set checked class on selected box
     * @param {string} category - the selected category
     * @param {number} value - the selected value
     * @return {json} input changed indication
     */
    boxClass(category, value) {
        return {
            'input-checked-parent': this.risk === value
        };
    }
}

export function siBoxes() {
    return {
        restrict: 'E',
        template: template,
        bindToController: { },
        scope: true,
        replace: true,
        controller: BoxesController,
        controllerAs: 'vm',
        link: () => {}
    };
}
