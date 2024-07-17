import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToMoviesPage(): void {
    this.router.navigate(['/movies']);
  }

  navigateToWelcomePage(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  navigateToProfilePage(): void {
    this.router.navigate(['/profile']);
  }

  isOnProfile(): boolean {
    return this.router.url === '/profile';
  }

  isOnMovies(): boolean {
    return this.router.url === '/movies';
  }
}
