import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { BlogComponent } from './main/blog/blog.component';
import { SpinnerComponent } from './main/spinner/spinner.component';
import { HomeComponent } from './main/home/home.component';
import { PostComponent } from './post/post.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MyProfileComponent } from './main/my-profile/my-profile.component';
import {NgxImageCompressService} from "ngx-image-compress";
import { UsersComponent } from './admin/users/users.component';
import { EditpostComponent } from './main/editpost/editpost.component';
import { PostlistComponent } from './postlist/postlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    SpinnerComponent,
    HomeComponent,
    PostComponent,
    AboutComponent,
    LoginComponent,
    MyProfileComponent,
    UsersComponent,
    EditpostComponent,
    PostlistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule

  ],
  providers: [CookieService, NgxImageCompressService,
    { provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
