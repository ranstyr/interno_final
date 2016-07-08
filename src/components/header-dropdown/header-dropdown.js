import template from './header-dropdown.html';

class DropdownController {

  /* @ngInject */
  constructor() {
    this.isDropdownMobileOpen = false;
  }

  selectMenuOption(selection) {
    this.onChange({ selection });
    this.isDropdownMobileOpen = !this.isDropdownMobileOpen;
  }

  isActive(selection) {
    return selection.iconClass === this.dropdownList.mainIconClass;
  }

  toggleMobileOpen() {
    this.isDropdownMobileOpen = !this.isDropdownMobileOpen;
  }

}

export function siHeaderDropdown() {
  return {
    restrict: 'E',
    template: template,
    scope: {},
    bindToController: {
      dropdownList: '=',
      dropdownTitle: '@',
      userName: '@',
      onChange: '&'
    },
    controller: DropdownController,
    controllerAs: 'Dropdown'
  };
}
