import { Component, OnInit } from '@angular/core';
import {Artist} from '../../artist';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../spotify/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist$: Observable<any>;

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.artist$ = this.spotifyService.getArtist(id);
  }
}
