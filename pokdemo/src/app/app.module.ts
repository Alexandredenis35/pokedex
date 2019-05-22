import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PokeApiService } from './poke-api.service';
import { CardComponent } from './card/card.component';
import {CardModule} from 'primeng/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'; 
import { OrderPipe } from 'ngx-order-pipe';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    FilterPokemonPipePipe,
    CardComponent,
    OrderPipe

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CardModule,
    MatCardModule,
    DialogModule,
    BrowserAnimationsModule,
    ProgressBarModule,
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
