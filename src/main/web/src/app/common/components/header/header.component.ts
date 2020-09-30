import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from '@sbs/ngpc-auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<User>;

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.authService.loggedInUser;
  }

  onLogout() {
    this.authService.logout();
  }
}
