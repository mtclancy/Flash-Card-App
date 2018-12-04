import { Component, OnInit } from "@angular/core";
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Post } from "../posts.model";

@Component({
    selector: 'app-facts',
    templateUrl: './facts.component.html'
  })

export class FactsComponent implements OnInit {
  private postId: string;
  post: Post;
  
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
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
}