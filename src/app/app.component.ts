import { Component, OnInit } from '@angular/core';
import { Alert } from './models/alert.model';
import { AlertService } from './services/alert/alert.service';
import { Subscription } from 'rxjs';
import { AlertEnum } from './enums/alert-enum';
import { SessaoService } from './services/sessao/sessao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private alertSubscription!: Subscription;
  private sessaoSubscription!: Subscription;
  alert: Alert = {
    message: null, 
    type: AlertEnum.Success
  };

  constructor(
    private alertService: AlertService,
    private sessaoService: SessaoService,
    private router: Router
  ) {
    sessaoService.restaurarSessao();
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.$alert.subscribe({
      next: (alert) => {
        if(alert){
          this.alert.message = alert.message;
          this.alert.type = alert.type;

          setTimeout(() => this.alertService.clearAlert(), 5000);
        } else {
          this.alert.message = null;
        }
      }, 
      error: (error) => {
        window.alert('Ocorreu um erro ao tentar renderizar um alerta');
      }
    });  

    this.sessaoSubscription = this.sessaoService.getSessao().subscribe({
      next: (sessao) => {
        if(sessao){
          this.router.navigate(['/home']);
        }
      }, 
      error: (error) => {
        window.alert('Ocorreu um erro ao tentar recuperar a sessao');
      }
    });
  }

  ngOnDestroy(): void{
    this.alertSubscription.unsubscribe();
  }

}
