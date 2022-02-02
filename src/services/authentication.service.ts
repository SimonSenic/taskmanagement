import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User | null>;
  
  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState
    //this.authStatusListener();
  }
  
  /*currentUser!: firebase.User;
  
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  authStatusListener(){
    this.angularFireAuth.onAuthStateChanged((credential)=>{
      if(credential){
        console.log(credential);
        this.authStatusSub.next(credential);
      }
      else{
        this.authStatusSub.next
      }
    })
  }*/

  SignUp(email: string, password: string) {
    this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Signed up!', res);
    })
    .catch(error => {
      console.log('error', error.message);
    });
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Signed in!', res);
    })
    .catch(error => {
      console.log('error', error.message);
    });
  }

  SignOut() {
    this.angularFireAuth.signOut();
  }

}
