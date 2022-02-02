import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  signOut(){
    this.auth.signOut();
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
