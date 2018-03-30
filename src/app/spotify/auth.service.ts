import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Config, ConfigService} from './config.service';
import {tap} from 'rxjs/operators';
import 'rxjs/add/operator/map';

export interface InfoToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

@Injectable()
export class AuthService implements OnDestroy {
  private static clientCredentialsFlowURL = 'https://accounts.spotify.com/api/token';

  private _tokenAppli: string;

  private config;

  constructor(private http: HttpClient, private configService: ConfigService) {
    console.log('constructeur de authService ...');
  }

  public getConfig(): Observable<Config> {
    if (this.config) {
      return Observable.of(this.config);
    }
    const call = this.configService.getConfig().pipe(tap(data => {
      this.config = {...data};
      console.log('getConfig data : ', this.config);
    }));
    console.log('getConfig : ', call);
    return call;
  }

  setSession(data: InfoToken) {
    localStorage.setItem('spotify_token', data.access_token);
    const expTime = data.expires_in * 1000 + Date.now();
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    console.log('response from client_credentials request to spotify: ', data);

  }

  ngOnDestroy(): void {
    console.log('Fin de AuthService ....');
  }

  get tokenAppliValide() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log('token valide : ', (Date.now() < expiresAt ? 'Oui' : 'Non'));
    return Date.now() < expiresAt;
  }

  retrieveToken(): Observable<InfoToken> {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('expires_at');
    // on récupère client_id et client_secret et on lance une requête pour récupérer le token
    return this.getConfig().switchMap(() => {
      console.log('config : ', this.config);
      const authorization = this.config.client_id + ':' + this.config.client_secret;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Basic ' + btoa(authorization)
        })
      };
      console.log('httpOptions: ', httpOptions);
      return this.http.post<InfoToken>(AuthService.clientCredentialsFlowURL, 'grant_type=client_credentials', httpOptions);
    });
  }

  tokenAppli(): Observable<string> {
    if (this.tokenAppliValide) {
      this._tokenAppli = localStorage.getItem('spotify_token');
      console.log('authService token: ', this._tokenAppli);
      return Observable.of(this._tokenAppli);
    } else {
      return this.retrieveToken().map(data => {
        console.log('tokenAppli: ', data);
        this.setSession(data);
        return data.access_token;
      });
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
