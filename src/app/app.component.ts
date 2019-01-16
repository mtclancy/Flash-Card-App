import { Component, OnInit } from '@angular/core';

import { Post } from './decks/posts/posts.model';
import { Fact } from './decks/posts/facts/facts.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storedPosts: Post[] = [];
  storedFacts: Fact[] = [];

  constructor (private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
