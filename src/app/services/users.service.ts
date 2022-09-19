import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap ,map} from 'rxjs';
import { userUrl } from '../app.module'
import { User } from '../interfaces/user'
import jwt_decode from 'jwt-decode';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiKey: string = "5bd3090b1emsh4eb8caef68a502cp1a9a87jsn318b9253b740"
  private userInfo: User = {}
  private dataFromLocal = localStorage.getItem('accessToken')!
  private refreshTokenTimeout:any
  httpHeaders= new HttpHeaders().set('accessToken',this.dataFromLocal)
  private userAuthInfo = new BehaviorSubject<User>({})
  readonly userAuthInfo$ = this.userAuthInfo.asObservable()
  
  constructor(
    private readonly http: HttpClient,
    @Inject(userUrl) private userUrl: string
  ) { }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${this.userUrl}/auth-c/signup`,
      { tmdb_key: this.apiKey, ...user }).pipe(
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
        const { username, id, email, role, tmdb_key }: User = jwt_decode(accessToken)
        this.userInfo = {
          username, id, email, role, tmdb_key, token: accessToken
        }
        this.userAuthInfo.next(this.userInfo)
        this.startRefreshTokenTimer(accessToken)
      }),
      catchError(err => err)
    )

  }
  checkEmail(email:string) :Observable<any> {
    return this.http.post(`${this.userUrl}/auth/check-email`,{email:email}).pipe(
      tap(()=>{
       
      }),catchError(err=>{
        console.log(err, "checkEmail in userService")
        return err 
      })
    )
  }
 

  chanceRole(user: User): Observable<any> {

    return this.http.patch<{ accessToken: string }>(`${this.userUrl}/auth/userupdate`, {...user},
      {}
    ).pipe(
      tap(({ accessToken }) => {
        console.log("here")
        const { username, id, email, role, tmdb_key }: User = jwt_decode(accessToken);

        this.userInfo = {
          username,
          id,
          email,
          role,
          tmdb_key,
          token: accessToken,
        };
        this.userAuthInfo.next(this.userInfo);
        
      }),
      catchError(err => {
        console.log(err)
        return err
      })
    )

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.stopRefreshTokenTimer()
    this.userAuthInfo.next({});
  }
  refreshToken() {
    return this.http.post<any>(`${this.userUrl}/users/refresh-token`, {}, { withCredentials: true })
        .pipe(map((user:any) => {
          this.userAuthInfo.next(user)
          this.startRefreshTokenTimer(user);
            return user;
        }));
}
  private startRefreshTokenTimer(userInfo:any) {
   
    let jwtToken:any=jwt_decode(userInfo)
    
   
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    console.log(expires)
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
}
private stopRefreshTokenTimer() {
  clearTimeout(this.refreshTokenTimeout);
}
}
