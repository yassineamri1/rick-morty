import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { CharacterListComponent } from '@characters/character-list/character-list.component';
import { CharacterDetailsComponent } from '@characters/character-details/character-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [CharacterDetailsComponent, CharacterListComponent],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [CharacterDetailsComponent, CharacterListComponent],
})
export class CharactersModule { }
