import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Component for the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /**
   * Creates an instance of NavbarComponent.
   * @param router The router service used for navigation.
   */
  constructor(private router: Router) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
  /**
   * Navigates to the movies page.
   */
  navigateToMoviesPage(): void {
    this.router.navigate(['/movies']);
  }
  /**
   * Navigates to the welcome page on logout, clearing localstorage.
   */
  navigateToWelcomePage(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
  /**
   * Navigates to the profile page.
   */
  navigateToProfilePage(): void {
    this.router.navigate(['/profile']);
  }
  /**
   * Checks if the current URL is the profile page.
   * @returns True if the current URL is '/profile', otherwise false.
   */
  isOnProfile(): boolean {
    return this.router.url === '/profile';
  }
  /**
   * Checks if the current URL is the movies page.
   * @returns True if the current URL is '/movies', otherwise false.
   */
  isOnMovies(): boolean {
    return this.router.url === '/movies';
  }
}
