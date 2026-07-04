import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, ISingIn } from '../model/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_Base_Url: string = environment.authBaseUrl

  constructor(private _http: HttpClient) { }

  login(userdetails: ILogin): Observable<any> {
    let login_url = `${this.auth_Base_Url}/api/auth/login`
    return this._http.post<any>(login_url, userdetails)
  }
  SingUp(userdetails: ISingIn): Observable<any> {
    let SignUpurl = `${this.auth_Base_Url}/api/auth/register`
    return this._http.post<any>(SignUpurl, userdetails)
  }
  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  saveuserRole(userRole: string) {
    localStorage.setItem('userRole', userRole)
  }
  getToken() {
    localStorage.getItem('token')
  }
  getUserRole() {
    localStorage.getItem('userRole')
  }

  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }

}
