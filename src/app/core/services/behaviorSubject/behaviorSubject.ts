import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BehaviorSubjectService {
  private itemsSubject = new BehaviorSubject<any[]>([]); // Initialisation avec un tableau vide
  items$ = this.itemsSubject.asObservable();  //Observable accessible pour les composants

  constructor() {}

  //Mettre pour mettre a jour la liste des items
  updateItems(items: any[]){
    this.itemsSubject.next(items)
  }
}
