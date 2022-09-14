import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { userUrl } from '../app.module'
import { User } from '../interfaces/user'
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiKey: string = "5bd3090b1emsh4eb8caef68a502cp1a9a87jsn318b9253b740"
  private userInfo: User = {}
  private dataFromLocal=localStorage.getItem('accessToken')!
  private userAuthInfo = new BehaviorSubject<User>(jwt_decode(this.dataFromLocal))
  readonly userAuthInfo$ = this.userAuthInfo.asObservable()
  constructor(
    private readonly http: HttpClient,
    @Inject(userUrl) private userUrl: string
  ) { }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${this.userUrl}/auth-c/signup`, { tmdb_key: this.apiKey, ...user }).pipe(
      tap((user: User) => {
        console.log(`successfully registered`, user)
      }),
      catchError(err => err)
    );
  }
  login(user: User): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.userUrl}/auth/signin`, user).pipe(
      tap(({ accessToken }) => {
        console.log(jwt_decode(accessToken), "succesfully loged in")
        const { username, id, email, role, tmdb_key}: User = jwt_decode(accessToken)
        this.userInfo = {
          username, id, email, role, tmdb_key, token:accessToken
        }
        this.userAuthInfo.next(this.userInfo)
      }),
      catchError(err => err)
    )

  }
  // refreshToken(user:User){
  //   const url = `${this.userUrl}/auth/refresh-token`;
  //   return this.http.post<{ accessToken: string }>(url, user).pipe(
  //     catchError((err) => {
  //       console.log(err);
  //       throw err;
  //     })
  //   );

  // }

  chanceRole(user:User):Observable<any>{
    
    return this.http.patch<{accessToken:string}>(`${this.userUrl}/auth/userupdate`,{role:'ADMIN',...user} ).pipe(
      tap(({ accessToken }) => {
        console.log("here")
        const { username, id, email,role, tmdb_key }: User =jwt_decode(accessToken);
        
        this.userInfo = {
          username,
          id,
          email, 
          role,
          tmdb_key,
          token: accessToken,
        };
        console.log(this.userInfo)
        this.userAuthInfo.next(this.userInfo);
      }),
      catchError(err =>{console.log(err) 
      return err})
    )

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this.userAuthInfo.next(null);
}

}
