import { Component, OnInit } from "@angular/core";
import { PostsService } from '../posts.service'

import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../posts.model";

@Component({
    selector: 'app-posts-create',
    templateUrl: './posts-create.component.html'
})
export class PostsCreateComponent implements OnInit {
    enteredTitle = "";
    enteredContent = "";
    private mode = 'create';
    private postId: string;
    post: Post;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap ) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.post = {id: postData._id, title: postData.title, content: postData.content, likes: postData.likes};
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    savePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        if(this.mode === 'create') {
            this.postsService.addPost(form.value.title, form.value.content);
        } else {
            this.postsService.updatePost(this.postId, form.value.title, form.value.content, this.post.likes);
        }
        form.resetForm();
    }
}