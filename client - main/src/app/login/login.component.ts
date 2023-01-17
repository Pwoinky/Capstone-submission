import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit {

  formData: FormGroup = new FormGroup({});

  loginObj: any = {
    email: '',
    password: ''
  };




  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.formData = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onLogin(): void{
    if(this.loginObj.email == 'John_Doe@test.com'&& this.loginObj.password == 'john@123') {
      this.loginService.adminLoginValue(false);
      this.loginService.userLoginValue(true);
      this.router.navigate(['/']);     
    } else if (this.loginObj.email == 'admin@admin.com'&& this.loginObj.password == 'admin@123') {
      this.loginService.adminLoginValue(true);
      this.loginService.userLoginValue(true);
      this.router.navigate(['/Admin']); 
    } else {
      window.alert("Wrong Email or Password combination!");
    }
  }
}
