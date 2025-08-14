import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public characters: Character[] = [];

  constructor(private characterService: CharacterService){}

  ngOnInit(): void{
    this.characterService.getCharacters(1).subscribe(
      (data: any) => {
        this.characters = data.results;
      }
    );
  }
}
