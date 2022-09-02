import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { YourCurrentForecastComponent } from './your-current-forecast/your-current-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    YourCurrentForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
