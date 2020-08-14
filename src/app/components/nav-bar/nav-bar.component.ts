import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  // To Show to nav bar buttons
  isSignup: boolean;

  ngOnInit(): void {
    this.checkIfIsSignupPage()
  };

  checkIfIsSignupPage() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('event-url:', event.url)
        this.isSignup = event.url.includes('signup') ? true : false
        console.log('isSignup:', this.isSignup)
      }
    })

  }
}



