import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  signUp(){ //form: NgForm
    this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
    .then(() => { 
      console.log("Signed up");
      this.router.navigate(['']);
    })
    //form.resetForm();
    //console.log(this.registerForm.value.email)
   };

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeat: new FormControl('', [Validators.required])
    })
  }


}
