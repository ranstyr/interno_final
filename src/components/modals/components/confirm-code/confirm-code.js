export class ConfirmCodeController {

  /* @ngInject */
  constructor($q, $modalInstance, resolvedData, Password, Signup) {
    this.$q             = $q;
    this.$modalInstance = $modalInstance;

    this.resolvedData = resolvedData;
    this.Signup       = Signup;
    this.Password     = Password;

    // Set defaults
    this.errorMessage   = null;
    this.inputValidity  = true;
    this.successMessage = null;
  }

  setAsValid() {
    this.inputValidity = true;
  }

  checkValidity() {
    const code = this.confirmationForm.code;

    if (code.$viewValue) {
      this.inputValidity = code.$valid;
    }
    if (!this.inputValidity) {
      this.showError('msgWrongConfirmationCode');
    }
  }

  confirm() {
    if (this.confirmationForm.$invalid || !this.confirmationForm.code.$viewValue) {
      return this.inputValidity = false
    }

    this.hideError();

    if (this.resolvedData.opener === 'LostPassword') {
      this.Password.isConfirmationCodeValid(this.resolvedData.email, this.code)
        .then(() => this.closeModal())
        .catch(status => {
          this.showError(status);
          return this.$q.reject();
        });
    }

    this.Signup.completeSignup(this.resolvedData.email, this.code)
      .then((user) => this.closeModal(user))
      .catch(status => {
        this.showError(status);
        return this.$q.reject();
      });
  }

  createConfirmationCode() {
    if (this.confirmationForm.$invalid || !this.confirmationForm.code.$viewValue) {
      return this.inputValidity = false
    }

    this.hideError();

    if (this.resolvedData.opener === 'LostPassword') {
      this.Password.createConfirmationCode(this.resolvedData.email)
        .then(() => this.showSuccess('msgEmailSentAgain'))
        .catch(status => {
          this.showError(status);
          return this.$q.reject();
        });
    }

    this.Signup.resendConfirmationCode(this.resolvedData.email)
      .then(() => this.closeModal())
      .catch(status => {
        this.showError(status);
        return this.$q.reject();
      });
  }

  showError(message) {
    this.errorMessage = message;
  }

  showSuccess(message) {
    this.successMessage = message;
  }

  hideError() {
    this.error = null;
  }

  closeModal() {
    this.$modalInstance.close();
  }

  dismissModal() {
    this.$modalInstance.dismiss();
  }
}
