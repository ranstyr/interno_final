export class GroupAttributes {

  /* @ngInject */
  constructor(Network, LOADING_TYPES) {
    this.Network       = Network;
    this.LOADING_TYPES = LOADING_TYPES;

    // Request path
    this.path = 'ClientAttributes';

    // Set defaults
    this.preLogin         = {};
    this.postLogin        = {};
    this.preLoginGroupID  = null;
    this.preLoginBrokerID = null;
  }

  getGroupAttributes(loadingTypeID) {
    const query = {
      LoadingTypeID: loadingTypeID
    };

    return this.Network.get(this.path, query)
      .then(result => {
        if (result.Succeeded) {
          if (loadingTypeID === this.LOADING_TYPES.preLogin) {
            // Reset `preLogin` and fill with the new data
            angular.copy(result.Response.AttributesCollection, this.preLogin);
          }
          else if (loadingTypeID === this.LOADING_TYPES.postLogin) {
            // Reset `postLogin` and fill with the new data
            angular.copy(result.Response.AttributesCollection, this.postLogin);
          }
          return result.Response.AttributesCollection;
        }
      });
  }

  getLangList() {
    if (!_.isEmpty(this.postLogin)) {
      return this.postLogin.BROKER_LANGUAGES;
    }

    if (!_.isEmpty(this.preLogin)) {
      return this.preLogin.BROKER_LANGUAGES;
    }

    return {};
  }

  getDefaultLang() {
    if (!_.isEmpty(this.postLogin)) {
      return this.postLogin.DEFAULT_LANGUAGE;
    }

    if (!_.isEmpty(this.preLogin)) {
      return this.preLogin.DEFAULT_LANGUAGE;
    }

    return {};
  }
}
