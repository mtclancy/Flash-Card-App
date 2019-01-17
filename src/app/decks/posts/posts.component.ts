import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';

import { Deck } from '../deck.model';
import { Post } from './posts.model';
import { PostsService } from './posts.service';
import { DeckService } from '../deck.service';
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
  deck: Deck;
  private deckId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public deckService: DeckService, public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
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
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('deckId')) {
          this.deckId = paramMap.get('deckId');
          this.postsService.getPosts(this.deckId);
          this.deckService.getDeck(this.deckId).subscribe(deckData => {
              this.deck = {id: deckData._id, title: deckData.title, content: deckData.content, likes: deckData.likes, creator: deckData.creator };
          });
      } else {
          this.deckId = null;
      }
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
