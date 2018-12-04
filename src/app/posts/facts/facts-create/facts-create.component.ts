import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from '../../posts.service';
import { Post } from "../../posts.model";

@Component({
    selector: 'app-facts-create',
    templateUrl: './facts-create.component.html'
})

export class FactsCreateComponent implements OnInit {
    enteredFact = "";
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

    saveFact(form: NgForm) {
        if (form.invalid) {
            return;
        } else {
            this.postsService.updatePost(this.postId, this.post.title, this.post.content, this.post.creator, this.post.likes, form.value.fact);
        }
        form.resetForm();
    }
}