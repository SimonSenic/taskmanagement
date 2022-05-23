import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private router: Router) { }

  addTask(title: string, description: string){
    if(firebase.auth().currentUser?.email! === 'admin@taskmanagement.com'){
      this.db.list("todo").set(title, {
      title: title,
      description: description
      });
    }
  }

  ngOnInit(): void {
    if(firebase.auth().currentUser?.email! != 'admin@taskmanagement.com'){
      this.router.navigate(['/']);
    }
  }

}
