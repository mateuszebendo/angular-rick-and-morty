import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SessaoService } from 'src/app/services/sessao/sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private sessaoService: SessaoService
  ){}

  public loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onLoginSubmit(){
    const formValue = this.loginForm.value;

    const user: User = {
      name: "name", 
      email: formValue.email as string,
      senha: formValue.password as string
    }

    this.sessaoService.salvarSessao(user);

    this.router.navigateByUrl("/home");
  }

  onReset(){
    this.loginForm.reset();
  }
}
