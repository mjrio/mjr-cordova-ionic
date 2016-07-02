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

T.B.D

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
Add some buttons to the main page

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
onRegister() {
    const modal = Modal.create(RegisterPage);
    this.nav.present(modal);
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
constructor(private nav: NavController,
            private view: ViewController) {
}

onClose() {
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
