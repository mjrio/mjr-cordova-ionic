import { Component } from '@angular/core';
import { FormBuilder, ControlGroup } from '@angular/common';
import { NavController, Modal } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
    loginForm: ControlGroup;

  constructor(private nav: NavController, private formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
          password: [''],
          email: [''],
      });
  }

  onLogin(form) {
      console.log('login', form.value);
      // this.nav.setRoot(HomePage)
  }

   onRegister() {
    //   console.log('register');
    //   this.nav.push(RegisterPage);
    const modal = Modal.create(RegisterPage);
    this.nav.present(modal)
  }

}
