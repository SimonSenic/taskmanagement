import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //loginForm!: FormGroup;

  validity = true;

  unauth = false;

  constructor(private formBuilder: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  loginForm = new FormGroup({ 
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
   })

  signIn(){
    if(this.loginForm.valid){
      this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => { 
        console.log("Signed in")
        this.router.navigate(['']);
      }).catch((error) => {
        this.unauth=true;
        console.log(error)
      })
      this.validity=true;
    }else{ 
      this.unauth = false;
      this.validity=false; console.log("--") 
    }
  
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
   }  
   get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
   }

  ngOnInit(): void {
    /*this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })*/
  }

}
