import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class StarWarsService {
  private characters = [
  ];

  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http
      .get('https://swapi.co/api/people/')
      .pipe( map( (res: HttpResponse<{}>) => {
        const data = res;
        const characters = data['results'].map(char => {
          return {name: char.name, side: ''};
        });
        return characters;
      }))
      .subscribe((data) => {
        console.log(data);
        this.characters = data;
        this.charactersChanged.next();
      });
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters;
    }
    return this.characters.filter(char => char.side === chosenList);
  }

  onSideChosen(characterInfo) {
    const pos = this.characters.findIndex(char => {
      return char.name === characterInfo.name;
    });
    this.characters[pos].side = characterInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog(
      `Updated ${characterInfo.name}'s side to ${characterInfo.side}`
    );
  }

  addCharacter(name, side) {
    // Check if character is alerady added.
    const pos = this.characters.findIndex(char => char.name === name);
    if (pos !== -1) {
      return;
    }

    const newCharacter = { name: name, side: side };
    this.characters.push(newCharacter);
    console.log(
      `Added new character: ${newCharacter.name}\nSide: ${newCharacter.side}`
    );
  }
}
