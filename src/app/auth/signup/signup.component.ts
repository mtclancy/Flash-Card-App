import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    templateUrl: './signup.component.html'
})

export class SignupComponent {

    onSignup(form: NgForm){
        console.log(form.value);
    }

}