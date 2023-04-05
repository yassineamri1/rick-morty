
import { Component, OnInit } from '@angular/core';


import { filter, take } from 'rxjs/operators';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';


type RequestInfo = {
  next: string | null;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit  {

  characters: Character[] = [];
  info: RequestInfo = {
    next: null,
  };
  private pageNum = 1;
  private query: string | undefined;
  

  constructor(
    private characterSvc: CharacterService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    
  }

  onScrollDown():void{
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: any | ParamMap) => {
      this.query = params['name'];
      this.getDataFromService();
    } )
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if(res?.results?.length) {
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
        
      });
  }
}
