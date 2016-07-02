import {Component} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';

import {NavController, Modal} from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2";

import {EmailValidator} from '../../validators/emailValidator';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

@Component({
    templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
    error:any;
    authForm:ControlGroup;
    userName:FirebaseObjectObservable<any>;


    constructor(private nav:NavController,
                private formBuilder:FormBuilder,
                private af:AngularFire) {
        this.authForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(value:any):void {
        console.log('Submitted value: ', value);
        this.login(value);
    }

    onRegister() {
        const modal = Modal.create(RegisterPage);
        this.nav.present(modal);
    }

    login(credentials) {
        this.af.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
            console.log("Logged in", authData);
            // this.userName = this.af.database.object('/users/' + authData.uid);
            // this.af.database.object('/users/' + authData.uid).subscribe(user => {
            //     debugger;
            //     console.log(user);
            // })
            // debugger;
            // window.localStorage.setItem('userName', this.userName);
            this.nav.setRoot(HomePage);
        }).catch((errorMessage:any) => {
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
        });
    }
}
