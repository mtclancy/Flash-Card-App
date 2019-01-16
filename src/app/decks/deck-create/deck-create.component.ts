import { Component} from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from "@angular/forms";

import { DeckService } from '../deck.service';
import { Deck } from '../deck.model';

@Component({
    selector: 'app-deck-create',
    templateUrl: './deck-create.component.html',
    styleUrls: ['./deck-create.component.css']
  })

  export class DeckCreateComponent {
    enteredTitle = "";
    enteredContent = "";
    deck: Deck;

    constructor(public deckService: DeckService, public route: ActivatedRoute) {}

    saveDeck(form: NgForm) {
      if (form.invalid) {
          return;
      }
      this.deckService.addDeck(form.value.title, form.value.content);
      form.resetForm();
  }

  }