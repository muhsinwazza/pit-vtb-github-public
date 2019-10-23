import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import * as $ from 'jquery';
import { VtbComponentsModule } from '@sitespirit/vtb-component-library';

import { ItineraryResolver } from './resolvers/itinerary.resolver';

import { AppComponent } from './app.component';

import { MinisiteComponent } from './pages/minisite/minisite.component';
import { SliderModule } from 'angular-image-slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ModalModule } from 'angular-custom-modal';





import { AgmCoreModule } from '@agm/core';





@NgModule({
  declarations: [
    AppComponent,
    MinisiteComponent
  ],
  imports: [
    BrowserModule,
    SliderModule,
    SlickCarouselModule,
    ModalModule,
    RouterModule.forRoot([{
      path: '',
      component: MinisiteComponent,
      pathMatch: 'full',
      resolve: {
        itinerary: ItineraryResolver
      }
    }
  ]),
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAp2Nko-n3uxEhNnXm1KqyBru2eXR_m1gM'
  }),
  HttpClientModule,
  VtbComponentsModule.forRoot(environment)
],
providers: [ItineraryResolver],
bootstrap: [AppComponent]
})
export class AppModule { }
