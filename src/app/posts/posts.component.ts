import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './posts.model'
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  likePost(post: any) {
    console.log(post);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
