# Prerequisites

    - Install Node (v5+)
    - Editor (Visual Studio Code / WebStorm)
    - Chrome browser
    - (Optional) Install XCODE (OSX)
    - (Optional) Install Android Studio (OSX, Win)

# Setup

    # install cordova & ionic 2.0
    npm install ionic@beta -g
    npm install cordova -g

    # install typings manager
    npm install typings -g

# Scenario

* mjrChat1 = default blank template
* mjrchat2 = pages added and update
* mjrChat3 = firebase integration

## Ionic 2 Starter (Kevin)

Ionic is a platform that combines a set of front-end components that lets you write an HTML5 app that looks like a native app. It is build on top of cordova. 

Generate an ionic2 typescript app

	ionic start mjrChat blank --v2 --ts
	
This created a blank ionic2 project in the folder mjrChat with the default platform iOS added and angular2 rc3.

Other starter templates are:

* tabs (default)
* sidemenu
* blank

Navigate to the project folder

	cd mjrChat
	
Run the app
	
	ionic serve
	
Run the app in lab mode
	
	ionic serve --lab
	
Run the app for a specific platform

	ionic serve --platform ios
	
Run the app with console logging in the terminal

	ionic serve --consolelogs
	
Run the app on default emulator

	ionic emulate ios

Run the app on a specified emulator
List all emulator images
	
	./platforms/ios/cordova/lib/list-emulator-images
	ionic emulate ios --target="iPhone-4s, 9.3"
	
To run on a device, a developer account, developement certificate and provisioning profiles are needed. 
Run the app on a device
	
	ionic run ios
	
To add other platforms
	
	ionic platform list
	ionic platform add android

