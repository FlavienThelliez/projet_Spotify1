import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';
  private token: string;
  valideService: boolean;
  valideService$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('constructeur SpotifyService');
  }

  private query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    console.log('en attente ... query: ', queryURL);
    return this.authService.tokenAppli().switchMap(token => {
        console.log('spotifyService token: ', token);
        return this.http.get<any[]>(queryURL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      });
  }

  search(query: string, type: string = 'track', offset: number = 0, limit: number = 20): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`,
      `limit=${limit}`,
      `offset=${offset}`
    ]);
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }

}
