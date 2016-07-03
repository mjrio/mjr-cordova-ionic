import {Component} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';

import {NavController, Modal} from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2";

import {EmailValidator} from '../../validators/emailValidator';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

import {Auth} from '../../providers/auth/auth';


@Component({
    templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
    error:any;
    authForm:ControlGroup;

    constructor(private nav:NavController,
                private formBuilder:FormBuilder,
                private auth:Auth) {
        this.authForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(formValue:any) {
        console.log('onSubmit', formValue);
        this.login(formValue.email, formValue.password)
    }

    onRegister() {
        const modal = Modal.create(RegisterPage);
        modal.onDismiss(identity => {
            if (identity) {
                console.log("Logged in", identity);
                this.nav.setRoot(HomePage);
                return;
            }
        })
        this.nav.present(modal);
    }

    login(email, password) {
        this.auth.login(email, password)
            .then(identity => {
                console.log("Logged in", identity);
                this.nav.setRoot(HomePage);
            })
            .catch((errorMessage:any) => {
                if (errorMessage) {
                    switch (errorMessage.code) {
                        case "INVALID_EMAIL":
                            this.error = "Invalid email.";
                            break;
                        case "INVALID_USER":
                            this.error = "The specified user account email/password are incorrect.";
                            break;
                        case "INVALID_PASSWORD":
                            this.error = "The specified user account email/password are incorrect.";
                            break;
                        case "NETWORK_ERROR":
                            this.error = "An error occurred while attempting to contact the authentication server.";
                            break;
                        default:
                            this.error = errorMessage.message;
                    }
                }
            })
    }
}
