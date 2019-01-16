import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { Fact } from "./facts.model";
import { Title } from "@angular/platform-browser";

@Injectable({ providedIn: "root" })
export class FactsService {
    private facts: Fact[] = [];

    private factsUpdated = new Subject<Fact[]>();

    constructor(private http: HttpClient, private router: Router) {}

    addFact(postId: string, content: string) {
        const fact: Fact = { id: null, post: postId, content: content, likes: 0, creator: null };
        this.http.post<{message: string, factId: string}>("http://localhost:3000/api/facts/", fact)
            .subscribe(responseData => {
                const id= responseData.factId;
                fact.id = id;
                this.facts.push(fact);
                this.factsUpdated.next([...this.facts]);
                this.router.navigate(["/posts/facts/" + fact.post]);
            });
    }

    getFacts(id: string) {
        this.http.get<{message: string, facts: any}>("http://localhost:3000/api/facts/" + id)
        .pipe(map(factData => {
            return factData.facts.map(fact => {
                return {
                    post: fact.post,
                    content: fact.content,
                    id: fact._id,
                    likes: fact.likes,
                    creator: fact.creator
                };
            });
        }))
        .subscribe(transformedFacts => {
            transformedFacts.sort((a, b) => {
                return b.likes - a.likes;
            });
        this.facts = transformedFacts;
        this.factsUpdated.next([...this.facts]);
       });
    }

    getFactUpdateListener() {
        return this.factsUpdated.asObservable();
    }

    updateLikes(id: string, post: string, content: string, likes: number, creator: string) {
        const fact: Fact = { id: id, post: post, content: content, likes: likes, creator: creator};
        this.http.put("http://localhost:3000/api/facts/likes/" + id, fact)
        .subscribe(response => {
            const updatedFacts = [...this.facts];
            const oldFactIndex = updatedFacts.findIndex(f => f.id === fact.id);
            updatedFacts[oldFactIndex] = fact;
            this.facts = updatedFacts;
            this.factsUpdated.next([...this.facts]);
            this.getFacts(fact.post);
        });
    }
}