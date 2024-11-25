import { Routes } from '@angular/router';

import { AppSettingComponent } from './presentation/app-setting/app-setting.component';

import { DashboardComponent } from './presentation/dashboard/dashboard.component';
import { LoginComponent } from './presentation/login/login.component';
import { ReportComponent } from './presentation/report/report.component';
import { SchoolComponent } from './presentation/school/school.component';
//student
import { StudentComponent } from './presentation/students/student/student.component';
import  { AddStudentComponent} from './presentation/students/add-student/add-student.component';
import { ModifyStudentComponent} from './presentation/students/modify-student/modify-student.component';
//teacher
import { TeacherComponent } from './presentation/teachers/teacher/teacher.component';
import {AddTeacherComponent} from './presentation/teachers/add-teacher/add-teacher.component';
import { ModifyTeacherComponent} from './presentation/teachers/modify-teacher/modify-teacher.component';
//user
import { ListUserComponent } from './presentation/users/list-user/list-user.component';
import { AddUserComponent } from './presentation/users/add-user/add-user.component';
import { ModifyUserComponent } from './presentation/users/modify-user/modify-user.component';
import { HeaderComponent } from './presentation/header/header.component';
import {ListRoleComponent} from './presentation/roles/list-role/list-role.component';
import {AddRoleComponent} from './presentation/roles/add-role/add-role.component';
import {ModifyRoleComponent} from './presentation/roles/modify-role/modify-role.component';



export const routes: Routes = [

    { path: 'login', title:"Login", component: LoginComponent },
    { path: '', component: HeaderComponent,
        children: [
            { path: 'dashboard', title:"Dashboard", component: DashboardComponent },
             { path: 'app-setting', component: AppSettingComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'report', component: ReportComponent },
            { path: 'school', component: SchoolComponent },
          //student
            { path: 'student', component: StudentComponent },
            { path: 'add-student', component: AddStudentComponent},
            { path: 'modify-student', component: ModifyStudentComponent},
          //teacher
            { path: 'teacher', component: TeacherComponent },
            { path: 'add-teacher', component: AddTeacherComponent},
            { path: 'modify-teacher', component: ModifyTeacherComponent},
          //user
            { path: 'user', component: ListUserComponent },
            { path: 'add-user', component: AddUserComponent},
            { path: 'modify-user', component: ModifyUserComponent},
          //role
            {path: 'role', component:ListRoleComponent},
            {path: 'add-role', component:AddRoleComponent},
            {path: 'modify-role/:id', component:ModifyRoleComponent}


    ] },

];


export class AppRoutingModule { }
