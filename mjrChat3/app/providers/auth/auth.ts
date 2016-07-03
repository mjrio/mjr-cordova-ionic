import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Auth {
    identity:any;

    constructor(private af:AngularFire) {
    }

    getIdentity() {
        return this.identity;
    }

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
}

