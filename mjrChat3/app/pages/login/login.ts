import { Component } from '@angular/core';
import { ControlGroup, Validators, FormBuilder } from '@angular/common';

import { NavController, Modal } from 'ionic-angular';

import { EmailValidator } from '../../validators/emailValidator';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
    templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
    authForm: ControlGroup;

    constructor(private nav: NavController, private formBuilder: FormBuilder) {
        this.authForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(value: string): void {
        console.log('Submitted value: ', value);
        this.nav.setRoot(HomePage);
    }

    onRegister() {
        const modal = Modal.create(RegisterPage);
        this.nav.present(modal);
    }
}
