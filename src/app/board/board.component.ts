import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  todo!: Observable<any[]>;
  todo_!: AngularFireList<any>;
  doing!: Observable<any[]>;
  doing_!: AngularFireList<any>;
  done!: Observable<any[]>;
  done_!: AngularFireList<any>;

  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {}

  user$ = this.auth.user;

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //console.log(event.item);
      //this.getName(event.item);
      this.update(event.item.element.nativeElement.innerHTML, event.previousContainer, event.container)
    }
  }

  /*getName(item: any){
    //console.log(this.todo)
    for(var i=0; i<10; i++){
    }
  }*/

  update(title: string, previousContainer: any, container: any){
    if(container.data !== previousContainer.data){
      this.db.list(container.id).set(title, {
        title: title,
        description: ""
      })
      this.db.list(previousContainer.id).remove(title);
    }else{ console.log("nejdze")}
  }

  add(){
    this.db.list("doing").set('Create component',{
      title: "Create component",
      description: "Create new component"
    });
  }

  signOut(){
    this.auth.signOut();
    window.location.reload();
  }

  ngOnInit(): void { 
    //this.add();
    this.todo_ = this.db.list('todo');
    this.todo = this.todo_.valueChanges();

    this.doing_ = this.db.list('doing');
    this.doing = this.doing_.valueChanges();

    this.done_ = this.db.list('done');
    this.done = this.done_.valueChanges();
  }

}