To use hardware functionalities, plugins close the gap between javascript and native code
[Cordova plugins](https://cordova.apache.org/plugins/?platforms=cordova-ios)
	
	ionic plugin list
	ionic plugin add ...
	
Upload the app to ionicView and test on your device

	ionic upload
	
	
To debug on the device or emulator, enable the javascript inspector on the device:

	Settings > Safari > Advanced > Web Inspector

Enable de debug mode in Safari
	
	Safari > Preferences > Advanced
	
	
## Continue with ionic (Peter)

Give our app a title

```
// home.html
<ion-title>
    MjrChat
</ion-title>
```

Add our fist page

```
ionic generate --list
ionic generate page Login

// or

ionic g page Login
```

Lets navigate to the pages
Add some buttons to the main page to navigate

```
// home.html
<button (click)="onGotoLogin()">login</button>

// home.ts
import {LoginPage} from '../login/login';
export class HomePage {
    ...
    onGotoLogin() {
        this.navController.setRoot(LoginPage);
    }
}
```

And add some button styles

    // see: http://ionicframework.com/docs/v2/components/#buttons
    <button light>Click me</button>
    <button outline>Click me</button>
    <button light round>Click me</button>
    <button light full>Click me</button>

Add a register page (pop)

```
ionic g page Register

// login.html
...
</ion-list>
<button full (click)="onLogin()">Login</button>
<button light full (click)="onRegister()">Register</button>
...

// login.ts
import {RegisterPage} from '../register/register';
export class HomePage {
    ...
    onLogin() {

    }
    onRegister() {
        this.navController.push(RegisterPage);
    }
}

```

Open the register page as modal

```
// login.ts
import { NavController, Modal } from 'ionic-angular';
export class LoginPage {
    ...
    onRegister() {
        const modal = Modal.create(RegisterPage);
        this.nav.present(modal);
    }
}

// register.html
<ion-navbar>
    <ion-title>register</ion-title>
    <ion-buttons left>
        <button (click)="close()">Close</button>
    </ion-buttons>
</ion-navbar>

// register.ts
import { NavController, ViewController } from 'ionic-angular';
export class RegisterPage {
    constructor(private nav: NavController,
                private view: ViewController) {
    }

    onClose() {
        this.view.dismiss();
    }
    ...
}
```

And finalize our navigation

```
// app.ts (change startup page)
export class MyApp {
  rootPage: any = LoginPage;
  ...
}

// login.ts
onSubmit(value: string): void {
    console.log('Submitted value: ', value);
    this.nav.setRoot(HomePage);
}

// register.ts
onSubmit(value: string): void {
    console.log('Submitted value: ', value);
    this.view.dismiss();
}
```

Create a list

```
// login.html
...
<ion-content padding>
    <ion-list>
        <ion-item>
            this is item 1
        </ion-item>

        <ion-item>
            this is item 2
        </ion-item>

        <button ion-item light full>Click me</button>
    </ion-list>
</ion-content>
```

Add input elements to list

```
// login.html

<ion-list>

    <ion-item>
        <ion-input type="number" placeholder="Age"></ion-input>
    </ion-item>
    <ion-item>
        <ion-input type="email" placeholder="Email"></ion-input>
    </ion-item>
    <ion-item>
        <ion-input type="password" placeholder="Password"></ion-input>
    </ion-item>
</ion-list>
```

> When running in ios/android you will notice that the keyboard will adjust
> according the input type

Make a form

```
// login.html
<form [ngFormModel]="authForm" (ngSubmit)="onSubmit(authForm)">
    <ion-list>
        <ion-item>
            <ion-input type="email"
                        ngControl="email"
                        placeholder="Email">
            </ion-input>
        </ion-item>
        <ion-item>
            <ion-input type="password"
                        ngControl="password"
                        placeholder="Password">
            </ion-input>
        </ion-item>
    </ion-list>
    <button type="submit" block >Login</button>
    <button light full (click)="onRegister()">Register</button>
</form>

// login.ts
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
    }
}
```

> Remark: In Angular2 rc3 the forms API is changed:
> https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN_7B4meyWK0Y/pub

And finally we create an identical form for the register page

```
// register.html
<ion-content padding>
    <p center>
        Please enter your preferred email and password so we can create your account
    </p>
    <form [ngFormModel]="registerForm" (ngSubmit)="onSubmit(registerForm.value)">
        <ion-list>

            <ion-item>
                <ion-input type="email"
                           ngControl="email"
                           placeholder="Email">
                </ion-input>
            </ion-item>

            <ion-item>
                <ion-input type="password"
                           ngControl="password"
                           placeholder="Password">
                </ion-input>
            </ion-item>

        </ion-list>
        <button type="submit" block [disabled]="!registerForm.valid">Register</button>
    </form>
</ion-content>

// register.ts
import { Component } from '@angular/core';
import { ControlGroup, Validators, FormBuilder } from '@angular/common';
import { NavController, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {

    registerForm: ControlGroup;

    constructor(private nav: NavController,
        private view: ViewController,
        private formBuilder: FormBuilder) {
        this.registerForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(value: string): void {
        console.log('Submitted value: ', value);
    }

    onClose() {
        this.view.dismiss();
    }
}
```

## Firebase integration (Kevin)

[http://firebase.google.com](https://firebase.google.com)

"Firebase is a mobile platform that helps you quickly develop high-quality apps and grow your user base."

###Steps to get Firebase up and running

* Login to console
* Create a new project
* Open the 'Add Firebase to your web app'
* Copy the config
* Navigate to the Auth section
* Click the button Set up Sign-in method
* Enable Email/Password
* Save
* That's it for the Firebase console

###Get the client up and running with Firebase

####In app.ts (the ionicBootstrap) add the Firebase config:
	
	ionicBootstrap(MyApp, [FIREBASE_PROVIDERS,
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

####Import the providers from angularfire2

	import {FIREBASE_PROVIDERS,
	    defaultFirebase,
	    AuthMethods,
	    AuthProviders,
	    firebaseAuthConfig} from 'angularfire2';
	    
	    
####Create an Auth provider

Create providers/auth/auth.ts

Import angularFire and toPromise of rxJs

	import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2";
	import 'rxjs/add/operator/toPromise';
	
Create a getIdentity function
	
	getIdentity() {
        return this.identity;
    }
    
Create a register function
    
    register(name:string, email:string, password:string) {
        return this.af.auth.createUser({email, password})
            .then((authData) => {
                console.log(authData);
                // additionally register user name
                this.af.database.object('/users/' + authData.uid).set({
                    email: authData.auth.email,
                    name
                });
                this.identity = {
                    email: authData.auth.email,
                    uid: authData.uid,
                    name: name,
                };
                return this.identity;
            })
    }
    
Create a login function

    login(email:string, password:string) {
        const loginOptions = {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        };
        return this.af.auth.login({email, password}, loginOptions)
            .then((authData) => {
                this.identity = {
                    email: authData.auth.email,
                    uid: authData.auth.uid,
                };
                // we need to wrap the observable in a promise
                return new Promise((resolve) => {
                    // get the user profile
                    this.af.database.object('/users/' + this.identity.uid)
                        .subscribe(userProfile => {
                            resolve(userProfile);
                        });
                });
            })
            .then(userProfile => {
                // add user name to identity
                this.identity.name = userProfile.name;
                return this.identity
            })
    }
    
####Make Auth global available by adding it in ionicBootstrap providers array

In app.ts add Auth in the providers array

####Add Auth provider to the registerPage

Inject the auth provider into the constructor
	
	import {Auth} from '../../providers/auth/auth';

	private auth:Auth
	
Update onSubmit function with angularFire logic

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
Add the error placeholder to the html

	 <div padding class="error" *ngIf="error">
        <p>{{error}}</p>
    </div>
    
####Add Auth provider to the loginPage

Inject the auth provider into the constructor

	import {Auth} from '../../providers/auth/auth';

	private auth:Auth
	
Add login function

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
    
    
Add the onRegister function 

    onRegister() {
        const modal = Modal.create(RegisterPage);
        modal.onDismiss(identity => {
            if (identity) {
                console.log("Logged in", identity);
                this.nav.setRoot(HomePage);
                return;
            }
        });
        this.nav.present(modal);
    }
    
Add onRegister to the registerButton

    <button light full (click)="onRegister()">Register</button>
    
Add the error placeholder to the html

	 <div padding class="error" *ngIf="error">
        <p>{{error}}</p>
    </div>
	
	
####Integrate FireBase with the homePage

Update the html so it looks like this:

	<ion-header>
	    <ion-navbar>
	        <ion-title>Chat with other majors</ion-title>
	        <ion-buttons end>
	            <button (click)="logout()">
	                <ion-icon name="log-out"></ion-icon>
	            </button>
	        </ion-buttons>
	    </ion-navbar>
	</ion-header>

	<ion-content class="home" padding>
	    <ion-list>
	        <ion-item *ngFor="let message of messages | async">
	            <h2>{{message.author}}</h2>
	            <p>{{message.body}}</p>
	        </ion-item>
	    </ion-list>
	
	    <ion-list>
	        <ion-item>
	            <ion-input placeholder="Message" type="text" [(ngModel)]="message"></ion-input>
	        </ion-item>
	    </ion-list>
	    <button [disabled]="!message" (click)="sendMessage(message)">
	        Send
	    </button>
	</ion-content>

Inject AngularFire

	import {AngularFire, FirebaseListObservable} from "angularfire2";
	import {Auth} from '../../providers/auth/auth';

Create local variables to hold the data
	
	error:any;
    identity:any;
    userName: string;
    message: string;
    messages$:FirebaseListObservable<any[]>;
    
Implement the lifeCycle hook OnInit

	ngOnInit() {
        this.messages$ = this.af.database.list("/messages");
        this.identity = this.auth.getIdentity();
        console.log('Identity:', this.identity)
    }    
Create a method to post a new message

	sendMessage(message:string) {
        this.messages$.push({
            author: this.identity.name,
            body: message
        });
        this.message = '';
    }
        
Create a method to logout

	logout() {
        if (this.identity) {
            this.af.auth.logout();
            this.nav.setRoot(LoginPage);
            return;
        }
    }


# Overview Ionic commands

    ionic start mjrChat blank --v2 --ts
    cd mjrChat

    ionic serve
    ionic serve --lab
    ionic serve --platform ios
    ionic serve --consolelogs

    ionic emulate ios | android
    ionic upload
    npm install angularfire2 && firebase --save
    typings install dt~firebase --global --save
