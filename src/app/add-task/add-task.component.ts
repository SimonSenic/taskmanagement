import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  validity = true;

  constructor(private db: AngularFireDatabase, private router: Router) { }

  addTask(title: string, description: string){
    if(this.addTaskForm.valid && firebase.auth().currentUser?.email! === 'admin@taskmanagement.com'){
      this.db.list("todo").set(title, {
        title: title,
        description: description,
        worker: ""
      }).catch(() => {
        this.validity=false;
      }).then(() => {
        this.router.navigate(['']);
        console.log("task added");
      })
      this.validity=true;
    }
      
    else this.validity=false;  
    
  }

  addTaskForm = new FormGroup({ 
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
   })

   get title(): FormControl {
    return this.addTaskForm.get('title') as FormControl;
   }  
   get description(): FormControl {
    return this.addTaskForm.get('description') as FormControl;
   }


  ngOnInit(): void {
    if(firebase.auth().currentUser?.email! != 'admin@taskmanagement.com'){
      this.router.navigate(['/']);
    }
  }

}
