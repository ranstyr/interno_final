export class LostPasswordController {

  /* @ngInject */
  constructor($q, $modalInstance, PATTERNS, Password) {
    this.$q             = $q;
    this.$modalInstance = $modalInstance;

    this.PATTERNS = PATTERNS;
    this.Password = Password;

    // Set defaults
    this.errorMessage  = null;
    this.inputValidity = true;
  }

  setAsValid() {
    this.inputValidity = true;
  }

  checkValidity() {
    const email = this.lostPasswordForm.email;

    if (email.$viewValue) {
      this.inputValidity = email.$valid;
    }
    if (!this.inputValidity) {
      this.showError('msgInvalidEmail');
    }
  }

  sendEmail() {
    if (this.lostPasswordForm.$invalid || !this.lostPasswordForm.email.$viewValue) {
      return this.inputValidity = false
    }

    this.hideError();

    this.Password.createConfirmationCode(this.email)
      .then(() => this.closeModal())
      .catch(error => {
        this.showError(error);
        return this.$q.reject();
      });
  }

  showError(message) {
    this.errorMessage = message;
  }

  hideError() {
    this.errorMessage = null;
  }

  closeModal() {
    this.$modalInstance.close();
  }

  dismissModal() {
    this.$modalInstance.dismiss();
  }
}
