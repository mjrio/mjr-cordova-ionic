import {NavController, Loading} from "ionic-angular";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {OnInit, Inject, Component} from "@angular/core";

import {LoginPage} from '../login/login';
import {AuthMethods} from "angularfire2/angularfire2";
import {FirebaseListObservable} from "angularfire2/angularfire2";


@Component({
    templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
    error:any;
    authInfo:any;
    messages:FirebaseListObservable<any[]>;

    constructor(private af:AngularFire,
                private navCtrl:NavController) {
    }

    ngOnInit() {
        this.messages = this.af.database.list("/messages");

        this.af.auth.subscribe(data => {
            if (data) {
                this.authInfo = data;
            } else {
                this.authInfo = null;
            }
        });
    }

    sendMessage(message:string) {
        this.messages.push({
            author: 'Kevin',
            body: message
        });
        this.message = '';
    }

    logout() {
        if (this.authInfo) {
            this.af.auth.logout();
            this.navCtrl.setRoot(LoginPage);
            return;

        }
    }
}