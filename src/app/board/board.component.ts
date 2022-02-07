import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public todo!: Observable<any>[];

  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    const todo: AngularFireList<any> = db.list('todo');
    todo.valueChanges().subscribe(
      items => { this.todo = items; }
    );
  }

  user$ = this.auth.user;

  signOut(){
    this.auth.signOut();
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
