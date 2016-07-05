import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder, ControlGroup } from '@angular/common';

/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {
    registerForm: ControlGroup;

  constructor(private nav: NavController,
              private view: ViewController,
              private formBuilder: FormBuilder) {
      this.registerForm = formBuilder.group({
          name: [''],
          password: [''],
          email: [''],
      });
  }

  onRegister(form) {
      console.log(form.value);
  }

  close() {
      this.view.dismiss();
  }

}
