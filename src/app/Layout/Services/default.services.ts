import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _config from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  constructor(private _httpClient: HttpClient,) { }

  GetMenuList() {
    const _httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    }
    return this._httpClient.get<any>(
      _config.apiUrl + 'v1/ListaMenuPrincipal',
      _httpOptions
    );
  }

}
