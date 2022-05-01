import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'
import { AddTaskComponent } from './add-task/add-task.component';

const redirToHome = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add', component: AddTaskComponent},
  //{ path: 'board', component: BoardComponent },
  { path: '', component: BoardComponent, 
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirToHome } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
