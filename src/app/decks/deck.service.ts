import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Deck } from './deck.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class DeckService {
    private decks: Deck[] = [];
    
    private decksUpdated = new Subject<Deck[]>();

    constructor(private http: HttpClient, private router: Router) {}

    addDeck(title: string, content: string) {
        const deck: Deck = {id: null, title: title, content: content, likes: 0, creator: null };
        this.http.post<{message: string, deckId: string}>(BACKEND_URL + "/decks/", deck)
       .subscribe(responseData => {
            const id= responseData.deckId;
            deck.id = id;
            this.decks.push(deck);
            this.decksUpdated.next([...this.decks]);
            this.router.navigate(["/decks"]);
       });  
    }

    getDecks() {
        this.http
       .get<{ message: string; decks: any }>(
        BACKEND_URL + "/decks"
        )
        .pipe(map(deckData => {
            return deckData.decks.map(deck => {
                return {
                    title: deck.title,
                    content: deck.content,
                    id: deck._id,
                    likes: deck.likes,
                    creator: deck.creator
                };
            });
        }))
        .subscribe(transformedDecks => {
            transformedDecks.sort((a, b) => {
                return b.likes - a.likes;
            });
        this.decks = transformedDecks;
        console.log(this.decks);
        this.decksUpdated.next([...this.decks]);
       });
    }

    getDeckUpdateListener() {
        return this.decksUpdated.asObservable();
    }

    getDeck(id: string) {
        return this.http.get<{_id: string; title: string; content: string; likes: number; creator: string }>(BACKEND_URL + "/decks/" + id);
    }

    deleteDeck(deckId: string) {
        this.http.delete(BACKEND_URL + "/decks/" + deckId)
         .subscribe(() => {
         const updatedDecks = this.decks.filter(deck => deck.id !== deckId);
         this.decks = updatedDecks;
         this.decksUpdated.next([...this.decks]);
         });
    }

}