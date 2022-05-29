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

  //registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  validity = true;

  unauth = false;

  mismatch = false;

  registerForm = new FormGroup({ 
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeat: new FormControl('', [Validators.required])
   })

  signUp(){ //form: NgForm
    if(this.registerForm.valid && this.password.value===this.repeat.value) {
      this.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => { 
        console.log("Signed up");
        this.router.navigate(['']);
      }).catch(() => {
        this.unauth=true;
        console.log("---")
      })
      this.validity=true;
    }else if(this.registerForm.valid && this.password.value!=this.repeat.value){ 
      this.mismatch=true; 
      this.unauth=false;
      this.validity=true;
    }else{ 
      this.unauth=false;
      this.validity=false; console.log("--") 
    }
    
    //form.resetForm();
    //console.log(this.registerForm.value.email)
   };

   get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
   }  
   get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
   }
   get repeat(): FormControl {
    return this.registerForm.get('repeat') as FormControl;
   }


  ngOnInit(): void {
    /*this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeat: new FormControl('', [Validators.required])
    })*/
  }


}
