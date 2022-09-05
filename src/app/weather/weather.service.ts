import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IYourCurrentWeather } from '../interface';
import { Observable, map, BehaviorSubject, switchMap } from 'rxjs';
import { YourPostalCodeService, defaultPostalCode } from '../your-postal-code/your-postal-code.service';

export interface IYourCurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

export const defaultWeather: IYourCurrentWeather = {
  city: '--',
  country: '--',
  date: Date.now(),
  image: '',
  temperature: 0,
  description: '',
}

  export interface IWeatherService {
    readonly currentWeather$: BehaviorSubject<IYourCurrentWeather>
    getCurrentWeather(city: string | number, country?: string): Observable<IYourCurrentWeather>
    getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<IYourCurrentWeather>
    updateCurrentWeather( search: string | number, country?: string ): void 
  }

  @Injectable({
    providedIn: 'root'
  })
  
export class WeatherService implements IWeatherService {
  readonly currentWeather$ = new BehaviorSubject<IYourCurrentWeather>(defaultWeather)
  
  constructor(
    private httpClient: HttpClient,
    private yourPostalCodeService: YourPostalCodeService
    ) { }

  getCurrentWeatherByCoords(coords: {
    latitude: number
    longitude: number
  }): Observable<IYourCurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString())

    return this.getCurrentWeatherHelper(uriParams)
  }

  updateCurrentWeather(searchText: string, country?: string): void {
    this.getCurrentWeather(searchText, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    )
  }

  getCurrentWeather( searchText: string, country?: string ): Observable<IYourCurrentWeather> {
    return this.yourPostalCodeService.resolvePostalCode(searchText).pipe(
      switchMap((postalCode) => {
        if (postalCode && postalCode !== defaultPostalCode) {
          return this.getCurrentWeatherByCoords({
            latitude: postalCode.lat,
            longitude: postalCode.lng,
          } as GeolocationCoordinates)
        } else {
          const uriParams = new HttpParams().set(
            'q',
            country ? `${searchText},${country}` : searchText
          )
          return this.getCurrentWeatherHelper(uriParams)
        }
      })
    )
  }


  
  private getCurrentWeatherHelper(uriParams: HttpParams):
    Observable<IYourCurrentWeather> {
    uriParams = uriParams.set('appid', environment.appId)
    return this.httpClient
      .get<IYourCurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map(data => this.transformToIYourCurrentWeather(data)))
  }


  private transformToIYourCurrentWeather(data: IYourCurrentWeatherData): IYourCurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image:
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67
  }

}