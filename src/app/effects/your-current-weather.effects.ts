import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'

import { YourSearchActions } from '../actions/your-search.actions'
import { WeatherService } from '../weather/weather.service'

@Injectable()
export class YourCurrentWeatherEffects {


  constructor(private actions$: Actions, private weatherService: WeatherService) {}

  getCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(YourSearchActions.search),
      exhaustMap((action) => this.doSearch(action))
    )
  )

  private doSearch(action: { searchText: string; country?: string }) {
    return this.weatherService.getCurrentWeather(action.searchText, action.country).pipe(
      map((weather) => YourSearchActions.weatherLoaded({ current: weather })),
      catchError(() => EMPTY)
    )
  }
}
