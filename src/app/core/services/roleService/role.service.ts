import { Injectable} from '@angular/core';
import { RoleInterface} from '../../../domains/interfaces/roleInterface/role.interface';
import { BaseService} from '../baseService/base.service';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class RoleService {
  private roleSubject = new BehaviorSubject<RoleInterface[]>([]);
  roles$ = this.roleSubject.asObservable();

  constructor(private baseService: BaseService) {}

  createRole(role: RoleInterface): Observable<RoleInterface>{
    return this.baseService.post<RoleInterface>('api/role/',role);
  };

  getRoles(): Observable<RoleInterface[]>{
    return this.baseService.getAll<RoleInterface[]>('api/role/')
  }

  getRoleById(id: number): Observable<RoleInterface>{
    return this.baseService.getOne<RoleInterface>(`api/role`, id).pipe(
    catchError(error => {
      console.error('Error fetching role:', error);
      return throwError(() => new Error('Failed to retrieve role'));
    })
  );
  }

  updateRole(id: number, role:RoleInterface): Observable<RoleInterface>{
    return this.baseService.edit<RoleInterface>(`api/role`, id, role)
  }

  updatesRole(roles: RoleInterface[]){
    this.roleSubject.next(roles)
  }



}
