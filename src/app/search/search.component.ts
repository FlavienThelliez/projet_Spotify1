import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../spotify/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private _query: string;

  tracks: Array<any> = [];

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(params => {
        this._query = params['query'] || '';
  });
/*
    this.route.queryParamMap
      .map(params => this._query = params.get('query') || '');
*/

  }

  submit(query: string): void {
    this.router.navigate(['search'], {queryParams: {query: query}})
      .then(_ => this.search());
  }

  search(): void {
    if (!this._query) {
      this.tracks = null;
      return;
    }
    this.spotifyService
      .search(encodeURIComponent(this._query), 'track')
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.tracks = null;
    if (res && res.tracks && res.tracks.items) {
      this.tracks = res.tracks.items;
    }
  }

  ngOnInit() {
    this.search();
  }

  get query(): string {
    return this._query;
  }
}
