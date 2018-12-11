import { Component, OnInit } from '@angular/core';

import { Post } from './posts/posts.model';
import { Fact } from './posts/facts/facts.model';
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
