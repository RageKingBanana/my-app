import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

    selectedContentType: string | null = null;
  
    // Define a function to handle button clicks
    handleButtonClick(contentType: string) {
      this.selectedContentType = contentType;
    }
}
