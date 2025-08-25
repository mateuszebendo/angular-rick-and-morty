import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SessaoService } from 'src/app/services/sessao/sessao.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private usuarios: User[] = [];
  public isCadastro: boolean = false;
  public loginForm!: FormGroup;

  constructor(
    private sessaoService: SessaoService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.usuarios = users;
      },
      error: (err) => {
        this.alertService.showErrorAlert(
          'Ocorreu um erro ao recuperar os usuarios: ' + err
        );
      },
    });
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        (control) => this.validateUniqueEmail(control),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const formValue: User = this.loginForm.value;

      if (this.isCadastro) {
        this.userService.postUser(formValue).subscribe({
          next: (user) => {
            if (user) {
              this.alertService.showSuccessAlert('Usuario ' + user.name + ' criado com sucesso!');
              this.toggleMode();
            } else {
              this.alertService.showErrorAlert('Nao foi possivel recuperar o usuario');
            }
          },
          error: (error) => {
            this.alertService.showErrorAlert('Erro ao criar usuario: ' + error);
          },
        });
      } else {
        this.userService.login(formValue).subscribe({
          next: (user) => {
            if(user){
              this.sessaoService.salvarSessao(user);
            } else {
              this.alertService.showErrorAlert('Email ou senha incorretos!');
            }
          },
          error: (error) => {
            this.alertService.showErrorAlert('Erro ao fazer login: ' + error);
          }, 
        })
      }
    } 
  }

  onReset() {
    this.loginForm.reset();
  }

  toggleMode() {
    this.isCadastro = !this.isCadastro;

    if (this.isCadastro) {
      this.loginForm.addControl(
        'name',
        new FormControl('', [Validators.required, Validators.minLength(6)])
      );
    } else {
      this.loginForm.removeControl('name');
    }

    this.onReset();
  }

  validateUniqueEmail(control: AbstractControl): ValidationErrors | null {
    if (this.isCadastro) {
      const email = control.value as string;

      if (email && this.usuarios.find((user) => user.email == email)) {
        const validationError = {
          emailDuplicado: true,
        };

        return validationError;
      }
    }

    return null;
  }
}
