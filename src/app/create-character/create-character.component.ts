import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  swService: StarWarsService;
  input = '';
  options = [
    { display: 'none', value: '' },
    { display: 'light', value: 'light' },
    { display: 'dark', value: 'dark' }
  ];

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {}

  onSubmit(formData) {
    this.input = '';
    console.log(formData);
    if (formData.invalid) {
      return;
    }
    this.swService.addCharacter(formData.value.name, formData.value.side);
  }
}
