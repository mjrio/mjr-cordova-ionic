import {NavController, Loading} from "ionic-angular";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {OnInit, Inject, Component} from "@angular/core";

import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';
import {AuthMethods} from "angularfire2/angularfire2";


@Component({
    templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
    error:any;
    registerPage = RegisterPage;

    constructor(private af:AngularFire,
                private navCtrl:NavController) {
    }

    login(credentials) {
        let loading = Loading.create({
            content: "Please wait"
        });
        this.navCtrl.present(loading);

        this.af.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
            console.log(authData);
            loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }).catch((error) => {
            loading.dismiss();
            if (error) {
                switch (error.code) {
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
                        this.error = error;
                }
            }
        });
    }

}