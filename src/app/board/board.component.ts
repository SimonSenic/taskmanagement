import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  //todo = [''];
  //done = [''];

  public todo!: Observable<any>[];
  public doing!: Observable<any>[];
  public done!: Observable<any>[];

  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    const todo: AngularFireList<any> = db.list('todo');
    const doing: AngularFireList<any> = db.list('doing');
    const done: AngularFireList<any> = db.list('done');

    todo.valueChanges().subscribe(
      x => { this.todo = x; }
    );

    doing.valueChanges().subscribe(
      x => { this.doing = x; }
    );

    done.valueChanges().subscribe(
      x => { this.done = x; }
    );
  }

  user$ = this.auth.user;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  signOut(){
    this.auth.signOut();
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
