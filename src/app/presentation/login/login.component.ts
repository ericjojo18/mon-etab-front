import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports:[ ReactiveFormsModule],
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  isInvalidInput(field: AbstractControl){
      return field.invalid && (field.touched || field.dirty);
    }
}
