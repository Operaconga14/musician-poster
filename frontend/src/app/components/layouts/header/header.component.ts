import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Musician Poster'

  public nav_detail?: any
  active: any | undefined;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showNavDetails()
  }

  showNavDetails() {
    this.nav_detail = [
      { name: 'Home', url: '/' },
      { name: 'Gigs', url: 'gigs' },
      { name: 'Vacancies', url: 'vacancies' },
      { name: 'Market Place', url: 'market-place' },
      { name: 'Login', url: 'login' },
      { name: 'SignUp', url: 'register' }
    ]
  }
}
