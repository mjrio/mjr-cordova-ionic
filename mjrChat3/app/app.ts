import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';

import {Auth} from './providers/auth/auth';

import {FIREBASE_PROVIDERS,
    defaultFirebase,
    AuthMethods,
    AuthProviders,
    firebaseAuthConfig} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [
    Auth,
    FIREBASE_PROVIDERS,
    defaultFirebase({
        apiKey: "AIzaSyA-o8CcplGGUxm13cfJhRPS6iPYnPqqsv8",
        authDomain: "mjrchat-fafa3.firebaseapp.com",
        databaseURL: "https://mjrchat-fafa3.firebaseio.com",
        storageBucket: "",
    }),
    firebaseAuthConfig({
        provider: AuthProviders.Twitter,
        method: AuthMethods.Redirect
    })]
);
