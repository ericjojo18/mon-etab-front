import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

}
