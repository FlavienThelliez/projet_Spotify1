import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify/spotify.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  track$: Observable<any>;

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.track$ = this.spotifyService.getTrack(id);
  }

}
