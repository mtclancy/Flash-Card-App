import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './posts.model'
import { PostsService } from './posts.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  posts: Post[] = [];
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
