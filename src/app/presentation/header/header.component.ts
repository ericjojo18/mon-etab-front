import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet,  RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('menu') menu!: ElementRef;
  isDarkTheme = false;

  openMenu(): void {
    this.menu.nativeElement.style.display = 'block';
  }

  closeMenu(): void {
    this.menu.nativeElement.style.display = 'none';
  }
}
