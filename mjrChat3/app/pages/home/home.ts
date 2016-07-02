import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {OnInit} from "@angular/core";


@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit{
    error:any;
    authInfo:any;
    message: string;
    messages:FirebaseListObservable<any[]>;

    constructor(private nav:NavController,
                private af:AngularFire) {

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
            this.nav.setRoot(LoginPage);
            return;
        }
    }
}
