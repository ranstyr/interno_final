export class Password {

  /* @ngInject */
  constructor($q, Network, ErrorCodes) {
    this.$q = $q;

    this.Network    = Network;
    this.ErrorCodes = ErrorCodes.getErrorCodes();

    // Requests path
    this.path = 'ForgotPassword';
  }

  createConfirmationCode(email) {
    const query = {
      UserName: email
    };

    return this.Network.post(this.path, query)
      .then(result => {
        if (!result.Succeeded) {
          return this.$q.reject(this.ErrorCodes[result.ErrorCode].TranslationKey);
        }
        else {
          return this.$q.resolve();
        }
      })
  }

  isConfirmationCodeValid(email, code) {
    this.code   = code;
    const query = {
      UserName: email,
      ConfirmationCode: this.code
    };

    return this.Network.get(this.path, query)
      .then(result => {
        if (!result.Succeeded) {
          return this.$q.reject(this.ErrorCodes[result.ErrorCode].TranslationKey);
        }
        else {
          return this.$q.resolve();
        }
      })
  }

  updateNewPassword(email, password) {
    const query = {
      UserName: email,
      NewPassword: password,
      ConfirmationCode: this.code
    };

    return this.Network.put(this.path, query)
      .then(result => {
        if (!result.Succeeded) {
          return this.$q.reject(this.ErrorCodes[result.ErrorCode].TranslationKey);
        }
        else {
          return this.$q.resolve();
        }
      })
  }
}
