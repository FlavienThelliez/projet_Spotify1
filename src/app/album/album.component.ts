import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SpotifyService} from '../spotify/spotify.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album$: Observable<any>;

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.album$ = this.spotifyService.getAlbum(id);
  }
}
