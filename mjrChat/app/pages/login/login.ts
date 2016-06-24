import {Page} from 'ionic-angular';
import {RegisterPage} from '../register/register';


@Page({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    registerPage = RegisterPage;

    constructor(){}
}