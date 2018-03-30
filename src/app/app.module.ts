import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './spotify/auth.service';
import {SpotifyService} from './spotify/spotify.service';
import {SearchComponent} from './search/search.component';
import {RouterModule, Routes} from '@angular/router';
import {ConfigService} from './spotify/config.service';
import { ArtistComponent } from './artist/artist.component';
import { TrackComponent } from './track/track.component';
import {AlbumComponent} from './album/album.component';
// import {AdvancedSearchComponent} from './advanced-search/advanced-search.component';
// import {FormSearchComponent} from './form-search/form-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {path: 'artist/:id', component: ArtistComponent},
  {path: 'track/:id', component: TrackComponent},
  {path: 'album/:id', component: AlbumComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistComponent,
    TrackComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes/*, {enableTracing: true}*/)
  ],
  providers: [AuthService, SpotifyService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
