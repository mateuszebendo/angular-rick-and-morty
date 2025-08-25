import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private sessao = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router
  ) {
    this.restaurarSessao();
  }

  restaurarSessao(){
    const jsonSessao = localStorage.getItem(environment.sessionKeyword);

    if(!jsonSessao){
      return;
    }

    const dadosSessao: User = JSON.parse(jsonSessao);
    this.sessao.next(dadosSessao);
  }

  salvarSessao(user: User): void{
    localStorage.setItem(
      environment.sessionKeyword,
      JSON.stringify(user)
    );

    this.sessao.next(user);
  }

  limparSessao(): void {
    localStorage.clear();
    this.sessao.next(null);
  }

  getSessao(){
    return this.sessao.asObservable();
  }

  estaLogado(): boolean{
    return this.sessao.value !== null;
  }
}
