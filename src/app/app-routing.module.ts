import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { BlogComponent } from './main/blog/blog.component';
import { HomeComponent } from './main/home/home.component';
import { MyProfileComponent } from './main/my-profile/my-profile.component';
import { PostComponent } from './post/post.component';
import { authguardService } from './services/auth/authguard.service';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "blog", component: BlogComponent},
  {path: "myprofile", component: MyProfileComponent, canActivate: [authguardService]},
  {path: "post", component: PostComponent},
  {path: "about", component: AboutComponent},
  {path: "login", component: LoginComponent}







  // {path: "", component: LoginComponent},
  // {path: "home", component: LoginComponent},
  // {path: "dashboard",
  // component: DashboardComponent,
  // children:[
  //   {path: "", component: WellcomeComponent},
  //   {path: "wellcome", component: WellcomeComponent},
  //   {path: "adduser", component: AdduserComponent},
  //   {path: "adduser/:id", component: AdduserComponent},
  //   {path: "customerdetails/:id", component: CustomerdetailsComponent},
  //   {path: "users", component: UsersComponent},
  //   {path: "spinner", component: SpinnerComponent},
  //   {path: "workers", component: WorkersComponent}
    
  //   ],
  // canActivate: [authguard]
  // },
  // {path: "**", component: LoginComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



  