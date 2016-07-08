export class Auth {

  /* @ngInject */
  constructor($q, $translate, $sessionStorage, Modal, Network, UserData, AppState, API_URLS, ErrorCodes, ORIGIN_TYPES, LOADING_TYPES, GroupAttributes, GroupTranslations) {
    this.$q              = $q;
    this.$translate      = $translate;
    this.$sessionStorage = $sessionStorage;

    this.Modal             = Modal;
    this.Network           = Network;
    this.UserData          = UserData;
    this.AppState          = AppState;
    this.API_URLS          = API_URLS;
    this.ErrorCodes        = ErrorCodes.getErrorCodes();
    this.ORIGIN_TYPES      = ORIGIN_TYPES;
    this.LOADING_TYPES     = LOADING_TYPES;
    this.GroupAttributes   = GroupAttributes;
    this.GroupTranslations = GroupTranslations;

    this._authData = this.$sessionStorage.authData || null;
  }

  login(credentials) {
    const userCredentials = {
      'UserName': credentials.email,
      'PassWord': credentials.password,
      'Origin': this.ORIGIN_TYPES.web
    };

    return this.Network.post('Authentication', userCredentials)
      .then(result => {
        if (!result.Succeeded) {
          const status = {
            code: result.ErrorCode,
            message: this.ErrorCodes[result.ErrorCode].TranslationKey
          };
          return this.$q.reject(status);
        }
        else {
          this.setToken(result.Response);
          this.setBrokerUrl();
          //TODO: Remove the return and uncomment the other one after userData is integrated with BE
          return this.$q.resolve();
          //return this.$q.resolve(this.UserData.getUserData());
        }
      })
  }

  postLogin(userData) {
    // Change preLoginMode to false and set execution mode
    this.AppState.setPreLoginMode(false);
    //TODO: Uncomment after user data is integrated with BE
    //let executionMode = userData.Accounts[0].ExecutionModeID;
    //this.AppState.setExecutionMode(executionMode);

    // If a user is logged in but stays on Wizard state, we need to fetch manually his
    // translations and Group Attributes.
    this.updateTranslations();
    this.updateAttributes();
  }

  logout() {
    //close open modals before logout
    var modalInsatnce;
    modalInsatnce = this.Modal.getCurrentOpenModal();
    //for refresh
    if (modalInsatnce) {
      modalInsatnce.close();
    }
    this._authData = null;
    this.deleteLocalStorage();
    //this.UserNotifications.emptyUserNotifications();
    //this.Idle.unwatch();
  }

  getToken() {
    return this.$sessionStorage.authData && this.$sessionStorage.authData.Token;
  }

  setToken(token) {
    this.$sessionStorage.authData       = this.$sessionStorage.authData || {};
    this.$sessionStorage.authData.Token = token;
    this._authData                      = this.$sessionStorage.authData;
  }

  setBrokerUrl() {
    this.$sessionStorage.authData.BrokerURL = this.API_URLS.BROKER;
    this._authData                          = this.$sessionStorage.authData;
  }

  setUserId(id) {
    this.$sessionStorage.authData        = this.$sessionStorage.authData || {};
    this.$sessionStorage.authData.UserID = id;
    this._authData                       = this.$sessionStorage.authData;
  }

  getAuthData() {
    return this._authData;
  }

  deleteLocalStorage() {
    delete this.$sessionStorage.authData;
    delete this.$sessionStorage.appState;
  }

  /**
   * Update to postLogin translations
   */
  updateTranslations() {
    const currentLanguage = this.GroupTranslations.getCurrentLanguage();

    this.GroupTranslations.getTranslations(currentLanguage, this.LOADING_TYPES.postLogin)
      .then(() => {
        // Flush cached translations
        return this.$translate.refresh()
          .then(() => this.$translate.use(currentLanguage));
      });
  }

  /**
   * Update to postLogin Group Attributes
   */
  updateAttributes() {
    this.GroupAttributes.getGroupAttributes(this.LOADING_TYPES.postLogin);
  }
}
