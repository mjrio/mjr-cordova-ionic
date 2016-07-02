import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';

import {RegisterPage} from '../register/register';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private nav: NavController) {

  }

    onLogin() {

    }

    onRegister() {
        const modal = Modal.create(RegisterPage);
        this.nav.present(modal);
    }
}
