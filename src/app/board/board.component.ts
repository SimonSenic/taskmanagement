import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  todo!: Observable<any[]>;
  doing!: Observable<any[]>;
  done!: Observable<any[]>;

  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {}

  user$ = this.auth.user;

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //console.log(this.todo.subscribe(res => { console.log(res[0]) }));
      //this.getName(event.item.element.nativeElement.innerHTML);
      this.update(event.item.element.nativeElement.innerHTML, event.previousContainer, event.container)
    }
  }

  update(title: string, previousContainer: any, container: any){
    this.db.list(previousContainer.id).valueChanges().pipe(take(1)).subscribe(result => {
      for(var i=0; i<result.length; i++){
        const obj: any = result[i];
        if(title === obj.title){

          if(container.data !== previousContainer.data){
            this.db.list(container.id).set(title, {
              title: title,
              description: obj.description
            })
            this.db.list(previousContainer.id).remove(title); 
            console.log(this.db.list(container.id));
          }

        }
      }
    })
  }

  addTask(title: string, description: string){
    this.db.list("todo").set(title, {
      title: title,
      description: description
    });
  }

  signOut(){
    this.auth.signOut();
    window.location.reload();
  }

  ngOnInit(): void { 
    //this.addTask();
    this.todo = this.db.list('todo').valueChanges();
    this.doing = this.db.list('doing').valueChanges();
    this.done = this.db.list('done').valueChanges();
  }

}
