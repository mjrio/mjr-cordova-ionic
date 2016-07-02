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

## Ionic 2 Starter (Kevin)

Generate an ionic2 typescript app

	ionic start mjrChat blank --v2 --ts
	
This created a blank ionic2 project in the folder mjrChat with the default platform iOS added.

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
	
Other serve options are 

	ionic serve --lab
	ionic serve --platform ios
	ionic serve --consolelogs

	ionic emulate ios | android
	ionic upload
	npm install angularfire2 && firebase --save
	typings install dt~firebase --global --save

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

T.B.D

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
