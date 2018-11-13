import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsService } from './posts/posts.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FactsComponent } from './facts/facts.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostsComponent,
    HeaderComponent,
    SidebarComponent,
    PostsCreateComponent,
    LoginComponent,
    SignupComponent,
    FactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PostsService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
