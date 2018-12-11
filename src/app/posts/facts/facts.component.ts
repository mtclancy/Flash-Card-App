import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';

import { Post } from "../posts.model";
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-facts',
    templateUrl: './facts.component.html',
    styleUrls: ['./facts.component.css']
  })

export class FactsComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  private postId: string;
  post: Post;
  
  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('postId')) {
          this.postId = paramMap.get('postId');
          this.postsService.getPost(this.postId).subscribe(postData => {
            console.log(postData);
              this.post = {id: postData._id, title: postData.title, content: postData.content, likes: postData.likes, creator: postData.creator, facts: postData.facts};
          });
      } else {
          this.postId = null;
      }
    });
  }

  likeFact(fact) {
    console.log(fact);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}