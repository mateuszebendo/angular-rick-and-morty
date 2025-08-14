import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../models/character.model';
import { Observable } from 'rxjs';

const CHARACTER_ENDPOINT = "https://rickandmortyapi.com/api/character/?page="

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacters(page: number): Observable<Character[]>{
    return this.http.get<Character[]>(CHARACTER_ENDPOINT+page);
  }
}
