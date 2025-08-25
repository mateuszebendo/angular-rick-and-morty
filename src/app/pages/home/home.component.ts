import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { SessaoService } from 'src/app/services/sessao/sessao.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public currentPage: number = 1;
  public characters: Character[] = [];
  public user!: User;
  public showFavorites: boolean = false;

  constructor(
    private characterService: CharacterService,
    private userService: UserService,
    private sessaoService: SessaoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCharacters();
    this.sessaoService.getSessao().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        } else {
          this.alertService.showErrorAlert(
            'Nenhum usuario foi encontrado na sessao'
          );
        }
      },
      error: (error) => {
        this.alertService.showErrorAlert('Ocorreu um erro: ' + error);
      },
    });
  }

  private getCharacters() {
    this.characterService
      .getCharacters(this.currentPage)
      .subscribe((data: any) => {
        this.characters = this.showFavorites
          ? data.results.filter((c: Character) =>
              this.user.favoritos?.includes(c.id)
            )
          : data.results;
      });
  }

  favoriteCharacter(characterId: number): void {
    if (!this.user.favoritos) {
      this.user.favoritos = [];
    }

    const isFavorited = this.user.favoritos?.includes(characterId);

    if (isFavorited) {
      this.user.favoritos = this.user.favoritos?.filter(
        (id) => id !== characterId
      );
    } else {
      this.user.favoritos?.push(characterId);
    }

    this.userService.putUser(this.user).subscribe({
      next: (user) => {
        if (user) {
          this.sessaoService.salvarSessao(user);
        } else {
          this.alertService.showErrorAlert(
            'Não foi possível recuperar o usuário'
          );
        }
      },
      error: (error) => {
        this.alertService.showErrorAlert(
          'Ocorreu um erro ao atualizar os favoritos'
        );
        console.error(error);
      },
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.getCharacters();
  }

  previousPage(): void {
    this.currentPage--;
    this.getCharacters();
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
    this.getCharacters();
  }
}
