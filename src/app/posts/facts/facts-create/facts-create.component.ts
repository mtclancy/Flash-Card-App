import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from "../../posts.service";

import { FactsService } from '../facts.service';
import { Post } from "../../posts.model";

@Component({
    selector: 'app-facts-create',
    templateUrl: './facts-create.component.html',
    styleUrls: ['./facts-create.component.css']
})

export class FactsCreateComponent implements OnInit {
    private postId: string;
    post: Post;
    
    constructor(public postsService: PostsService, public factsService: FactsService, public route: ActivatedRoute) {}
    
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap ) => {
          if (paramMap.has('postId')) {
              this.postId = paramMap.get('postId');
              this.postsService.getPost(this.postId).subscribe(postData => {
                  this.post = {id: postData._id, title: postData.title, content: postData.content, likes: postData.likes, creator: postData.creator};
              });
          } else {
              this.postId = null;
          }
        });
      }

    addFact(form: NgForm) {
        if (form.invalid) {
            return;
        } else {
            this.factsService.addFact(this.postId, form.value.content);
        }
        form.resetForm();
    }
}