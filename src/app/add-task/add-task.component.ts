import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  addTask(title: string, description: string){
    this.db.list("todo").set(title, {
      title: title,
      description: description
    });
  }

  ngOnInit(): void {
  }

}
