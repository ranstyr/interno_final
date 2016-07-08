export class GroupTranslations {

  /* @ngInject */
  constructor($location, $localStorage, Network, LANGUAGES_MAP, GroupAttributes) {
    this.$location     = $location;
    this.$localStorage = $localStorage;

    this.Network         = Network;
    this.LANGUAGES_MAP   = LANGUAGES_MAP;
    this.GroupAttributes = GroupAttributes;

    // Request path
    this.path = 'ClientTranslations';

    // Set defaults
    this.getStorageLanguage();
    this.initCurrentLanguage();
  }

  /**
   * 1. Extract query string
   * 2. Save query string data to $localStorage.selectedLanguage
   */
  getStorageLanguage() {
    let qs = this.$location.search();
    if (_.isEmpty(qs)) {
      return;
    }

    if (qs.lang) {
      this.$localStorage.selectedLanguage = qs.lang;
    }

  }

  /**
   Language priority is:
   1. Language from localStorage (saved from query string)
   2. Browser language
   3. Broker default language (attribute)
   4. 'en-US'
   */
  initCurrentLanguage() {
    this.currentLanguage   = 'en-US'; //Default language
    this.isLanguageDefault = true;

    const langList    = this.GroupAttributes.getLangList();
    const storageLang = this.$localStorage.selectedLanguage;

    if (langList[storageLang]) {
      this.currentLanguage   = langList[storageLang].code;
      this.isLanguageDefault = false;
    }
    else {
      const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || navigator.browserLanguage;
      if (langList[browserLang]) {
        this.currentLanguage = langList[browserLang].code;
      }
      else {
        const brokerLang = this.GroupAttributes.getDefaultLang;
        if (langList[brokerLang]) {
          this.currentLanguage = langList[brokerLang].code;
        }
      }
      this.isLanguageDefault = false
    }
    return this.currentLanguage;
  }

  getTranslations(lang, loadingTypeID) {
    const query = {
      CultureID: this.LANGUAGES_MAP[lang] || this.LANGUAGES_MAP[this.currentLanguage],
      LoadingTypeID: loadingTypeID
    };

    return this.Network.get(this.path, query)
      .then(result => result.Response.TranslationCollection);
  }

  getCurrentLanguage() {
    if (!this.isLanguageDefault) {
      return this.currentLanguage;
    }
    else {
      return this.initCurrentLanguage();
    }
  }

  setCurrentLanguage(lang) {
    this.currentLanguage                = lang;
    this.$localStorage.selectedLanguage = lang;
  }

}
