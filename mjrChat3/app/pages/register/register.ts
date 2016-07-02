import {Component} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ViewController} from 'ionic-angular';
import {AngularFire} from "angularfire2";


@Component({
    templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {
    error:any;

    registerForm:ControlGroup;

    constructor(private view:ViewController,
                private formBuilder:FormBuilder,
                private af:AngularFire) {
        this.registerForm = formBuilder.group({
            userName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(value:any):void {
        console.log('Submitted value: ', value);
        this.af.auth.createUser(value).then((authData) => {
            console.log(authData);
            // own profile management
            this.af.database.list('/users').push({
                id: authData.uid,
                name: value.userName
            });

            this.view.dismiss();
        }).catch((errorMessage:any) => {
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
        });
    }

    onClose() {
        this.view.dismiss();
    }
}
