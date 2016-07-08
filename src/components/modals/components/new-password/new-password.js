export class NewPasswordController {

  /* @ngInject */
  constructor($q, $modalInstance, email, PATTERNS, Password) {
    this.$q             = $q;
    this.$modalInstance = $modalInstance;

    this.email    = email;
    this.PATTERNS = PATTERNS;
    this.Password = Password;

    // Set defaults
    this.errorMessage      = null;
    this.inputValidity     = true;
    this.passwordInputType = 'password';
  }

  revealPassword() {
    this.passwordInputType = 'text';
  }

  hidePassword() {
    this.passwordInputType = 'password';
  }

  setAsValid() {
    this.inputValidity = true;
  }

  checkValidity() {
    const password = this.newPasswordForm.newPassword;

    if (password.$viewValue) {
      this.inputValidity = password.$valid;
    }
    if (!this.inputValidity) {
      this.showErrorMessage('msgWrongPassword');
    }
  }

  changePassword() {
    if (this.newPasswordForm.$invalid || !this.newPasswordForm.newPassword.$viewValue) {
      return this.inputValidity = false
    }

    this.hideErrorMessage();

    this.Password.updateNewPassword(this.email, this.newPassword)
      .then(result => {
        if (!result.Succeed) {
          this.showErrorMessage(result.Message);
          return this.$q.reject();
        }
        this.closeModal();
      });
  }

  showErrorMessage(message) {
    this.errorMessage = message;
  }

  hideErrorMessage() {
    this.errorMessage = null;
  }

  closeModal() {
    this.$modalInstance.close();
  }

  dismissModal() {
    this.$modalInstance.dismiss();
  }
}
