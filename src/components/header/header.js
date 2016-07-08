import template from './header.html';

class HeaderController {

  /* @ngInject */
  constructor($translate, Auth, SignInManager) {
    this.$translate = $translate;

    this.Auth          = Auth;
    this.SignInManager = SignInManager;
    //this.GroupAttributes   = GroupAttributes;
    //this.GroupTranslations = GroupTranslations;

    this.init();
  }

  /**
   * Initialize all the parameters with their default values
   */
  init() {
    //this.languagesDropdown = {
    //  mainIconClass: this.GroupTranslations.getCurrentLanguage(),
    //  listOfOptions: this.getLanguagesList()
    //};
    this.languagesDropdown = {
      mainIconClass: 'en-US',
      listOfOptions: this.getLanguagesList()
    };
  }

  login() {
    this.SignInManager.login();
  }

  /**
   * Check if user is already logged in based on the authData
   */
  isLoggedIn() {
    return this.Auth.getAuthData();
  }

  /**
   * Create a list of all languages supported and defined by the broker (from attribute)
   */
  getLanguagesList() {
    //TODO: Remove this hard coded after product adds attribute
    //let langList = this.GroupAttributes.getLangList();
    let langList = {
      "en-US": {code: "en-US", displayname: "lblEnglish"},
      "ja-JP": {code: "ja-JP", displayname: "lblJapanese"},
      "zh-CN": {code: "zh-CN", displayname: " lblChineseCN"},
      "ru-RU": {code: "ru-RU", displayname: "lblRussian"},
      "zh-CHT": {code: "zh-CHT", displayname: " lblChineseCHT"}
    };

    // Parse data for the Dropdown component
    return _.map(langList, lang => {
      return {
        text: this.$translate.instant(lang.displayname),
        iconClass: lang.code
      };
    });
  }

  /**
   * On Languages dropdown selection
   *
   * @param  {Object} selection Option object (text, iconClass)
   */
  languageChange(selection) {
    this.languagesDropdown.mainIconClass = selection.iconClass;

    //this.GroupTranslations.setCurrentLanguage(selection.iconClass);

    // Fetch translations for the selected language
    //this.$translate.use(this.GroupTranslations.getCurrentLanguage());
    this.$translate.use('en-US');
  }
}

export function siHeader() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    scope: {},
    controller: HeaderController,
    controllerAs: 'Header'
  };
}
