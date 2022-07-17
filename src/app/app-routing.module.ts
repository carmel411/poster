import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { EditpostComponent } from './main/editpost/editpost.component';
import { HomeComponent } from './main/home/home.component';
import { MyProfileComponent } from './main/my-profile/my-profile.component';
import { PostComponent } from './post/post.component';
import { PostlistComponent } from './postlist/postlist.component';
import { authguardService } from './services/auth/authguard.service';
import { AdminguardService } from './services/auth/adminguard.service';
import { WriterguardService } from './services/auth/writerguard.service';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "myprofile", component: MyProfileComponent, canActivate: [authguardService]},
  {path: "post/:id", component: PostComponent},
  {path: "about", component: AboutComponent},
  {path: "edit/:id", component: EditpostComponent, canActivate: [WriterguardService]},
  {path: "edit", component: EditpostComponent, canActivate: [WriterguardService]},
  {path: "users", component: UsersComponent, canActivate: [AdminguardService]},
  {path: "login", component: LoginComponent},
  {path: "postlist", component: PostlistComponent},
  {path: "about", component: AboutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }



  