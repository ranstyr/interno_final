import { ModalsFactory } from './services/modals-factory';
import { Modal }         from './services/modal';

import { LoginController }        from './components/login/login';
import { SignUpController }       from './components/sign-up/sign-up';
import { ConfirmCodeController }  from './components/confirm-code/confirm-code';
import { NewPasswordController }  from './components/new-password/new-password';
import { LostPasswordController } from './components/lost-password/lost-password';

export default angular.module('components.modal', [])
  .service('ModalsFactory', ModalsFactory)
  .service('Modal', Modal)
  .controller({
    LoginController,
    SignUpController,
    ConfirmCodeController,
    NewPasswordController,
    LostPasswordController
  });
