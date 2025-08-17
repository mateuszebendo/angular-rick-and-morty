import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  postUser(user: User): void{
    this.http.post(this.apiUrl, user)
      .subscribe(
        resultado => {
          console.log(resultado);
        }, 
        erro => {
          console.log(erro);
        }
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string){
    this.getAllUsers().subscribe({
      next: (users) => {

      },
      error: (err) => {
        window.alert('Um erro aconteceu quando')
      } 
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
