import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Wader', side: '' }
  ];

  private logService: LogService;

  constructor(logService: LogService) {
    this.logService = logService;
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
    this.logService.writeLog(`Updated ${characterInfo.name}'s side to ${characterInfo.side}`);
  }

  addCharacter(name, side) {

    // Check if character is alerady added.
    const pos = this.characters.findIndex( char => char.name === name );
    if (pos !== -1) {
      return;
    }

    const newCharacter = {name: name, side: side};
    this.characters.push(newCharacter);
    console.log(`Added new character: ${newCharacter.name}\nSide: ${newCharacter.side}`);
  }

}
