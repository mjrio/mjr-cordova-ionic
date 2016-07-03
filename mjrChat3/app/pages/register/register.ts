import {Component} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ViewController} from 'ionic-angular';

import {Auth} from '../../providers/auth/auth';

@Component({
    templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {
    error:any;

    registerForm:ControlGroup;

    constructor(private view:ViewController,
                private formBuilder:FormBuilder,
                private auth:Auth) {
        this.registerForm = formBuilder.group({
            userName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(value:any):void {
        console.log('onRegister: ', value);
        this.auth.register(value.userName, value.email, value.password)
            .then(identity => {
                console.log('onRegister successful: ', identity);
                this.view.dismiss(identity);
            })
            .catch((errorMessage:any) => {
                console.log('error', errorMessage);
                if (errorMessage) {
                    switch (errorMessage.code) {
                        case "INVALID_EMAIL":
                            this.error = "Invalid email.";
                            break;
                        case "EMAIL_TAKEN":
                            this.error = "The specified email address is already in use.";
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

    onClose() {
        this.view.dismiss();
    }
}
