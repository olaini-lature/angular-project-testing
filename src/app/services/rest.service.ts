/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from './config.service';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer',
  }),
};

const optionsNoToken = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RESTService {
  url = CONSTANTS.API_RANDOM_RESTAURANT;
  token = null;

  constructor(
    private _http: HttpClient
  ) {}

  setAuthorizationHeader(tokenIncoming): any {
    this.token = tokenIncoming;
    options.headers = options.headers.set(
      'Authorization',
      'Bearer ' + tokenIncoming
    );
  }

  get(endpoint: string, params?: any, reqOpts?: any): any {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params[k]) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this._http.get(endpoint, options);
  }

  postNoToken(endpoint: string, body: any): any {
    return this._http.post(endpoint, body, optionsNoToken);
  }

  put(endpoint: string, body: any): any {
    return this._http.put(endpoint, body, options);
  }

  delete(endpoint: string): any {
    return this._http.delete(endpoint, options);
  }

  patch(endpoint: string, body: any): any {
    return this._http.patch(endpoint, body, options);
  }
}
