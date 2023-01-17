import { Component, OnInit } from '@angular/core';
import { Services } from '../services';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  title = 'Header'; 
  loggedIn = true;
  admin = false;


  constructor(private services: Services, private loginComponent: LoginComponent, private loginService: LoginService, private router: Router ) { }
   

  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;

  ngOnInit() {
    this.loginService.adminLogin.subscribe((newValue) => this.admin = newValue);
    this.loginService.login.subscribe((newValue) => this.loggedIn = newValue);
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  closeMenu() {
    this.menuVariable = false;
    this.menu_icon_variable = false;
  }

  logout() {
    this.loggedIn = false;
    this.admin = false;
    this.router.navigate(['/']); 
  }

}
