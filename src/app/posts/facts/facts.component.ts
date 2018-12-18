import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from '../posts.service';
import { FactsService } from '../facts/facts.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';

import { Fact } from "../facts/facts.model";
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
  private factsSub: Subscription;
  post: Post;
  facts: Fact[] = [];
  
  constructor(public postsService: PostsService, public factsService: FactsService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.factsSub = this.factsService.getFactUpdateListener()
    .subscribe((facts: Fact[]) => {
      this.facts = facts;
    });
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
          this.factsService.getFacts(this.postId);
          this.postsService.getPost(this.postId).subscribe(postData => {
              this.post = {id: postData._id, title: postData.title, content: postData.content, likes: postData.likes, creator: postData.creator };
          });
      } else {
          this.postId = null;
      }
    });
  }

  likePost(post: Post) {
    this.postsService.updateLikes(post.id, post.title, post.content, post.likes + 1, post.creator);
  }

  likeFact(fact: Fact) {
    console.log(fact);
    this.factsService.updateLikes(fact.id, fact.post, fact.content, fact.likes + 1, fact.creator);
  }

  ngOnDestroy() {
    this.factsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}