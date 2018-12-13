import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';

import { AuthService } from "../auth.service";

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {

    message: string = "";
    private messageSub: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.messageSub = this.authService.getMessageUpdatedListener()
            .subscribe((message: string) => {
                this.message = message;
                console.log(message);
            });
    }

    onSignup(form: NgForm){
        if (form.invalid) {
            return;
        }
        this.authService.createUser(form.value.email, form.value.password);
    }

    ngOnDestroy() {
        this.messageSub.unsubscribe();
    }

}