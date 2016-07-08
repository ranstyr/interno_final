/**
 * This Factory handles async loading of translation objects
 *
 * Reference:
 * https://github.com/angular-translate/angular-translate/wiki/Asynchronous-loading
 */

export /* @ngInject */ function translationLoader(GroupTranslations, AppState, LOADING_TYPES) {
  /**
   * Fetch the translations object for a specific language (or the default one)
   *
   * @param  {string} lang Language code (e.g. 'en-US')
   * @return {Object}      Promise
   */
  function loadTranslations(lang) {
    let loadingTypeID = LOADING_TYPES.all;

    if (!AppState.preLoginMode) {
      loadingTypeID = LOADING_TYPES.postLogin;
    }
    else {
      loadingTypeID = LOADING_TYPES.preLogin;
    }

    let promise = GroupTranslations.getTranslations(lang, loadingTypeID);
    return promise;
  }

  /**
   * Translations handler, called when using `$translate.use`
   *
   * @param  {Object} options `$translate.use` options (e.g. { key: 'en-US' })
   * @return {Object}         Promise
   */
  return function (options) {
    return loadTranslations(options.key);
  };
}
