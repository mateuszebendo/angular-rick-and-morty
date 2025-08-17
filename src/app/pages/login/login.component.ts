import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SessaoService } from 'src/app/services/sessao/sessao.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isCadastro: boolean = false;
  public loginForm!: FormGroup;

  constructor(
    private sessaoService: SessaoService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void{
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onLoginSubmit(){
  }

  onReset(){
    this.loginForm.reset();
  }

  toggleMode(){
    this.isCadastro = !this.isCadastro; 

    if(this.isCadastro){
      this.loginForm.addControl('name', new FormControl('', [Validators.required, Validators.minLength(6)]));
    } else {
      this.loginForm.removeControl('name');
    }

    this.onReset();
  }
}
