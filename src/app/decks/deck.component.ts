import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Deck } from './deck.model';
import { DeckService } from './deck.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-decks',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.css']
  })

  export class DecksComponent implements OnInit, OnDestroy {
    userIsAuthenticated = false;
    userId: string;
    decks: Deck[] = [];
    private authStatusSub: Subscription;
    private decksSub: Subscription;

    constructor(public deckService: DeckService, private authService: AuthService) { }

    ngOnInit() {
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
      });
      this.deckService.getDecks();
      this.decksSub = this.deckService.getDeckUpdateListener()
        .subscribe((decks: Deck[]) => {
      this.decks = decks;
    });
    }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
      this.decksSub.unsubscribe();
    }
  }