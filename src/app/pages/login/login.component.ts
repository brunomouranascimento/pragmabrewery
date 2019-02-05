import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isShowLogin$: Observable<boolean>;
  loginForm: FormGroup;

  constructor(public authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['shane@pragma.com', Validators.required],
      password: ['123456', Validators.required]
    });
    this.isShowLogin$ = this.authenticationService.isShowLogin;
  }
}
