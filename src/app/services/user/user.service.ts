import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiEndpoint;

  constructor(
    private http: HttpClient
  ) { }

  postUser(user: User): Observable<User | null>{
    return this.http.post<User>(this.apiUrl, user);
  }

  login(user: User): Observable<User | null>{
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find((item) => item.email === user.email && item.senha === user.senha) || null),
      catchError(err => {
        console.error('Erro ao buscar usuários:', err);
        return of(null);
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User | null> {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.email === email) || null),
      catchError(err => {
        console.error('Erro ao buscar usuários:', err);
        return of(null);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
