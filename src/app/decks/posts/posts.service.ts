import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import { Post } from "./posts.model";
import { Title } from "@angular/platform-browser";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {}

//    getPosts() {
//        this.http
//        .get<{ message: string; posts: any }>(
//            "http://localhost:3000/api/posts"
//         )
//         .pipe(map(postData => {
//             return postData.posts.map(post => {
//                 return {
//                     title: post.title,
//                     content: post.content,
//                     id: post._id,
//                     likes: post.likes,
//                     creator: post.creator
//                 };
//             });
//         }))
//         .subscribe(transformedPosts => {
//             transformedPosts.sort((a, b) => {
//                 return b.likes - a.likes;
//             });
//         this.posts = transformedPosts;
//         this.postsUpdated.next([...this.posts]);
//        });
//    }

   getPost(id: string) {
       return this.http.get<{_id: string; deck: string; title: string; content: string; likes: number; creator: string }>(BACKEND_URL + "/posts/post/" + id);
   }

   getPosts(id: string) {
    this.http.get<{message: string, posts: any}>(BACKEND_URL + "/posts/" + id)
    .pipe(map(postData => {
        return postData.posts.map(post => {
            return {
                deck: post.deck,
                title: post.title,
                content: post.content,
                id: post._id,
                likes: post.likes,
                creator: post.creator
            };
        });
    }))
    .subscribe(transformedPosts => {
        transformedPosts.sort((a, b) => {
            return b.likes - a.likes;
        });
    this.posts = transformedPosts;
    this.postsUpdated.next([...this.posts]);
   });
}

   getPostUpdateListener() {
       return this.postsUpdated.asObservable();
   }

   addPost(deckId: string, title: string, content: string) {
       const post: Post = {id: null, deck: deckId, title: title, content: content, likes: 0, creator: null };
       this.http.post<{message: string, postId: string}>(BACKEND_URL + "/posts/", post)
       .subscribe(responseData => {
            const id= responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/decks/" + post.deck]);
       });  
   }

   updatePost(id: string, deck: string, title: string, content: string, likes: number, creator:string) {
       const post: Post = { id: id, deck: deck, title: title, content: content, likes: likes, creator: creator };
       this.http.put(BACKEND_URL + "/posts/" + id, post)
       .subscribe(response => {
           const updatedPosts = [...this.posts];
           const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
           updatedPosts[oldPostIndex] = post;
           this.posts = updatedPosts;
           this.postsUpdated.next([...this.posts]);
           this.router.navigate(["/decks/" + post.deck]);
       });
   }

   updateLikes(id: string, deck: string, title: string, content: string, likes: number, creator: string ) {
       const post: Post = { id: id, deck: deck, title: title, content: content, likes: likes, creator: creator };
       this.http.put(BACKEND_URL + "/posts/likes/" + id, post)
       .subscribe(response => {
           const updatedPosts = [...this.posts];
           const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
           updatedPosts[oldPostIndex] = post;
           this.posts = updatedPosts;
           this.postsUpdated.next([...this.posts]);
           this.getPosts(post.deck);
       });
   }

   deletePost(postId: string) {
       this.http.delete(BACKEND_URL + "/posts/" + postId)
        .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        });
   }

}