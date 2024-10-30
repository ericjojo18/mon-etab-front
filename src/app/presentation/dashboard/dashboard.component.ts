import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';


@Component({
  selector: 'app-dshboard',
  standalone: true,
  imports: [ RouterOutlet,RouterLink,  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'Dashboard';
  student = '128 000';
  teacher = '129 000';
  user = '150 000';
}
