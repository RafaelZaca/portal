import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _config from '../../../environments/environment';

const _httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _httpClient: HttpClient,) { }

  logout() {
    return this._httpClient.put<any>(
      _config.apiUrl + 'auth',
      _httpOptions
    );
  }

}
