import { SettingsService } from './../services/settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  cardDeck = [];
  numberOfCards = 6;
  cardColumnSize = 4;


  timeToHide = 1000;


  isCardDisplayed = false;


  previousCard = null;

  
  foundPairs = 0;

  //Creating function settingService, calling the service
  constructor(private settingsService : SettingsService) {
    
    //Initiate game in the constructor
    this.generateDeck();
    this.shuffleCards();
  }
  //Creating function to take new parameters

  ionViewDidEnter(){
   this.numberOfCards = this.settingsService.settings.numberOfCards;
   this.timeToHide = this.settingsService.settings.delay;
   this.cardColumnSize = this.settingsService.getColumnSize();
   //Initiate the game
   this.generateDeck();
   this.shuffleCards();
  }

  

   

  //Function looping on cards
  generateDeck(){
    //Delete previous cards after loading a new parameter

    this.cardDeck = []
    
    for(let i=0; i< this.numberOfCards; i++){

    //Creating a card
    this.cardDeck.push({image: i + '.png', revealed: false});
    this.cardDeck.push({image: i + '.png', revealed: false});
    }
    console.log(this.cardDeck);
    }

    //Function for shuffleCards
    shuffleCards(){
      //Loop on the index of each card
      for(let pos in this.cardDeck){
        //Saving current card
        let currentCard = this.cardDeck[pos];
        //Random position in the deck
        let randomPos = Math.floor(Math.random() * this.cardDeck.length);
      
        this.cardDeck[pos] = this.cardDeck[randomPos];
        this.cardDeck[randomPos] = currentCard;

      }
 
    }
    //Function to display a card on click
    //5: Création de ma fonction pour affichage de la carte lors d'un clic
    pickCard(card) {
      //One card can be display at once
      if(!this.isCardDisplayed) {
        //Display the card
        card.revealed = true;
        this.isCardDisplayed = true;

        //Comparison of the display card with the previous card
       
        if(this.previousCard && this.previousCard.image === card.image) {
          this.previousCard.revealed = true;
          this.isCardDisplayed = false;
        
          this.foundPairs++;
        } else {
          //Hidding card after some delay
        setTimeout(() => { 
          card.revealed = false; 
          this.isCardDisplayed = false;
          
          this.previousCard = card;
          
        }, this.timeToHide);
        }
        
      }   
    }

    //Function for reset the game
    playAgain() {
     
      this.foundPairs = 0;
      
      this.previousCard = null;
      
      this.shuffleCards();
      //Hidding all cards
      this.cardDeck.map(
        (currentCard) => {currentCard.revealed = false; }
      );
    }

  }


