import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserInterface} from '../../../domains/interfaces/userInterface/user.interface';
import {BaseService} from '../../../core/services/baseService/base.service';
import {BehaviorSubjectService} from '../../../core/services/behaviorSubject/behaviorSubject';
import {environmentDev} from '../../../../environments/environment.dev';

@Component({
  selector: 'app-userInterface',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit{
  users: UserInterface[] = [];
  userNumber!: number;

  constructor( private baseService: BaseService, private userBehavior: BehaviorSubjectService) {}

  ngOnInit(): void {
    this.getUsers();
    this.userBehavior.items$.subscribe(users => {
      this.users = users;
      this.userNumber = this.users.length; // Mettre à jour le nombre d'utilisateurs
      console.log('Updated user list:', this.users); // Vérifiez que la liste est mise à jour
    });
  }

  getUsers() {
  this.baseService.getAll('/api/users/')
    .subscribe(
      (res: any) => {
        console.log('Users retrieved:', res);
        this.userBehavior.updateItems(res);
      },
      (err) => {
        console.log('Error retrieving users:', err);
      }
    );
}
}
