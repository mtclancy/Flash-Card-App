import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { UsersComponent } from './users/users.component';
import { PostsComponent } from './decks/posts/posts.component';
import { PostsCreateComponent } from './decks/posts/posts-create/posts-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FactsComponent } from './decks/posts/facts/facts.component';
import { FactsCreateComponent } from './decks/posts/facts/facts-create/facts-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes =[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/posts-create',
    component: PostsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/edit/:postId',
    component: PostsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/facts/:postId',
    component: FactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/facts/facts-create/:postId',
    component: FactsCreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
