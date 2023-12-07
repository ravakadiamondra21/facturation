import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { SignupService } from "../signup.service";
import { Signup } from "./signup";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
    constructor(private signupService: SignupService) {}

    signupForm = new FormGroup({
        lastName: new FormControl(""),
        firstName: new FormControl(""),
        id: new FormControl(""),
        mail: new FormControl(""),
        pwd: new FormControl(""),
        confirmPwd: new FormControl(""),
    });

    ngOnInit() {}
    newAdmin: Signup = {
        id: 0,
        mail: "",
        nom: "",
        prenom: "",
        mdp: "",
    };

    erreur: string;
    routerLink;
    postSignup() {
        const pass = this.signupForm.get("pwd").value;

        if (pass.length < 8) {
            this.erreur = "mot de passe très court";
            this.routerLink = "/mysignup"
            console.log("fohy lotra")
        } else if (pass.length > 12) {
            this.erreur = "mot de passe très long";
            this.routerLink = "/mysignup"
            console.log("lava lotra")
        } else {
            const confirmPwd = this.signupForm.get("confirmPwd").value;

            if (pass == confirmPwd) {
                this.newAdmin.mdp = confirmPwd;
                console.log("mdp saved");

                this.newAdmin.id = Number(this.signupForm.get("id").value);
                this.newAdmin.mail = this.signupForm.get("mail").value;
                this.newAdmin.nom = this.signupForm.get("lastName").value;
                this.newAdmin.prenom = this.signupForm.get("firstName").value;

                this.signupService
                    .postSingup(this.newAdmin)
                    .subscribe((response) => {
                        console.log(response);
                        this.routerLink = "/mylogin"
                        console.log("mety lay signup")
                    });
            } else {
                this.erreur = "password incorect"
                this.routerLink = "/mysignup"
                console.log("mdp erreur")
            }
        }
    }
}
