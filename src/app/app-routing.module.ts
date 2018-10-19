import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'

import { UsersComponent } from './users/users.component'
import { PostsComponent } from './posts/posts.component'
import { PostsCreateComponent } from './posts/posts-create/posts-create.component'

const routes: Routes =[
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
