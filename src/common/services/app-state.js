export class AppState {

  /* @ngInject */
  constructor($rootScope) {
    this.$rootScope = $rootScope;

    // Affects loading of translations
    this.preLoginMode  = true;
    this.executionMode = 0;

    this.isMarketClosed = false;

    this._handleSignalR();
  }

  _handleSignalR() {
    //this.$rootScope.$on('pushMarketStatus', (e, data) => {
    //  // data.MarketStatusChange:
    //  // true = market open
    //  // false = market close
    //  this.setMarketClosed(!data.MarketStatusChange);
    //});
  }

  /**
   * Defines whether the app is in PreLogin mode
   *
   * @param {boolean} state Set/Unset PreLogin mode
   */
  setPreLoginMode(state) {
    this.preLoginMode = state;
  }

  /**
   * Sets the user Execution Mode
   *
   * @param {number} state Set execution mode
   *                       1 - Automatic
   *                       2 - Require confirmation
   *                       3 - On hold
   */
  setExecutionMode(state) {
    this.executionMode = state;
  }

  /**
   * Toggle the Market Closed state
   *
   * @param  {boolean?} state Force a specific state
   */
  setMarketClosed(state) {
    //this.isMarketClosed = state;
  }
}
