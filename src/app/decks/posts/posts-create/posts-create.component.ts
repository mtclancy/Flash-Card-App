import { Component, OnInit } from "@angular/core";
import { PostsService } from '../posts.service'

import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../posts.model";
import { Deck } from "../../deck.model";
import { DeckService } from "../../deck.service";

@Component({
    selector: 'app-posts-create',
    templateUrl: './posts-create.component.html',
    styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
    enteredTitle = "";
    enteredContent = "";
    private mode = 'create';
    private postId: string;
    private deckId: string;
    post: Post;
    deck: Deck;

    constructor(public deckService: DeckService, public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap ) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.post = {id: postData._id, deck: postData.deck, title: postData.title, content: postData.content, likes: postData.likes, creator: postData.creator };
                });
            } else {
                this.mode = 'create';
                console.log(this.mode);
                this.postId = null;
                this.deckId = paramMap.get('deckId');
                this.deckService.getDeck(this.deckId).subscribe(deckData => {
                    this.deck = {id: deckData._id, title: deckData.title, content: deckData.content, likes: deckData.likes, creator: deckData.creator };
                });
            }
        });
    }

    savePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        if(this.mode === 'create') {
            this.postsService.addPost(this.deckId, form.value.title, form.value.content);
        } else {
            this.postsService.updatePost(this.postId, this.post.deck, form.value.title, form.value.content, this.post.likes, this.post.creator);
        }
        form.resetForm();
    }
}