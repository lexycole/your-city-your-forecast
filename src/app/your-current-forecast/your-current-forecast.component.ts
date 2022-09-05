import { Component } from '@angular/core';
import { IYourCurrentWeather } from '../interface';
import { WeatherService } from '../weather/weather.service';
import { Observable, merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as appStore from '../reducers'

@Component({
  selector: 'app-your-current-forecast',
  templateUrl: './your-current-forecast.component.html',
  styleUrls: ['./your-current-forecast.component.css']
})

export class YourCurrentForecastComponent {
  current$!: Observable<IYourCurrentWeather>; 

  constructor(
    private weatherService: WeatherService,
    private store: Store<appStore.State>
  ) {
    this.current$ = merge(
      this.store.pipe(select(appStore.selectCurrentWeather)),
      this.weatherService.currentWeather$
    )
  }
  
  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }

}
