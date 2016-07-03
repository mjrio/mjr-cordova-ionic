import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {OnInit} from "@angular/core";

import {Auth} from '../../providers/auth/auth';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit{
    error:any;
    identity:any;
    userName: string;
    message: string;
    messages$:FirebaseListObservable<any[]>;

    constructor(private nav:NavController,
                private af:AngularFire,
                private auth: Auth) {
    }

    ngOnInit() {
        this.messages$ = this.af.database.list("/messages");
        this.identity = this.auth.getIdentity();
        console.log('Identity:', this.identity)
    }

    sendMessage(message:string) {
        this.messages$.push({
            author: this.identity.name,
            body: message
        });
        this.message = '';
    }

    logout() {
        if (this.identity) {
            this.af.auth.logout();
            this.nav.setRoot(LoginPage);
            return;
        }
    }
}
