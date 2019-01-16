import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './decks/posts/posts.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsCreateComponent } from './decks/posts/posts-create/posts-create.component';
import { PostsService } from './decks/posts/posts.service';
import { FactsService } from './decks/posts/facts/facts.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FactsComponent } from './decks/posts/facts/facts.component';
import { FactsCreateComponent } from './decks/posts/facts/facts-create/facts-create.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { DecksComponent } from './decks/deck.component';
import { DeckCreateComponent } from './decks/deck-create/deck-create.component';
import { DeckService } from './decks/deck.service';

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
    FactsComponent,
    FactsCreateComponent,
    HomeComponent,
    DecksComponent,
    DeckCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PostsService,
    FactsService,
    DeckService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
