import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
    private authStatusSub: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit() {
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
      });
    }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
  }