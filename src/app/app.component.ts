import { Component } from '@angular/core';
import { CharacterService } from './services/character.service';
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
