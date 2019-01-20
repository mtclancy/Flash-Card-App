import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../../../environments/environment";
import { Fact } from "./facts.model";
import { Title } from "@angular/platform-browser";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class FactsService {
    private facts: Fact[] = [];

    private factsUpdated = new Subject<Fact[]>();

    constructor(private http: HttpClient, private router: Router) {}

    addFact(postId: string, content: string) {
        const fact: Fact = { id: null, post: postId, content: content, likes: 0, creator: null };
        this.http.post<{message: string, factId: string}>(BACKEND_URL + "/facts/", fact)
            .subscribe(responseData => {
                const id= responseData.factId;
                fact.id = id;
                this.facts.push(fact);
                this.factsUpdated.next([...this.facts]);
                this.router.navigate(["/posts/facts/" + fact.post]);
            });
    }

    getFacts(id: string) {
        this.http.get<{message: string, facts: any}>(BACKEND_URL + "/facts/" + id)
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
        this.http.put(BACKEND_URL + "/facts/likes/" + id, fact)
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