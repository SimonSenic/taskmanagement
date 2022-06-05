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
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);  //TOTO CRASHUJE STRANKU
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //console.log(this.todo.subscribe(res => { console.log(res[0]) }));
      //this.getName(event.item.element.nativeElement.innerHTML);
      this.update(event.item.element.nativeElement.innerText, event.previousContainer, event.container)
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
              description: obj.description,
              worker: obj.worker
            })
            this.db.list(previousContainer.id).remove(title); 
            console.log(this.db.list(container.id)); 
          }

        }
      }
    })
  }
  
  addToTask(title: string, list: string){ //title = title tasku
    this.db.list(list).valueChanges().pipe(take(1)).subscribe(result => {
      for(var i=0; i<result.length; i++){
        const obj: any = result[i];
        if(obj.worker === "" && obj.title === title){
          this.db.list(list).set(title, {
            title: title,
            description: obj.description,
            worker: document.getElementById("username")!.innerHTML
          })
        }
      }
    })
  }

  removeFromTask(title: string, list: string){ //title - title tasku
    this.db.list(list).valueChanges().pipe(take(1)).subscribe(result => {
      for(var i=0; i<result.length; i++){
        const obj: any = result[i];
        if(obj.worker != "" && obj.title === title){
          this.db.list(list).set(title, {
            title: title,
            description: obj.description,
            worker: ""
          })
        }
      }
    })
  }

  clear(){
    if(document.getElementById("username")!.innerHTML === 'admin@taskmanagement.com'){
      this.db.list("done").remove();
    }
  }

  /*
  addTask(title: string, description: string){
    this.db.list("todo").set(title, {
      title: title,
      description: description
    });
  }*/

  signOut(){
    this.auth.signOut();
    window.location.reload();
  }

  ngOnInit(): void { 
    //this.removeFromTask("Start");
    //this.addToTask("Start");
    //this.addTask();
    this.todo = this.db.list('todo').valueChanges();
    this.doing = this.db.list('doing').valueChanges();
    this.done = this.db.list('done').valueChanges();

    document.getElementById("username")!.innerHTML = firebase.auth().currentUser?.email!

    if(document.getElementById("username")!.innerHTML != 'admin@taskmanagement.com'){
      document.getElementById("add")!.style.display = 'none';
      document.getElementById("clearBoard")!.style.display = 'none';
    }
  }

}
