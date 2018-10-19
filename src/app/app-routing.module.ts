import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'

import { UsersComponent } from './users/users.component'
import { PostsComponent } from './posts/posts.component'
import { PostsCreateComponent } from './posts/posts-create/posts-create.component'
import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'

const routes: Routes =[
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
    component: PostsCreateComponent
  },
  {
    path: 'posts/edit/:postId',
    component: PostsCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
