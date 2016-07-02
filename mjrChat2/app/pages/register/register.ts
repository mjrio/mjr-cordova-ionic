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
        this.view.dismiss();
    }

    onClose() {
        this.view.dismiss();
    }
}
